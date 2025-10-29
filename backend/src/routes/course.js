const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { auth } = require('../middleware/auth');

// @route   POST /api/courses/recommendations
// @desc    Get course recommendations based on missing skills
// @access  Private
router.post('/recommendations', auth, courseController.getCourseRecommendations);

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', courseController.getAllCourses);

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', courseController.getCourseById);

// @route   GET /api/courses/search
// @desc    Search courses
// @access  Public
router.get('/search', courseController.searchCourses);

module.exports = router;
