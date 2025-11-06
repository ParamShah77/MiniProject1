const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    trim: true
  },
  platform: {
    type: String,
    required: [true, 'Please add a platform'],
    enum: {
      values: ['Udemy', 'Coursera', 'edX', 'YouTube', 'Microsoft Learn', 'Other'],  // UPDATED - Added YouTube, Microsoft Learn, Other
      message: '{VALUE} is not a valid platform'
    }
  },
  instructor: {
    type: String,
    required: [true, 'Please add an instructor name']
  },
  url: {
    type: String,
    required: [true, 'Please add a course URL']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  relatedSkills: {
    type: [String],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
      message: '{VALUE} is not a valid difficulty level'
    }
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
  }
});

// Index for searching
courseSchema.index({ title: 'text', description: 'text', relatedSkills: 'text' });

module.exports = mongoose.model('Course', courseSchema);
