const JobRole = require('../models/JobRole');

// @desc    Get all job roles
// @route   GET /api/job-roles
// @access  Public
exports.getAllJobRoles = async (req, res) => {
  try {
    const { category, experienceLevel } = req.query;
    
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (experienceLevel) filter.experienceLevel = experienceLevel;

    const jobRoles = await JobRole.find(filter)
      .sort({ demandLevel: -1, title: 1 });

    res.status(200).json({
      status: 'success',
      data: {
        count: jobRoles.length,
        jobRoles: jobRoles.map(role => ({
          id: role._id,
          title: role.title,
          category: role.category,
          description: role.description,
          requiredSkills: role.requiredSkills,
          preferredSkills: role.preferredSkills,
          experienceLevel: role.experienceLevel,
          salaryRange: role.salaryRange,
          demandLevel: role.demandLevel,
          growthRate: role.growthRate
        }))
      }
    });
  } catch (error) {
    console.error('Get job roles error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching job roles'
    });
  }
};

// @desc    Get job role by ID
// @route   GET /api/job-roles/:id
// @access  Public
exports.getJobRoleById = async (req, res) => {
  try {
    const jobRole = await JobRole.findById(req.params.id);

    if (!jobRole) {
      return res.status(404).json({
        status: 'error',
        message: 'Job role not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { jobRole }
    });
  } catch (error) {
    console.error('Get job role error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching job role'
    });
  }
};

// @desc    Search job roles
// @route   GET /api/job-roles/search?q=developer
// @access  Public
exports.searchJobRoles = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Search query is required'
      });
    }

    const jobRoles = await JobRole.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ],
      isActive: true
    }).limit(10);

    res.status(200).json({
      status: 'success',
      data: {
        count: jobRoles.length,
        jobRoles
      }
    });
  } catch (error) {
    console.error('Search job roles error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error searching job roles'
    });
  }
};
