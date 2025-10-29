import xgboost as xgb
import numpy as np
from typing import Dict, List
import pickle
import os

class XGBoostRanker:
    """
    XGBoost model for ranking resume relevance
    """
    
    def __init__(self, model_path: str = None):
        if model_path and os.path.exists(model_path):
            # Load pre-trained model
            self.model = pickle.load(open(model_path, 'rb'))
            self.is_trained = True
        else:
            # Initialize new model
            self.model = xgb.XGBRegressor(
                objective='reg:squarederror',
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                random_state=42
            )
            self.is_trained = False
    
    def predict_relevance(self, feature_vector: List[float]) -> float:
        """
        Predict relevance score for a resume
        Returns score between 0-100
        """
        if not self.is_trained:
            # Use rule-based scoring if model not trained
            return self._rule_based_score(feature_vector)
        
        # Reshape for prediction
        X = np.array([feature_vector])
        
        # Predict
        score = self.model.predict(X)[0]
        
        # Normalize to 0-100 range
        score = max(0, min(100, score))
        
        return float(score)
    
    def _rule_based_score(self, feature_vector: List[float]) -> float:
        """
        Rule-based scoring when ML model is not trained
        This mimics what a trained model would do
        """
        # Feature weights (learned from domain knowledge)
        weights = {
            'contact_info': 0.10,      # features 0-3
            'content_quality': 0.15,   # features 4-5
            'sections': 0.15,          # features 6-9
            'experience': 0.15,        # features 10-11
            'skills': 0.20,            # features 12-17
            'skill_match': 0.20,       # features 18-21
            'formatting': 0.05         # features 22-24
        }
        
        # Calculate weighted scores
        score = 0.0
        
        # Contact info (features 0-3)
        contact_score = sum(feature_vector[0:4]) / 4
        score += contact_score * weights['contact_info'] * 100
        
        # Content quality (features 4-5)
        content_score = min(feature_vector[4], 1.0)  # word_count_normalized
        score += content_score * weights['content_quality'] * 100
        
        # Sections (features 6-9)
        section_score = sum(feature_vector[6:10]) / 4
        score += section_score * weights['sections'] * 100
        
        # Experience (features 10-11)
        exp_score = min(feature_vector[10] / 5.0, 1.0)  # Normalize years
        score += exp_score * weights['experience'] * 100
        
        # Skills (features 12-17)
        skill_score = min(feature_vector[12] / 15.0, 1.0)  # Normalize skill count
        score += skill_score * weights['skills'] * 100
        
        # Skill match (features 18-21)
        match_score = feature_vector[18] / 100.0  # Already 0-100, normalize to 0-1
        score += match_score * weights['skill_match'] * 100
        
        # Formatting (features 22-24)
        format_score = sum(feature_vector[22:25]) / 3
        score += format_score * weights['formatting'] * 100
        
        return round(score, 2)
    
    def train_model(self, X_train: np.ndarray, y_train: np.ndarray):
        """
        Train the XGBoost model
        X_train: Feature vectors
        y_train: Target scores (0-100)
        """
        self.model.fit(X_train, y_train)
        self.is_trained = True
    
    def save_model(self, path: str):
        """
        Save trained model to file
        """
        pickle.dump(self.model, open(path, 'wb'))
    
    def get_feature_importance(self) -> Dict[str, float]:
        """
        Get feature importance scores
        """
        if not self.is_trained:
            return {}
        
        feature_names = [
            'has_name', 'has_email', 'has_phone', 'has_location',
            'word_count', 'sentence_count',
            'experience_section', 'education_section', 'skills_section', 'projects_section',
            'years_experience', 'organizations',
            'total_skills', 'skill_density',
            'prog_skills', 'framework_skills', 'db_skills', 'cloud_skills',
            'skill_match_%', 'matched_count', 'missing_count', 'match_ratio',
            'action_verbs', 'bullet_points', 'capitalization'
        ]
        
        importance = self.model.feature_importances_
        
        return dict(zip(feature_names, importance))
