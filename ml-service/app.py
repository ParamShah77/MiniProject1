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

# Comprehensive skill database
SKILLS = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
    'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Express',
    'Django', 'Flask', 'FastAPI', 'Spring', 'Spring Boot',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQL',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git',
    'REST API', 'GraphQL', 'Microservices', 'CI/CD',
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Android', 'iOS'
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
    found_skills = []
    for skill in SKILLS:
        if skill.lower() in text_lower:
            found_skills.append(skill)
    return found_skills

def calculate_ats_score(text: str, skills: list) -> dict:
    """Realistic ATS scoring (harder to get 100)"""
    import re
    
    word_count = len(text.split())
    skill_count = len(skills)
    
    scores = {'contact_info': 0, 'skills': 0, 'content': 0}
    
    # ------------------------------
    # 1️⃣ Contact Information (20 pts)
    # ------------------------------
    has_email = bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text))
    has_phone = bool(re.search(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]', text))
    has_address = bool(re.search(r'\b(city|state|country|road|street|lane|zip|pincode)\b', text.lower()))
    
    base_contact = (has_email * 8) + (has_phone * 8) + (has_address * 4)
    
    # Partial penalty for missing items
    if not has_email or not has_phone:
        base_contact *= 0.8
    scores['contact_info'] = base_contact

    # ------------------------------
    # 2️⃣ Skills Matching (50 pts)
    # ------------------------------
    # Harder tiers + diminishing returns
    if skill_count >= 18:
        skill_score = 46
    elif skill_count >= 14:
        skill_score = 42
    elif skill_count >= 10:
        skill_score = 35
    elif skill_count >= 7:
        skill_score = 25
    elif skill_count >= 5:
        skill_score = 18
    else:
        skill_score = 10
    
    # Penalty for generic skills (e.g., 'communication', 'teamwork')
    generic_skills = ['communication', 'leadership', 'teamwork', 'creative']
    generic_penalty = sum(1 for s in skills if any(g in s.lower() for g in generic_skills))
    skill_score -= generic_penalty * 2  # small penalty per generic skill
    scores['skills'] = max(skill_score, 0)

    # ------------------------------
    # 3️⃣ Content Quality (30 pts)
    # ------------------------------
    action_verbs = [
        'developed', 'managed', 'led', 'created', 'implemented',
        'designed', 'built', 'improved', 'optimized', 'analyzed'
    ]
    action_count = sum(1 for verb in action_verbs if verb in text.lower())

    # Word count scoring (tighter)
    if word_count >= 600:
        content_score = 16
    elif word_count >= 400:
        content_score = 12
    elif word_count >= 250:
        content_score = 8
    else:
        content_score = 4

    # Action verb bonus (reduced)
    if action_count >= 6:
        content_score += 8
    elif action_count >= 3:
        content_score += 5
    elif action_count >= 1:
        content_score += 2

    # Add penalty for missing structure
    sections = ['education', 'experience', 'projects', 'skills', 'certifications']
    section_hits = sum(1 for s in sections if s in text.lower())
    if section_hits < 3:
        content_score -= 4  # penalize weak structure

    scores['content'] = max(min(content_score, 30), 0)

    # ------------------------------
    # 4️⃣ Final Computation
    # ------------------------------
    total_score = sum(scores.values())
    normalized_score = min(round((total_score / 100) * 90, 2), 90.0)
    
    breakdown = {
        'contact_information': {
            'score': round((scores['contact_info'] / 20) * 100, 2),
            'status': 'complete' if scores['contact_info'] >= 16 else 'incomplete',
            'has_email': has_email,
            'has_phone': has_phone,
            'has_address': has_address
        },
        'skills': {
            'score': round((scores['skills'] / 50) * 100, 2),
            'total_skills': skill_count,
            'generic_penalty': generic_penalty
        },
        'content_quality': {
            'score': round((scores['content'] / 30) * 100, 2),
            'word_count': word_count,
            'action_verbs': action_count,
            'section_coverage': section_hits
        }
    }
    
    return {
        'final_score': normalized_score,
        'breakdown': breakdown
    }

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
            
            # Calculate ATS score
            ats_result = calculate_ats_score(text, skills)
            
            logger.info(f"✅ Parsed resume: {len(text)} chars, {len(skills)} skills, {ats_result['final_score']}% ATS score")
            
            return {
                "success": True,
                "data": {
                    "final_ats_score": ats_result['final_score'],
                    "ats_score": ats_result['final_score'],  # Duplicate for compatibility
                    "ml_relevance_score": ats_result['final_score'],
                    "skill_match_score": min(len(skills) / 10 * 100, 100),
                    "extracted_skills": skills,
                    "skill_count": len(skills),
                    "word_count": len(text.split()),
                    "score_breakdown": ats_result['breakdown'],
                    "parsed_data": {
                        "primary_info": {
                            "name": "Extracted Name",
                            "email": None,
                            "phone": None
                        }
                    },
                    "skill_gaps": [],
                    "recommendations": [
                        {
                            "category": "Skills",
                            "priority": "high",
                            "message": f"You have {len(skills)} skills. Aim for 10+ for better ATS scores."
                        }
                    ] if len(skills) < 10 else []
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
