const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['Coursera', 'Udemy', 'edX', 'Pluralsight', 'LinkedIn Learning', 'Udacity', 'Other']
  },
  instructor: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  description: String,
  relatedSkills: {
    type: [String],
    required: true,
    validate: {
      validator: function(skills) {
        return skills.length > 0;
      },
      message: 'At least one related skill is required'
    }
  },
  duration: String, // e.g., "4 weeks", "20 hours"
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  price: {
    amount: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    isFree: {
      type: Boolean,
      default: false
    }
  },
  language: {
    type: String,
    default: 'English'
  },
  certificate: {
    type: Boolean,
    default: false
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
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ relatedSkills: 1 });
courseSchema.index({ platform: 1, difficulty: 1 });

module.exports = mongoose.model('Course', courseSchema);
