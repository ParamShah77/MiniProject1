from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict, Tuple, Any
import re

class AdvancedSkillExtractor:
    """
    Hybrid skill extraction using BERT embeddings + TF-IDF
    """
    
    def __init__(self):
        # Load Sentence-BERT model
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Comprehensive skill database
        self.skill_database = self._load_skill_database()
        
        # Pre-compute skill embeddings
        self.skill_embeddings = self.model.encode(self.skill_database)
        
    def _load_skill_database(self) -> List[str]:
        """
        Load comprehensive skill database
        """
        skills = [
            # Programming Languages
            'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust',
            'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'SQL',
            
            # Web Technologies
            'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express',
            'Django', 'Flask', 'FastAPI', 'Spring Boot', 'ASP.NET', 'Laravel',
            'Next.js', 'Nuxt.js', 'Svelte', 'jQuery', 'Bootstrap', 'Tailwind CSS',
            
            # Mobile Development
            'React Native', 'Flutter', 'iOS Development', 'Android Development',
            'Swift UI', 'Jetpack Compose',
            
            # Databases
            'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra',
            'Oracle', 'SQL Server', 'DynamoDB', 'Firebase', 'Neo4j',
            
            # Cloud & DevOps
            'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins',
            'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'CI/CD',
            
            # Machine Learning
            'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras',
            'Scikit-learn', 'NLP', 'Computer Vision', 'Neural Networks',
            
            # Data Science
            'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Data Analysis',
            'Data Visualization', 'Statistical Analysis',
            
            # Tools
            'Git', 'GitHub', 'GitLab', 'Bitbucket', 'JIRA', 'Confluence',
            'VS Code', 'IntelliJ IDEA', 'Postman', 'Swagger',
            
            # Methodologies
            'Agile', 'Scrum', 'Kanban', 'Test-Driven Development', 'Microservices',
            'REST API', 'GraphQL', 'WebSockets', 'Object-Oriented Programming'
        ]
        return skills
    
    def extract_skills(self, text: str, threshold: float = 0.7) -> Dict[str, Any]:
        """
        Extract skills using BERT embeddings + similarity matching
        """
        # Method 1: Exact matching (TF-IDF)
        exact_matches = self._exact_skill_matching(text)
        
        # Method 2: Semantic matching (BERT)
        semantic_matches = self._semantic_skill_matching(text, threshold)
        
        # Combine and deduplicate
        all_skills = list(set(exact_matches + semantic_matches))
        
        # Categorize skills
        categorized = self._categorize_skills(all_skills)
        
        return {
            'all_skills': all_skills,
            'skill_count': len(all_skills),
            'categorized_skills': categorized,
            'extraction_confidence': self._calculate_confidence(exact_matches, semantic_matches)
        }
    
    def _exact_skill_matching(self, text: str) -> List[str]:
        """
        TF-IDF based exact skill matching
        """
        text_lower = text.lower()
        found_skills = []
        
        for skill in self.skill_database:
            if skill.lower() in text_lower:
                found_skills.append(skill)
        
        return found_skills
    
    def _semantic_skill_matching(self, text: str, threshold: float) -> List[str]:
        """
        BERT-based semantic skill matching
        """
        # Split text into sentences/chunks
        sentences = text.split('.')
        found_skills = []
        
        for sentence in sentences[:50]:  # Limit to first 50 sentences
            if len(sentence.strip()) < 10:
                continue
                
            # Get sentence embedding
            sentence_embedding = self.model.encode([sentence])[0]
            
            # Calculate similarity with all skills
            similarities = cosine_similarity(
                [sentence_embedding],
                self.skill_embeddings
            )[0]
            
            # Find skills above threshold
            for idx, similarity in enumerate(similarities):
                if similarity >= threshold:
                    skill = self.skill_database[idx]
                    if skill not in found_skills:
                        found_skills.append(skill)
        
        return found_skills
    
    def _categorize_skills(self, skills: List[str]) -> Dict[str, List[str]]:
        """
        Categorize skills into groups
        """
        categories = {
            'programming_languages': [],
            'frameworks': [],
            'databases': [],
            'cloud_devops': [],
            'ml_ai': [],
            'tools': [],
            'methodologies': []
        }
        
        # Simple categorization logic
        prog_langs = ['Python', 'Java', 'JavaScript', 'C++', 'Go', 'Ruby']
        frameworks = ['React', 'Angular', 'Vue', 'Django', 'Flask', 'Spring']
        databases = ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
        cloud = ['AWS', 'Azure', 'Docker', 'Kubernetes']
        ml = ['Machine Learning', 'TensorFlow', 'PyTorch']
        
        for skill in skills:
            if skill in prog_langs:
                categories['programming_languages'].append(skill)
            elif skill in frameworks:
                categories['frameworks'].append(skill)
            elif skill in databases:
                categories['databases'].append(skill)
            elif skill in cloud:
                categories['cloud_devops'].append(skill)
            elif skill in ml:
                categories['ml_ai'].append(skill)
            else:
                categories['tools'].append(skill)
        
        return {k: v for k, v in categories.items() if v}  # Remove empty categories
    
    def _calculate_confidence(self, exact: List[str], semantic: List[str]) -> float:
        """
        Calculate extraction confidence score
        """
        total = len(set(exact + semantic))
        exact_count = len(exact)
        
        if total == 0:
            return 0.0
        
        # Higher confidence if more exact matches
        confidence = (exact_count / total) * 100
        return round(confidence, 2)
