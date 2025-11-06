import React from 'react';

const BaseTemplate = ({ children, font = 'Inter', className = '' }) => {
  return (
    <div 
      className={`bg-white text-gray-900 p-8 shadow-lg ${className}`}
      style={{ 
        fontFamily: font,
        minHeight: '11in',
        width: '8.5in',
        fontSize: '10pt',
        lineHeight: '1.5',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
        hyphens: 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default BaseTemplate;
