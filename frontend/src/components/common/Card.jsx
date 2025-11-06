import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  action,
  hover = true,
  className = '' 
}) => {
  const hoverClass = hover ? 'hover:shadow-card-hover dark:hover:border-gray-600' : '';
  
  return (
    <div className={`card ${hoverClass} ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-xl font-semibold text-text-primary-light dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-text-secondary-light dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
