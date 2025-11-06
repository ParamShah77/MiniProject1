import React from 'react';
import { ExternalLink, Clock, Star, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

const CourseCard = ({ course }) => {
  const {
    title = 'Course Title',
    platform = 'Coursera',
    instructor = 'Instructor Name',
    duration = '4 weeks',
    rating = 4.5,
    reviewCount = 1234,
    price = 49,
    level = 'Intermediate',
    url = '#',
    skills = [],
  } = course;

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      <div className="flex-1">
        {/* Platform Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="info">{platform}</Badge>
          <Badge variant={getLevelColor(level)}>{level}</Badge>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
          {title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
          by {instructor}
        </p>

        {/* Course Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-warning">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="text-text-secondary-light dark:text-text-secondary-dark">
              ({reviewCount.toLocaleString()})
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium">{price === 0 ? 'Free' : `$${price}`}</span>
          </div>
        </div>

        {/* Skills Covered */}
        {skills.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
              Skills covered:
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark rounded text-xs">
                  +{skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button
        variant="outline"
        icon={ExternalLink}
        iconPosition="right"
        className="w-full mt-4"
        onClick={() => window.open(url, '_blank')}
      >
        View Course
      </Button>
    </Card>
  );
};

export default CourseCard;
