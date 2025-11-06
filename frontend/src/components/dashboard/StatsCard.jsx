import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, trend = 'up' }) => {
  const trendColor = trend === 'up' ? 'text-success' : 'text-error';
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary-light dark:text-gray-400 mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-text-primary-light dark:text-white">
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
            <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
