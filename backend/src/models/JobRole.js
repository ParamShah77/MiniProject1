const mongoose = require('mongoose');

const jobRoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Software Development',
      'Data Science',
      'Product Management',
      'Design',
      'DevOps',
      'Business',
      'Marketing',
      'Other'
    ]
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true,
    validate: {
      validator: function(skills) {
        return skills.length > 0;
      },
      message: 'At least one skill is required'
    }
  },
  preferredSkills: [String],
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'],
    required: true
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  demandLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High'],
    default: 'Medium'
  },
  growthRate: {
    type: Number, // Percentage
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search
jobRoleSchema.index({ title: 'text', description: 'text' });
jobRoleSchema.index({ category: 1, experienceLevel: 1 });

module.exports = mongoose.model('JobRole', jobRoleSchema);
