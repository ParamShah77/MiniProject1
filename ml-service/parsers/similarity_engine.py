from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict, Tuple

class SimilarityEngine:
    """
    Sentence-BERT based similarity matching between resume and job requirements
    """
    
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def calculate_skill_similarity(
        self,
        resume_skills: List[str],
        job_skills: List[str]
    ) -> Dict[str, any]:
        """
        Calculate similarity between resume skills and job requirements
        """
        if not resume_skills or not job_skills:
            return {
                'overall_similarity': 0.0,
                'matched_skills': [],
                'missing_skills': job_skills,
                'skill_matches': []
            }
        
        # Encode all skills
        resume_embeddings = self.model.encode(resume_skills)
        job_embeddings = self.model.encode(job_skills)
        
        # Calculate similarity matrix
        similarity_matrix = cosine_similarity(resume_embeddings, job_embeddings)
        
        # Find best matches for each job skill
        skill_matches = []
        matched_job_skills = []
        threshold = 0.7  # Similarity threshold
        
        for job_idx, job_skill in enumerate(job_skills):
            # Get similarities for this job skill
            similarities = similarity_matrix[:, job_idx]
            best_match_idx = np.argmax(similarities)
            best_similarity = similarities[best_match_idx]
            
            if best_similarity >= threshold:
                skill_matches.append({
                    'job_skill': job_skill,
                    'resume_skill': resume_skills[best_match_idx],
                    'similarity': float(best_similarity),
                    'match_type': 'exact' if best_similarity > 0.95 else 'similar'
                })
                matched_job_skills.append(job_skill)
        
        # Identify missing skills
        missing_skills = [skill for skill in job_skills if skill not in matched_job_skills]
        
        # Calculate overall similarity
        overall_similarity = (len(matched_job_skills) / len(job_skills)) * 100 if job_skills else 0
        
        return {
            'overall_similarity': round(overall_similarity, 2),
            'matched_skills': matched_job_skills,
            'missing_skills': missing_skills,
            'skill_matches': skill_matches,
            'match_count': len(matched_job_skills),
            'total_required': len(job_skills)
        }
    
    def calculate_text_similarity(
        self,
        resume_text: str,
        job_description: str
    ) -> float:
        """
        Calculate semantic similarity between full resume and job description
        """
        # Encode both texts
        resume_embedding = self.model.encode([resume_text])[0]
        job_embedding = self.model.encode([job_description])[0]
        
        # Calculate cosine similarity
        similarity = cosine_similarity(
            [resume_embedding],
            [job_embedding]
        )[0][0]
        
        return float(similarity)
    
    def rank_candidates(
        self,
        resumes: List[Dict],
        job_requirements: Dict
    ) -> List[Dict]:
        """
        Rank multiple resumes based on similarity to job requirements
        """
        ranked_resumes = []
        
        for resume in resumes:
            similarity_score = self.calculate_skill_similarity(
                resume.get('skills', []),
                job_requirements.get('required_skills', [])
            )
            
            resume['similarity_score'] = similarity_score['overall_similarity']
            ranked_resumes.append(resume)
        
        # Sort by similarity score (descending)
        ranked_resumes.sort(key=lambda x: x['similarity_score'], reverse=True)
        
        return ranked_resumes
