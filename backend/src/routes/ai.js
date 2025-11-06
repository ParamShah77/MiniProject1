const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// AI Optimization routes (NO AUTH MIDDLEWARE FOR NOW)
router.post('/optimize', aiController.optimizeResume);
router.post('/optimize/section', aiController.optimizeSection);
router.post('/suggest-skills', aiController.suggestSkills);

module.exports = router;
