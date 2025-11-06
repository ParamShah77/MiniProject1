import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

const ProjectsSection = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: '',
        description: '',
        technologies: [],
        link: '',
        date: ''
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

  const handleTechChange = (index, value) => {
    const techs = value.split(',').map(t => t.trim()).filter(t => t);
    handleChange(index, 'technologies', techs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          Projects
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Add Project
        </Button>
      </div>

      {data.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No projects added yet.
          </p>
        </Card>
      )}

      {data.map((project, index) => (
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
                label="Project Name"
                value={project.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                placeholder="e.g., E-commerce Platform"
                required
              />
              <Input
                type="date"
                label="Date"
                value={project.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
              />
            </div>

            <textarea
              value={project.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              placeholder="Describe your project and its impact..."
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-500 resize-vertical"
            />

            <Input
              label="Technologies (comma-separated)"
              value={project.technologies.join(', ')}
              onChange={(e) => handleTechChange(index, e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB"
            />

            <Input
              label="Project Link (optional)"
              value={project.link}
              onChange={(e) => handleChange(index, 'link', e.target.value)}
              placeholder="e.g., https://github.com/..."
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsSection;
