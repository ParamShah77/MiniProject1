import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

const PositionsSection = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        title: '',
        organization: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      }
    ]);
  };

  const handleRemove = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleDescriptionChange = (porIndex, descIndex, value) => {
    const updated = [...data];
    const descriptions = [...updated[porIndex].description];
    descriptions[descIndex] = value;
    updated[porIndex] = { ...updated[porIndex], description: descriptions };
    onChange(updated);
  };

  const handleAddDescription = (index) => {
    const updated = [...data];
    updated[index].description = [...updated[index].description, ''];
    onChange(updated);
  };

  const handleRemoveDescription = (porIndex, descIndex) => {
    const updated = [...data];
    updated[porIndex].description = updated[porIndex].description.filter((_, i) => i !== descIndex);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          Positions of Responsibility
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Add Position
        </Button>
      </div>

      {data.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No positions added yet. Click "Add Position" to get started.
          </p>
        </Card>
      )}

      {data.map((position, index) => (
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
                label="Position Title"
                value={position.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="e.g., Team Captain, Club President"
                required
              />
              <Input
                label="Organization"
                value={position.organization}
                onChange={(e) => handleChange(index, 'organization', e.target.value)}
                placeholder="e.g., College Sports Team, Technical Club"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="month"
                label="Start Date"
                value={position.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              />
              <Input
                type="month"
                label="End Date"
                value={position.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                disabled={position.current}
              />
              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={position.current}
                  onChange={(e) => handleChange(index, 'current', e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-2 focus:ring-primary-500"
                />
                <label
                  htmlFor={`current-${index}`}
                  className="ml-2 text-sm text-text-primary-light dark:text-text-primary-dark"
                >
                  Currently holding this position
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  Responsibilities & Achievements
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Plus}
                  onClick={() => handleAddDescription(index)}
                >
                  Add Point
                </Button>
              </div>

              {position.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex gap-2">
                  <Input
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                    placeholder="• Start with an action verb (Led, Organized, Coordinated...)"
                    className="flex-1"
                  />
                  {position.description.length > 1 && (
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

export default PositionsSection;
