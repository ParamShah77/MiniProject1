const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

// GET all analyses
router.get('/all', auth, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    console.log('📊 Fetching analysis history for user:', userId);

    const analyses = await Resume.find({
      userId,
      isBuiltResume: false,
      deleted: { $ne: true }
    }).sort({ uploadedAt: -1, createdAt: -1 });

    console.log('✅ Found', analyses.length, 'analyses');

    res.json({
      status: 'success',
      data: analyses
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
