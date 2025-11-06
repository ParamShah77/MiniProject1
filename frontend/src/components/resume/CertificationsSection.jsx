import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

const CertificationsSection = ({ data, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: '',
        issuer: '',
        date: '',
        link: ''
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
          Certifications
        </h3>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAdd}
        >
          Add Certification
        </Button>
      </div>

      {data.length === 0 && (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No certifications added yet.
          </p>
        </Card>
      )}

      {data.map((cert, index) => (
        <Card key={index} className="relative">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="space-y-4 pr-12">
            <Input
              label="Certification Name"
              value={cert.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="e.g., AWS Certified Solutions Architect"
              required
            />

            <Input
              label="Issuer"
              value={cert.issuer}
              onChange={(e) => handleChange(index, 'issuer', e.target.value)}
              placeholder="e.g., Amazon Web Services"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Date Obtained"
                value={cert.date}
                onChange={(e) => handleChange(index, 'date', e.target.value)}
              />

              <Input
                label="Certificate Link (optional)"
                value={cert.link}
                onChange={(e) => handleChange(index, 'link', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CertificationsSection;
