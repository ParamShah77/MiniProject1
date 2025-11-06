import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

const ExperienceSection = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
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

  const handleDescriptionChange = (expIndex, descIndex, value) => {
    const updated = [...data];
    const descriptions = [...updated[expIndex].description];
    descriptions[descIndex] = value;
    updated[expIndex] = { ...updated[expIndex], description: descriptions };
    onChange(updated);
  };

  const handleAddDescription = (index) => {
    const updated = [...data];
    updated[index].description = [...updated[index].description, ''];
    onChange(updated);
  };

  const handleRemoveDescription = (expIndex, descIndex) => {
    const updated = [...data];
    updated[expIndex].description = updated[expIndex].description.filter((_, i) => i !== descIndex);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          Work Experience
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Add Experience
        </Button>
      </div>

      {data.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No experience added yet. Click "Add Experience" to get started.
          </p>
        </Card>
      )}

      {data.map((exp, index) => (
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
                label="Position"
                value={exp.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                required
              />
              <Input
                label="Company"
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                placeholder="e.g., Google, Microsoft"
                required
              />
            </div>

            <Input
              label="Location"
              value={exp.location}
              onChange={(e) => handleChange(index, 'location', e.target.value)}
              placeholder="e.g., San Francisco, CA"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="month"
                label="Start Date"
                value={exp.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              />
              <Input
                type="month"
                label="End Date"
                value={exp.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                disabled={exp.current}
              />
              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.current}
                  onChange={(e) => handleChange(index, 'current', e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                />
                <label
                  htmlFor={`current-${index}`}
                  className="ml-2 text-sm text-text-primary-light dark:text-text-primary-dark"
                >
                  Currently working
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  Description & Achievements
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Plus}
                  onClick={() => handleAddDescription(index)}
                >
                  Add Bullet
                </Button>
              </div>

              {exp.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex gap-2">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                    placeholder="• Start with action verb (Developed, Led, Managed, etc.)&#10;• Add multiple bullet points&#10;• One bullet per line"
                    rows="3"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500 resize-vertical"
                  />
                  {exp.description.length > 1 && (
                    <button
                      onClick={() => handleRemoveDescription(index, descIndex)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExperienceSection;
