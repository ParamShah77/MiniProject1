const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  matchingSkills: {
    type: [String],
    default: []
  },
  missingSkills: {
    type: [String],
    default: []
  },
  recommendations: [{
    title: String,
    description: String
  }],
  recommendedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  feedback: {
    overallAssessment: String,
    strengths: [String],
    improvements: [String],
    atsScore: {
      type: Number,
      default: 0
    },
    scoreBreakdown: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);
