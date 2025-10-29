const Analysis = require('../models/Analysis');
const Resume = require('../models/Resume');
const JobRole = require('../models/JobRole');

// Simple skill matching algorithm
const analyzeSkillMatch = (resumeSkills, requiredSkills, preferredSkills) => {
  const normalizeSkill = (skill) => skill.toLowerCase().trim();
  
  const resumeSkillsNormalized = resumeSkills.map(normalizeSkill);
  const requiredSkillsNormalized = requiredSkills.map(normalizeSkill);
  const preferredSkillsNormalized = preferredSkills.map(normalizeSkill);
  
  // Find matching skills
  const matchingRequired = requiredSkillsNormalized.filter(skill =>
    resumeSkillsNormalized.includes(skill)
  );
  
  const matchingPreferred = preferredSkillsNormalized.filter(skill =>
    resumeSkillsNormalized.includes(skill)
  );
  
  // Find missing skills
  const missingRequired = requiredSkillsNormalized.filter(skill =>
    !resumeSkillsNormalized.includes(skill)
  );
  
  // Calculate match percentage
  const requiredWeight = 0.7;
  const preferredWeight = 0.3;
  
  const requiredMatch = (matchingRequired.length / requiredSkillsNormalized.length) * 100;
  const preferredMatch = preferredSkillsNormalized.length > 0
    ? (matchingPreferred.length / preferredSkillsNormalized.length) * 100
    : 0;
  
  const matchPercentage = Math.round(
    (requiredMatch * requiredWeight) + (preferredMatch * preferredWeight)
  );
  
  return {
    matchPercentage,
    matchingSkills: [...matchingRequired, ...matchingPreferred],
    missingSkills: missingRequired
  };
};

// @desc    Create new analysis
// @route   POST /api/analysis
// @access  Private
exports.createAnalysis = async (req, res) => {
  try {
    const { resumeId, targetJobRoleId } = req.body;

    // Validate input
    if (!resumeId || !targetJobRoleId) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide resumeId and targetJobRoleId'
      });
    }

    // Fetch resume
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume not found'
      });
    }

    // Fetch job role
    const jobRole = await JobRole.findById(targetJobRoleId);

    if (!jobRole) {
      return res.status(404).json({
        status: 'error',
        message: 'Job role not found'
      });
    }

    // Extract skills from resume (mock for now)
    const resumeSkills = resume.parsedData?.skills || [];
    
    // If no parsed skills, use mock data
    const mockSkills = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git'];
    const skillsToAnalyze = resumeSkills.length > 0 ? resumeSkills : mockSkills;

    // Analyze skill match
    const { matchPercentage, matchingSkills, missingSkills } = analyzeSkillMatch(
      skillsToAnalyze,
      jobRole.requiredSkills,
      jobRole.preferredSkills
    );

    // Generate recommendations
    const recommendations = missingSkills.slice(0, 5).map(skill => ({
      skill,
      priority: missingSkills.indexOf(skill) < 3 ? 'High' : 'Medium',
      estimatedTime: '20-30 hours',
      difficulty: 'Intermediate'
    }));

    // Generate feedback
    const feedback = {
      strengths: matchingSkills.slice(0, 5),
      improvements: missingSkills.slice(0, 5),
      overallAssessment: matchPercentage >= 75
        ? 'Excellent match! Your skills align well with this role.'
        : matchPercentage >= 50
        ? 'Good match with room for improvement in key areas.'
        : 'Focus on developing missing skills to improve your match.'
    };

    // Create analysis
    const analysis = await Analysis.create({
      userId: req.user.id,
      resumeId,
      targetJobRoleId,
      matchPercentage,
      matchingSkills,
      missingSkills,
      recommendations,
      feedback,
      status: 'completed'
    });

    res.status(201).json({
      status: 'success',
      message: 'Analysis created successfully',
      data: { analysis }
    });
  } catch (error) {
    console.error('Create analysis error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating analysis'
    });
  }
};

// @desc    Get all user's analyses
// @route   GET /api/analysis
// @access  Private
exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user.id })
      .populate('resumeId', 'fileName originalName uploadedAt')
      .populate('targetJobRoleId', 'title category experienceLevel')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: {
        count: analyses.length,
        analyses
      }
    });
  } catch (error) {
    console.error('Get analyses error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching analyses'
    });
  }
};

// @desc    Get analysis by ID
// @route   GET /api/analysis/:id
// @access  Private
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user.id
    })
      .populate('resumeId')
      .populate('targetJobRoleId');

    if (!analysis) {
      return res.status(404).json({
        status: 'error',
        message: 'Analysis not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { analysis }
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching analysis'
    });
  }
};

// @desc    Delete analysis
// @route   DELETE /api/analysis/:id
// @access  Private
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!analysis) {
      return res.status(404).json({
        status: 'error',
        message: 'Analysis not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting analysis'
    });
  }
};
