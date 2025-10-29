const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// @route   POST /api/resume/upload
// @desc    Upload a resume
// @access  Private
router.post('/upload', auth, upload.single('resume'), resumeController.uploadResume);

// @route   GET /api/resume
// @desc    Get all user's resumes
// @access  Private
router.get('/', auth, resumeController.getAllResumes);

// @route   GET /api/resume/:id
// @desc    Get resume by ID
// @access  Private
router.get('/:id', auth, resumeController.getResumeById);

// @route   DELETE /api/resume/:id
// @desc    Delete resume
// @access  Private
router.delete('/:id', auth, resumeController.deleteResume);

module.exports = router;
