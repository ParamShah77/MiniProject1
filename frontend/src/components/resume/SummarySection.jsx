import React from 'react';
import Card from '../common/Card';

const SummarySection = ({ data, onChange }) => {
  // Handle if data is undefined
  const summary = typeof data === 'string' ? data : (data?.summary || '');

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
          Professional Summary
        </h3>
        <textarea
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career goals..."
          rows="6"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </Card>
    </div>
  );
};

export default SummarySection;
