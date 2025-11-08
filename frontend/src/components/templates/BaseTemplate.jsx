import React from 'react';

const BaseTemplate = ({ children, font = 'Inter', className = '' }) => {
  return (
    <div 
      className={`max-w-4xl mx-auto bg-white text-gray-900 p-12 shadow-sm ${className}`}
      style={{ 
        fontFamily: font,
        minHeight: '11in',
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
