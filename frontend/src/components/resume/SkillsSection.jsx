import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

const SkillsSection = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState({ type: 'technical', value: '' });

  const addSkill = () => {
    if (newSkill.value.trim()) {
      onChange({
        ...data,
        [newSkill.type]: [...(data[newSkill.type] || []), newSkill.value]
      });
      setNewSkill({ type: 'technical', value: '' });
    }
  };

  const removeSkill = (type, index) => {
    onChange({
      ...data,
      [type]: data[type].filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const skillCategories = [
    { key: 'technical', label: 'Technical Skills' },
    { key: 'tools', label: 'Tools & Platforms' },
    { key: 'soft', label: 'Soft Skills' },
    { key: 'languages', label: 'Languages' }
  ];

  return (
    <div className="space-y-6">
      {skillCategories.map(category => (
        <Card key={category.key}>
          <h3 className="text-lg font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
            {category.label}
          </h3>

          <div className="mb-4 flex gap-2">
            <Input
              value={newSkill.type === category.key ? newSkill.value : ''}
              onChange={(e) => setNewSkill({ type: category.key, value: e.target.value })}
              onKeyPress={handleKeyPress}
              placeholder={`Add ${category.label.toLowerCase()}...`}
              className="flex-1"
            />
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => {
                setNewSkill({ type: category.key, value: newSkill.value });
                addSkill();
              }}
              size="sm"
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(data[category.key] || []).map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(category.key, index)}
                  className="hover:opacity-70"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SkillsSection;
