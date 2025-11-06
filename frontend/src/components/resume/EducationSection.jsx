import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

const EducationSection = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        location: ''
      }
    ]);
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          Education
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Add Education
        </Button>
      </div>

      {data.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No education added yet.
          </p>
        </Card>
      )}

      {data.map((edu, index) => (
        <Card key={index} className="relative">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="space-y-4 pr-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                placeholder="e.g., Stanford University"
                required
              />
              <Input
                label="Location"
                value={edu.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
                placeholder="e.g., Stanford, CA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
                required
              />
              <Input
                label="Field of Study"
                value={edu.field}
                onChange={(e) => handleChange(index, 'field', e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="month"
                label="Start Date"
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              />
              <Input
                type="month"
                label="End Date"
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
              />
              <Input
                label="GPA"
                value={edu.gpa}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EducationSection;
