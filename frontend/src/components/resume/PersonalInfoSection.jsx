import React from 'react';
import Input from '../common/Input';

const PersonalInfoSection = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        value={data.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        placeholder="John Doe"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
          required
        />
        <Input
          label="Phone"
          type="tel"
          value={data.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Location"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
        />
        <Input
          label="Portfolio Website"
          type="url"
          value={data.portfolio}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          placeholder="https://yourportfolio.com"
        />
      </div>

      <Input
        label="LinkedIn Profile"
        type="url"
        value={data.linkedin}
        onChange={(e) => handleChange('linkedin', e.target.value)}
        placeholder="https://linkedin.com/in/..."
      />

      <Input
        label="GitHub Profile"
        type="url"
        value={data.github}
        onChange={(e) => handleChange('github', e.target.value)}
        placeholder="https://github.com/..."
      />

      <textarea
        value={data.summary}
        onChange={(e) => handleChange('summary', e.target.value)}
        placeholder="Write a brief professional summary about yourself..."
        rows="5"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>
  );
};

export default PersonalInfoSection;
