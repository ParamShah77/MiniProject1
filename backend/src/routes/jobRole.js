const express = require('express');
const router = express.Router();
const jobRoleController = require('../controllers/jobRoleController');

// @route   GET /api/job-roles
// @desc    Get all job roles
// @access  Public
router.get('/', jobRoleController.getAllJobRoles);

// @route   GET /api/job-roles/:id
// @desc    Get job role by ID
// @access  Public
router.get('/:id', jobRoleController.getJobRoleById);

// @route   GET /api/job-roles/search
// @desc    Search job roles
// @access  Public
router.get('/search', jobRoleController.searchJobRoles);

module.exports = router;
