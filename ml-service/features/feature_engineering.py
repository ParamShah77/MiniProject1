from typing import Dict, List

class FeatureEngineer:
    def extract_features(self, parsed_data: Dict, similarity_data: Dict) -> Dict[str, float]:
        """Extract numerical features from resume data"""
        features = {}
        
        # Contact info features
        primary_info = parsed_data.get('primary_info', {})
        features['has_name'] = 1.0 if primary_info.get('name') else 0.0
        features['has_email'] = 1.0 if primary_info.get('email') else 0.0
        features['has_phone'] = 1.0 if primary_info.get('phone') else 0.0
        
        # Content features
        features['word_count'] = float(parsed_data.get('word_count', 0))
        
        # Skill features
        features['skill_count'] = float(len(similarity_data.get('matched_skills', [])))
        features['skill_match_percentage'] = float(similarity_data.get('overall_similarity', 0))
        
        return features
    
    def get_feature_vector(self, features: Dict[str, float]) -> List[float]:
        """Convert features dict to ordered list"""
        feature_order = [
            'has_name', 'has_email', 'has_phone',
            'word_count', 'skill_count', 'skill_match_percentage'
        ]
        return [features.get(key, 0.0) for key in feature_order]
