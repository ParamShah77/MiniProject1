const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

// Dashboard statistics
router.get('/stats', auth, dashboardController.getDashboardStats);

// Recent activity
router.get('/activity', auth, dashboardController.getRecentActivity);

// ATS score trends
router.get('/trends', auth, dashboardController.getATSTrends);

// Skills gap analysis
router.get('/skills-gap', auth, dashboardController.getSkillsGap);

module.exports = router;