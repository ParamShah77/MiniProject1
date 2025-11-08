import React, { useState, useEffect } from 'react';
import { FileText, Check, Star, TrendingUp, Filter, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Templates', count: 10 },
    { id: 'modern', name: 'Modern', count: 1 },
    { id: 'technical', name: 'Technical', count: 3 },
    { id: 'traditional', name: 'Traditional', count: 1 },
    { id: 'entry-level', name: 'Entry Level', count: 1 },
    { id: 'creative', name: 'Creative', count: 2 },
    { id: 'professional', name: 'Professional', count: 1 },
    { id: 'executive', name: 'Executive', count: 1 }
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, selectedCategory, searchQuery]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/templates`);
      if (response.data.status === 'success') {
        setTemplates(response.data.data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bestFor?.some(role => role.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredTemplates(filtered);
  };

  const getATSColor = (score) => {
    if (score >= 95) return 'text-success';
    if (score >= 90) return 'text-primary-500';
    if (score >= 85) return 'text-warning';
    return 'text-text-secondary-light dark:text-text-secondary-dark';
  };

  const getATSBadgeVariant = (score) => {
    if (score >= 95) return 'success';
    if (score >= 90) return 'primary';
    return 'warning';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
          Resume Templates
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
          Choose from 10 professionally designed, ATS-optimized templates
        </p>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates by name, role, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-400"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Showing {filteredTemplates.length} of {templates.length} templates
        </p>
        {selectedTemplate && (
          <Badge variant="primary">
            1 template selected
          </Badge>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
              selectedTemplate === template.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {/* Template Preview */}
            <div className="relative aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg mb-4 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: template.font }}>
                    {template.font}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <Badge variant={getATSBadgeVariant(template.atsScore)}>
                  {template.atsScore}% ATS
                </Badge>
                {template.atsScore >= 95 && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Top
                  </Badge>
                )}
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-primary-500/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
                    {template.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {template.layout}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <TrendingUp className={`w-4 h-4 ${getATSColor(template.atsScore)}`} />
                  <span className={`text-sm font-semibold ${getATSColor(template.atsScore)}`}>
                    {template.atsScore}%
                  </span>
                </div>
              </div>

              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
                {template.description}
              </p>

              {/* Best For */}
              {template.bestFor && template.bestFor.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Best for:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.bestFor.slice(0, 2).map((role, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                    {template.bestFor.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{template.bestFor.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-1 mb-4">
                {template.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    <Check className="w-3 h-3 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={selectedTemplate === template.id ? 'primary' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template.id);
                  }}
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Selected
                    </>
                  ) : (
                    'Select'
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Preview for ${template.name} - Feature coming soon!`);
                  }}
                >
                  Preview
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
              No templates found
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Selected Template Action Bar */}
      {selectedTemplate && (
        <Card className="sticky bottom-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </h3>
                <p className="text-sm text-white/80">
                  {templates.find(t => t.id === selectedTemplate)?.atsScore}% ATS Compatible • {templates.find(t => t.id === selectedTemplate)?.layout}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 border-white/30"
                onClick={() => setSelectedTemplate(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="bg-white text-primary-500 hover:bg-white/90"
                onClick={() => {
                  // Navigate to resume builder with selected template
                  window.location.href = `/resume-builder?template=${selectedTemplate}`;
                }}
              >
                Use This Template
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Templates;
