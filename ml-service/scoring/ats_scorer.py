from typing import Dict, List, Any
from parsers.ner_parser import NERResumeParser
from parsers.skill_extractor import AdvancedSkillExtractor
from parsers.similarity_engine import SimilarityEngine
from features.feature_engineering import FeatureEngineer
from scoring.xgboost_ranker import XGBoostRanker

class ATSScorer:
    """
    Complete ATS Scoring Pipeline
    Orchestrates all ML models to produce final score
    """
    
    def __init__(self):
        # Initialize all components
        self.ner_parser = NERResumeParser()
        self.skill_extractor = AdvancedSkillExtractor()
        self.similarity_engine = SimilarityEngine()
        self.feature_engineer = FeatureEngineer()
        self.xgboost_ranker = XGBoostRanker()
    
    def score_resume(
        self,
        resume_text: str,
        job_skills: List[str] = None
    ) -> Dict[str, Any]:
        """
        Complete ATS scoring pipeline
        Returns comprehensive scoring results
        """
        # 1️⃣ Parse resume with NER
        parsed_data = self.ner_parser.parse(resume_text)
        
        # 2️⃣ Extract skills with BERT + TF-IDF
        skill_data = self.skill_extractor.extract_skills(resume_text)
        parsed_data['skills'] = skill_data
        
        # 3️⃣ Calculate similarity (if job skills provided)
        if job_skills:
            similarity_data = self.similarity_engine.calculate_skill_similarity(
                skill_data['all_skills'],
                job_skills
            )
        else:
            similarity_data = {
                'overall_similarity': 0,
                'matched_skills': [],
                'missing_skills': [],
                'skill_matches': []
            }
        
        # 4️⃣ Engineer features
        features = self.feature_engineer.extract_features(
            parsed_data,
            similarity_data
        )
        feature_vector = self.feature_engineer.get_feature_vector(features)
        
        # 5️⃣ Predict with XGBoost
        ml_score = self.xgboost_ranker.predict_relevance(feature_vector)
        
        # 6️⃣ Calculate final ATS score (ensemble)
        final_score = self._calculate_final_score(
            ml_score,
            similarity_data,
            features
        )
        
        # Generate detailed breakdown
        score_breakdown = self._generate_breakdown(
            parsed_data,
            skill_data,
            similarity_data,
            features,
            ml_score,
            final_score
        )
        
        return {
            'final_ats_score': final_score,
            'ml_relevance_score': ml_score,
            'skill_match_score': similarity_data['overall_similarity'],
            'score_breakdown': score_breakdown,
            'parsed_data': parsed_data,
            'extracted_skills': skill_data['all_skills'],
            'skill_gaps': similarity_data.get('missing_skills', []),
            'recommendations': self._generate_recommendations(score_breakdown, similarity_data)
        }
    
    def _calculate_final_score(
        self,
        ml_score: float,
        similarity_data: Dict,
        features: Dict
    ) -> float:
        """
        Ensemble final score from multiple components
        """
        # Weighted combination
        weights = {
            'ml_score': 0.50,           # XGBoost prediction
            'skill_match': 0.30,        # Skill similarity
            'completeness': 0.20        # Resume completeness
        }
        
        # Calculate completeness score
        completeness = (
            features.get('has_name', 0) +
            features.get('has_email', 0) +
            features.get('has_experience_section', 0) +
            features.get('has_education_section', 0) +
            features.get('has_skills_section', 0)
        ) / 5 * 100
        
        # Weighted sum
        final_score = (
            ml_score * weights['ml_score'] +
            similarity_data.get('overall_similarity', 0) * weights['skill_match'] +
            completeness * weights['completeness']
        )
        
        return round(final_score, 2)
    
    def _generate_breakdown(
        self,
        parsed_data: Dict,
        skill_data: Dict,
        similarity_data: Dict,
        features: Dict,
        ml_score: float,
        final_score: float
    ) -> Dict[str, Any]:
        """
        Generate detailed score breakdown
        """
        return {
            'contact_information': {
                'score': sum([
                    features.get('has_name', 0),
                    features.get('has_email', 0),
                    features.get('has_phone', 0),
                    features.get('has_location', 0)
                ]) / 4 * 100,
                'max_score': 100,
                'status': 'complete' if features.get('has_name', 0) == 1 else 'incomplete'
            },
            'experience': {
                'score': min(features.get('years_of_experience', 0) / 5 * 100, 100),
                'max_score': 100,
                'years': features.get('years_of_experience', 0),
                'organizations': int(features.get('organization_count', 0))
            },
            'skills': {
                'score': min(skill_data.get('skill_count', 0) / 15 * 100, 100),
                'max_score': 100,
                'total_skills': skill_data.get('skill_count', 0),
                'categories': len(skill_data.get('categorized_skills', {}))
            },
            'skill_match': {
                'score': similarity_data.get('overall_similarity', 0),
                'max_score': 100,
                'matched': len(similarity_data.get('matched_skills', [])),
                'missing': len(similarity_data.get('missing_skills', []))
            },
            'content_quality': {
                'score': ml_score,
                'max_score': 100,
                'word_count': parsed_data.get('word_count', 0),
                'action_verbs': int(features.get('action_verb_count', 0))
            }
        }
    
    def _generate_recommendations(
        self,
        breakdown: Dict,
        similarity_data: Dict
    ) -> List[Dict[str, str]]:
        """
        Generate actionable recommendations
        """
        recommendations = []
        
        # Contact info recommendations
        if breakdown['contact_information']['score'] < 100:
            recommendations.append({
                'category': 'Contact Information',
                'priority': 'high',
                'message': 'Add complete contact details (name, email, phone, location)'
            })
        
        # Experience recommendations
        if breakdown['experience']['score'] < 50:
            recommendations.append({
                'category': 'Experience',
                'priority': 'high',
                'message': 'Add more detailed work experience with dates and achievements'
            })
        
        # Skills recommendations
        if breakdown['skills']['score'] < 60:
            recommendations.append({
                'category': 'Skills',
                'priority': 'medium',
                'message': f"Add more relevant skills (currently {breakdown['skills']['total_skills']}, aim for 10-15)"
            })
        
        # Skill gap recommendations
        missing_skills = similarity_data.get('missing_skills', [])
        if missing_skills:
            recommendations.append({
                'category': 'Skill Gaps',
                'priority': 'high',
                'message': f"Develop these skills: {', '.join(missing_skills[:5])}"
            })
        
        # Content quality recommendations
        if breakdown['content_quality']['score'] < 70:
            if breakdown['content_quality']['action_verbs'] < 5:
                recommendations.append({
                    'category': 'Writing Quality',
                    'priority': 'medium',
                    'message': 'Use more action verbs (achieved, developed, managed, etc.)'
                })
        
        return recommendations
