const Course = require('../models/Course');
const Analysis = require('../models/Analysis');

// @desc    Get course recommendations based on missing skills
// @route   POST /api/courses/recommendations
// @access  Private
exports.getCourseRecommendations = async (req, res) => {
  try {
    const { analysisId, skills } = req.body;

    let missingSkills = [];

    // Get missing skills from analysis or from request body
    if (analysisId) {
      const analysis = await Analysis.findOne({
        _id: analysisId,
        userId: req.user.id
      });

      if (!analysis) {
        return res.status(404).json({
          status: 'error',
          message: 'Analysis not found'
        });
      }

      missingSkills = analysis.missingSkills;
    } else if (skills && Array.isArray(skills)) {
      missingSkills = skills;
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide analysisId or skills array'
      });
    }

    // Find courses that match the missing skills
    const courses = await Course.find({
      relatedSkills: { $in: missingSkills.map(s => new RegExp(s, 'i')) },
      isActive: true
    }).sort({ rating: -1, reviewCount: -1 }).limit(20);

    // Group courses by skill
    const recommendationsBySkill = {};
    missingSkills.forEach(skill => {
      const matchingCourses = courses.filter(course =>
        course.relatedSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
      if (matchingCourses.length > 0) {
        recommendationsBySkill[skill] = matchingCourses.slice(0, 3);
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        missingSkills,
        totalCourses: courses.length,
        recommendationsBySkill,
        allCourses: courses
      }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching course recommendations'
    });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const { difficulty, platform, skill, free } = req.query;
    
    let filter = { isActive: true };
    
    if (difficulty) filter.difficulty = difficulty;
    if (platform) filter.platform = platform;
    if (skill) filter.relatedSkills = { $regex: skill, $options: 'i' };
    if (free === 'true') filter['price.isFree'] = true;

    const courses = await Course.find(filter)
      .sort({ rating: -1, reviewCount: -1 });

    res.status(200).json({
      status: 'success',
      data: {
        count: courses.length,
        courses
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching courses'
    });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { course }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching course'
    });
  }
};

// @desc    Search courses
// @route   GET /api/courses/search?q=javascript
// @access  Public
exports.searchCourses = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Search query is required'
      });
    }

    const courses = await Course.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { relatedSkills: { $regex: q, $options: 'i' } }
      ],
      isActive: true
    }).limit(20);

    res.status(200).json({
      status: 'success',
      data: {
        count: courses.length,
        courses
      }
    });
  } catch (error) {
    console.error('Search courses error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error searching courses'
    });
  }
};
