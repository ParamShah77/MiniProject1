const Resume = require('../models/Resume');

// Complete template definitions with all 10 templates
const templates = [
  {
    id: 'minimal-jake',
    name: 'Minimal (Jake-style)',
    description: 'Clean, modern single-column layout perfect for professionals',
    font: 'Inter',
    layout: 'single-column',
    thumbnail: '/templates/jake-thumb.png',
    category: 'modern',
    atsScore: 98,
    features: ['Single column layout', 'Clean typography', 'Excellent readability'],
    bestFor: ['Software Engineers', 'Designers', 'Modern Professionals'],
    colors: { primary: '#2563eb', secondary: '#64748b' }
  },
  {
    id: 'techy-modern',
    name: 'Techy Modern',
    description: 'Two-column tech-focused design with emphasis on skills',
    font: 'Poppins',
    layout: 'two-column',
    thumbnail: '/templates/techy-thumb.png',
    category: 'technical',
    atsScore: 95,
    features: ['Two column layout', 'Tech-focused', 'Skills sidebar'],
    bestFor: ['Developers', 'IT Professionals', 'Tech Roles'],
    colors: { primary: '#0ea5e9', secondary: '#334155' }
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column format for conservative industries',
    font: 'Calibri',
    layout: 'single-column',
    thumbnail: '/templates/classic-thumb.png',
    category: 'traditional',
    atsScore: 100,
    features: ['Traditional format', 'High ATS compatibility', 'Professional appearance'],
    bestFor: ['Corporate', 'Finance', 'Legal', 'Government'],
    colors: { primary: '#000000', secondary: '#404040' }
  },
  {
    id: 'student-fresher',
    name: 'Student / Fresher',
    description: 'Entry-level focused with objective and education emphasis',
    font: 'Roboto',
    layout: 'single-column',
    thumbnail: '/templates/student-thumb.png',
    category: 'entry-level',
    atsScore: 97,
    features: ['Objective section', 'Education first', 'Skills highlight'],
    bestFor: ['Students', 'Recent Graduates', 'Career Changers'],
    colors: { primary: '#3b82f6', secondary: '#6b7280' }
  },
  {
    id: 'project-based',
    name: 'Project-based',
    description: 'Large project cards showcasing your work prominently',
    font: 'Nunito',
    layout: 'project-cards',
    thumbnail: '/templates/project-thumb.png',
    category: 'creative',
    atsScore: 92,
    features: ['Large project cards', 'Visual layout', 'Portfolio style'],
    bestFor: ['Project Managers', 'Consultants', 'Portfolio Careers'],
    colors: { primary: '#8b5cf6', secondary: '#4b5563' }
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Emphasis on technical skills, tools, and quantitative achievements',
    font: 'Lato',
    layout: 'skills-focused',
    thumbnail: '/templates/data-thumb.png',
    category: 'technical',
    atsScore: 96,
    features: ['Skills emphasis', 'Tools showcase', 'Data-driven'],
    bestFor: ['Data Scientists', 'Analysts', 'ML Engineers'],
    colors: { primary: '#06b6d4', secondary: '#475569' }
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'GitHub and tech stack focus for software engineers',
    font: 'Montserrat',
    layout: 'tech-stack',
    thumbnail: '/templates/developer-thumb.png',
    category: 'technical',
    atsScore: 94,
    features: ['GitHub integration', 'Tech stack display', 'Code-focused'],
    bestFor: ['Software Developers', 'Full Stack Engineers', 'DevOps'],
    colors: { primary: '#0284c7', secondary: '#475569' }
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    description: 'Balanced layout perfect for business and analyst roles',
    font: 'Open Sans',
    layout: 'balanced',
    thumbnail: '/templates/business-thumb.png',
    category: 'professional',
    atsScore: 97,
    features: ['Balanced layout', 'Professional', 'Achievement-focused'],
    bestFor: ['Business Analysts', 'Consultants', 'Product Managers'],
    colors: { primary: '#2563eb', secondary: '#6b7280' }
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Light, aesthetic design for creative professionals',
    font: 'Raleway',
    layout: 'creative',
    thumbnail: '/templates/designer-thumb.png',
    category: 'creative',
    atsScore: 88,
    features: ['Light aesthetic', 'Creative layout', 'Visual emphasis'],
    bestFor: ['Designers', 'Creative Directors', 'UX/UI Professionals'],
    colors: { primary: '#ec4899', secondary: '#94a3b8' }
  },
  {
    id: 'senior-professional',
    name: 'Senior Professional',
    description: 'Executive summary style for leadership positions',
    font: 'Arial',
    layout: 'executive',
    thumbnail: '/templates/senior-thumb.png',
    category: 'executive',
    atsScore: 99,
    features: ['Executive summary', 'Leadership focus', 'Professional polish'],
    bestFor: ['Senior Managers', 'Executives', 'Directors', 'C-Level'],
    colors: { primary: '#1e40af', secondary: '#334155' }
  }
];

// @desc    Get all templates
// @route   GET /api/templates
// @access  Public
exports.getAllTemplates = async (req, res) => {
  try {
    const { category, atsScore } = req.query;
    
    let filteredTemplates = templates;
    
    // Filter by category if provided
    if (category) {
      filteredTemplates = filteredTemplates.filter(t => t.category === category);
    }
    
    // Filter by minimum ATS score if provided
    if (atsScore) {
      filteredTemplates = filteredTemplates.filter(t => t.atsScore >= parseInt(atsScore));
    }

    res.status(200).json({
      status: 'success',
      data: {
        count: filteredTemplates.length,
        templates: filteredTemplates
      }
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching templates'
    });
  }
};

// @desc    Get template by ID
// @route   GET /api/templates/:id
// @access  Public
exports.getTemplateById = async (req, res) => {
  try {
    const template = templates.find(t => t.id === req.params.id);
    
    if (!template) {
      return res.status(404).json({
        status: 'error',
        message: 'Template not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { template }
    });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching template'
    });
  }
};

// @desc    Apply template to resume
// @route   POST /api/templates/:id/apply
// @access  Private
exports.applyTemplate = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const templateId = req.params.id;

    const template = templates.find(t => t.id === templateId);
    if (!template) {
      return res.status(404).json({
        status: 'error',
        message: 'Template not found'
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume not found'
      });
    }

    // Update resume with selected template
    resume.selectedTemplate = templateId;
    await resume.save();

    res.status(200).json({
      status: 'success',
      message: 'Template applied successfully',
      data: { 
        resume: {
          id: resume._id,
          template: templateId,
          templateName: template.name
        }
      }
    });
  } catch (error) {
    console.error('Apply template error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error applying template'
    });
  }
};

// @desc    Get template categories
// @route   GET /api/templates/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = [...new Set(templates.map(t => t.category))];
    res.status(200).json({
      status: 'success',
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching categories'
    });
  }
};

module.exports = exports;
