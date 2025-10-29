const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number, // in bytes
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx'],
    required: true
  },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
    skills: [String],
    experience: [{
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String,
      technologies: [String]
    }],
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: String,
      endDate: String,
      gpa: String
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      url: String
    }],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      url: String
    }]
  },
  parseStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  parseError: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  // Built resume fields
  isBuiltResume: {
    type: Boolean,
    default: false
  },
  builtResumeData: {
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
      summary: String
    },
    experience: [{
      company: String,
      position: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: [String],
      technologies: [String]
    }],
    education: [{
      institution: String,
      degree: String,
      field: String,
      location: String,
      startDate: String,
      endDate: String,
      gpa: String,
      achievements: [String]
    }],
    skills: {
      technical: [String],
      soft: [String],
      languages: [String],
      tools: [String]
    },
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      github: String,
      demo: String,
      highlights: [String]
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      url: String,
      expiryDate: String
    }]
  }
}, {
  timestamps: true
});

// Index for faster queries
resumeSchema.index({ userId: 1, uploadedAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
