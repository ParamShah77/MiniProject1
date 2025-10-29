from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import logging

# Document parsing
import pdfplumber
from docx import Document

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CareerPath360 ML Service", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple skill database
SKILLS = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Express',
    'Django', 'Flask', 'FastAPI', 'Spring', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Redis', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git'
]

def parse_pdf(file_path: str) -> str:
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text.strip()

def parse_docx(file_path: str) -> str:
    doc = Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

def extract_skills(text: str) -> list:
    text_lower = text.lower()
    return [skill for skill in SKILLS if skill.lower() in text_lower]

def calculate_ats_score(text: str, skills: list) -> float:
    word_count = len(text.split())
    skill_count = len(skills)
    
    # Simple scoring
    score = 0
    score += min(word_count / 500 * 30, 30)  # 30% for content
    score += min(skill_count / 10 * 50, 50)  # 50% for skills
    score += 20  # 20% base score
    
    return round(score, 2)

@app.get("/")
async def root():
    return {
        "message": "CareerPath360 ML Service",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "ml-parser"}

@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """Parse resume and calculate ATS score"""
    try:
        # Validate file type
        if not file.filename.endswith(('.pdf', '.docx')):
            raise HTTPException(400, "Only PDF and DOCX supported")
        
        # Save temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            content = await file.read()
            tmp.write(content)
            tmp_path = tmp.name
        
        try:
            # Extract text
            if file.filename.endswith('.pdf'):
                text = parse_pdf(tmp_path)
            else:
                text = parse_docx(tmp_path)
            
            if len(text.strip()) < 50:
                raise HTTPException(400, "Resume content too short")
            
            # Extract skills
            skills = extract_skills(text)
            
            # Calculate score
            ats_score = calculate_ats_score(text, skills)
            
            logger.info(f"✅ Parsed resume: {len(text)} chars, {len(skills)} skills, {ats_score}% score")
            
            return {
                "success": True,
                "data": {
                    "final_ats_score": ats_score,
                    "ml_relevance_score": ats_score,
                    "skill_match_score": min(len(skills) / 10 * 100, 100),
                    "extracted_skills": skills,
                    "skill_count": len(skills),
                    "word_count": len(text.split()),
                    "score_breakdown": {
                        "contact_information": {"score": 100},
                        "skills": {
                            "score": min(len(skills) / 10 * 100, 100),
                            "total_skills": len(skills)
                        },
                        "content_quality": {
                            "score": ats_score,
                            "word_count": len(text.split())
                        }
                    },
                    "parsed_data": {
                        "primary_info": {
                            "name": "Extracted Name",
                            "email": None,
                            "phone": None
                        }
                    },
                    "skill_gaps": [],
                    "recommendations": []
                }
            }
        
        finally:
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(500, str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
