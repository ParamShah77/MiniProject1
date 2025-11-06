const Resume = require('../models/Resume');

// Get all uploaded resumes (analyses)
exports.getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;

    console.log('📊 Fetching analysis history for user:', userId);

    const analyses = await Resume.find({
      userId,
      isBuiltResume: false,
      deleted: { $ne: true }
    })
      .sort({ uploadedAt: -1, createdAt: -1 })
      .select('originalName fileType atsScore parsedData uploadedAt createdAt parseStatus');

    console.log('✅ Found', analyses.length, 'analyses');

    res.json({
      status: 'success',
      data: analyses,
      message: 'Analysis history retrieved'
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get analysis by ID
exports.getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId || req.user.id;

    const analysis = await Resume.findOne({
      _id: id,
      userId,
      isBuiltResume: false
    });

    if (!analysis) {
      return res.status(404).json({
        status: 'error',
        message: 'Analysis not found'
      });
    }

    res.json({
      status: 'success',
      data: analysis
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
