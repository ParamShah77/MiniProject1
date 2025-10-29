import re
from datetime import datetime
from typing import Dict, List, Any
import dateparser

class FeatureEngineer:
    """
    Extract numerical features from resume for ML model
    """
    
    def extract_features(
        self,
        parsed_data: Dict,
        similarity_data: Dict
    ) -> Dict[str, float]:
        """
        Extract all features for ML model
        """
        features = {}
        
        # 1. Basic Information Features
        features['has_name'] = 1.0 if parsed_data.get('primary_info', {}).get('name') else 0.0
        features['has_email'] = 1.0 if parsed_data.get('primary_info', {}).get('email') else 0.0
        features['has_phone'] = 1.0 if parsed_data.get('primary_info', {}).get('phone') else 0.0
        features['has_location'] = 1.0 if parsed_data.get('primary_info', {}).get('location') else 0.0
        
        # 2. Content Length Features
        features['word_count'] = float(parsed_data.get('word_count', 0))
        features['sentence_count'] = float(parsed_data.get('sentence_count', 0))
        features['word_count_normalized'] = min(features['word_count'] / 1000.0, 1.0)  # Normalize to 0-1
        
        # 3. Section Completeness Features
        sections = parsed_data.get('sections', {})
        features['has_experience_section'] = 1.0 if sections.get('experience') else 0.0
        features['has_education_section'] = 1.0 if sections.get('education') else 0.0
        features['has_skills_section'] = 1.0 if sections.get('skills') else 0.0
        features['has_projects_section'] = 1.0 if sections.get('projects') else 0.0
        features['section_count'] = float(len(sections))
        
        # 4. Experience Features
        features['years_of_experience'] = self._extract_years_of_experience(
            parsed_data.get('entities', {}).get('dates', [])
        )
        features['organization_count'] = float(len(parsed_data.get('entities', {}).get('organizations', [])))
        
        # 5. Skill Features
        skill_data = parsed_data.get('skills', {})
        features['total_skills'] = float(skill_data.get('skill_count', 0))
        features['skill_density'] = features['total_skills'] / max(features['word_count'], 1)
        
        categorized_skills = skill_data.get('categorized_skills', {})
        features['programming_skills_count'] = float(len(categorized_skills.get('programming_languages', [])))
        features['framework_skills_count'] = float(len(categorized_skills.get('frameworks', [])))
        features['database_skills_count'] = float(len(categorized_skills.get('databases', [])))
        features['cloud_skills_count'] = float(len(categorized_skills.get('cloud_devops', [])))
        
        # 6. Similarity Features
        features['skill_match_percentage'] = float(similarity_data.get('overall_similarity', 0))
        features['matched_skills_count'] = float(similarity_data.get('match_count', 0))
        features['missing_skills_count'] = float(len(similarity_data.get('missing_skills', [])))
        features['skill_match_ratio'] = (
            features['matched_skills_count'] / 
            max(similarity_data.get('total_required', 1), 1)
        )
        
        # 7. Quality Indicators
        features['has_urls'] = float(len(parsed_data.get('entities', {}).get('urls', [])))
        features['action_verb_count'] = self._count_action_verbs(
            ' '.join(sections.values()) if sections else ''
        )
        
        # 8. Formatting Features
        features['has_bullet_points'] = self._has_bullet_points(
            ' '.join(sections.values()) if sections else ''
        )
        features['proper_capitalization'] = self._check_capitalization(
            parsed_data.get('primary_info', {}).get('name', '')
        )
        
        return features
    
    def _extract_years_of_experience(self, dates: List[str]) -> float:
        """
        Calculate total years of experience from date mentions
        """
        if not dates:
            return 0.0
        
        years = []
        for date_str in dates:
            try:
                # Try to parse year
                parsed = dateparser.parse(date_str)
                if parsed:
                    years.append(parsed.year)
            except:
                # Try extracting year with regex
                year_match = re.search(r'(19|20)\d{2}', date_str)
                if year_match:
                    years.append(int(year_match.group()))
        
        if len(years) >= 2:
            # Calculate experience as max_year - min_year
            return float(max(years) - min(years))
        
        return 0.0
    
    def _count_action_verbs(self, text: str) -> float:
        """
        Count action verbs in resume (indicator of strong writing)
        """
        action_verbs = [
            'achieved', 'improved', 'developed', 'managed', 'led',
            'created', 'designed', 'implemented', 'optimized', 'increased',
            'reduced', 'delivered', 'launched', 'built', 'established',
            'coordinated', 'executed', 'initiated', 'streamlined', 'transformed'
        ]
        
        text_lower = text.lower()
        count = sum(1 for verb in action_verbs if verb in text_lower)
        return float(count)
    
    def _has_bullet_points(self, text: str) -> float:
        """
        Check if resume uses bullet points (good formatting)
        """
        bullet_patterns = ['•', '·', '-', '*', '→']
        has_bullets = any(bullet in text for bullet in bullet_patterns)
        return 1.0 if has_bullets else 0.0
    
    def _check_capitalization(self, name: str) -> float:
        """
        Check if name is properly capitalized
        """
        if not name:
            return 0.0
        
        words = name.split()
        properly_capitalized = all(word[0].isupper() for word in words if word)
        return 1.0 if properly_capitalized else 0.0
    
    def get_feature_vector(self, features: Dict[str, float]) -> List[float]:
        """
        Convert features dict to ordered vector for ML model
        """
        feature_order = [
            'has_name', 'has_email', 'has_phone', 'has_location',
            'word_count_normalized', 'sentence_count',
            'has_experience_section', 'has_education_section', 
            'has_skills_section', 'has_projects_section',
            'years_of_experience', 'organization_count',
            'total_skills', 'skill_density',
            'programming_skills_count', 'framework_skills_count',
            'database_skills_count', 'cloud_skills_count',
            'skill_match_percentage', 'matched_skills_count',
            'missing_skills_count', 'skill_match_ratio',
            'action_verb_count', 'has_bullet_points', 'proper_capitalization'
        ]
        
        return [features.get(key, 0.0) for key in feature_order]
