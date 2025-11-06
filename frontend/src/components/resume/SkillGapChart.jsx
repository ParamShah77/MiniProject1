import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Badge from '../common/Badge';

const SkillGapChart = ({ matchingSkills = [], missingSkills = [], matchPercentage = 0 }) => {
  const getMatchColor = () => {
    if (matchPercentage >= 75) return 'text-success';
    if (matchPercentage >= 50) return 'text-warning';
    return 'text-error';
  };

  const getMatchBadge = () => {
    if (matchPercentage >= 75) return 'success';
    if (matchPercentage >= 50) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-6">
      {/* Overall Match Percentage */}
      <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className={`text-5xl font-bold ${getMatchColor()} mb-2`}>
          {matchPercentage}%
        </div>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3">
          Overall Match Score
        </p>
        <Badge variant={getMatchBadge()}>
          {matchPercentage >= 75 ? 'Excellent Match' : matchPercentage >= 50 ? 'Good Match' : 'Needs Improvement'}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
            Skills Coverage
          </span>
          <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {matchingSkills.length} / {matchingSkills.length + missingSkills.length} skills
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              matchPercentage >= 75
                ? 'bg-success'
                : matchPercentage >= 50
                ? 'bg-warning'
                : 'bg-error'
            }`}
            style={{ width: `${matchPercentage}%` }}
          />
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matching Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
              Matching Skills ({matchingSkills.length})
            </h3>
          </div>
          <div className="space-y-2">
            {matchingSkills.length > 0 ? (
              matchingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950 rounded-md"
                >
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">
                    {skill}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                No matching skills found
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-error" />
            <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark">
              Skills to Develop ({missingSkills.length})
            </h3>
          </div>
          <div className="space-y-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950 rounded-md"
                >
                  <XCircle className="w-4 h-4 text-error flex-shrink-0" />
                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">
                    {skill}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-success">
                Great! You have all required skills.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {missingSkills.length > 0 && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Recommendations
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Focus on developing the missing skills to improve your match score. We recommend
                starting with the most in-demand skills for your target role.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapChart;
