const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const { auth } = require('../middleware/auth');

// @route   POST /api/analysis
// @desc    Create new analysis
// @access  Private
router.post('/', auth, analysisController.createAnalysis);

// @route   GET /api/analysis
// @desc    Get all user's analyses
// @access  Private
router.get('/', auth, analysisController.getAllAnalyses);

// @route   GET /api/analysis/:id
// @desc    Get analysis by ID
// @access  Private
router.get('/:id', auth, analysisController.getAnalysisById);

// @route   DELETE /api/analysis/:id
// @desc    Delete analysis
// @access  Private
router.delete('/:id', auth, analysisController.deleteAnalysis);

module.exports = router;



