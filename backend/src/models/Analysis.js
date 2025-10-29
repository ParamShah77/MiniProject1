const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  targetJobRoleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobRole',
    required: true
  },
  matchPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  matchingSkills: [String],
  missingSkills: [String],
  recommendations: [{
    skill: String,
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low']
    },
    estimatedTime: String, // e.g., "20-30 hours"
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    }
  }],
  feedback: {
    strengths: [String],
    improvements: [String],
    overallAssessment: String
  },
  learningRoadmap: [{
    step: Number,
    skill: String,
    duration: String,
    resources: [String],
    milestones: [String]
  }],
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  error: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
analysisSchema.index({ userId: 1, createdAt: -1 });
analysisSchema.index({ resumeId: 1 });

module.exports = mongoose.model('Analysis', analysisSchema);
