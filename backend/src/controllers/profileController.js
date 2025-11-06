const User = require('../models/User');
const Resume = require('../models/Resume');
const bcrypt = require('bcryptjs');

// ====================================
// 👤 USER PROFILE
// ====================================

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    console.log('👤 Fetching profile for user:', userId);

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Get resume count
    const resumeCount = await Resume.countDocuments({ userId });

    const profileData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      targetRoles: user.targetRoles || [],
      coursesCompleted: user.coursesCompleted || 0,
      createdAt: user.createdAt,
      resumeCount: resumeCount
    };

    console.log('✅ Profile retrieved:', user.name);

    res.json({
      status: 'success',
      data: profileData
    });
  } catch (error) {
    console.error('❌ Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch profile: ' + error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    const { name, email, phone, location, bio, targetRoles } = req.body;

    console.log('✏️ Updating profile for user:', userId);

    // Validate email if changed
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });

      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already in use'
        });
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(location !== undefined && { location }),
        ...(bio !== undefined && { bio }),
        ...(targetRoles && { targetRoles })
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    console.log('✅ Profile updated:', user.name);

    res.json({
      status: 'success',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        targetRoles: user.targetRoles
      },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile: ' + error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/profile/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    console.log('🔐 Password change request for user:', userId);

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must be at least 6 characters'
      });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'New passwords do not match'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    // Check if new password is same as old
    const isSameAsOld = await bcrypt.compare(newPassword, user.password);
    
    if (isSameAsOld) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must be different from current password'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    console.log('✅ Password changed successfully for:', user.email);

    res.json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('❌ Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to change password: ' + error.message
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/profile
// @access  Private
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    const { password } = req.body;

    console.log('🗑️ Account deletion request for user:', userId);

    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Password is required to delete account'
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Password is incorrect'
      });
    }

    // Delete all user's resumes
    const deletedResumes = await Resume.deleteMany({ userId });
    console.log('🗑️ Deleted', deletedResumes.deletedCount, 'resumes');

    // Delete user account
    await User.findByIdAndDelete(userId);

    console.log('✅ Account deleted successfully:', user.email);

    res.json({
      status: 'success',
      message: 'Account and all associated data deleted successfully',
      data: {
        resumesDeleted: deletedResumes.deletedCount
      }
    });
  } catch (error) {
    console.error('❌ Delete account error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete account: ' + error.message
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/profile/stats
// @access  Private
exports.getProfileStats = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    console.log('📊 Fetching profile stats for user:', userId);

    const user = await User.findById(userId);
    const allResumes = await Resume.find({ userId });

    const uploadedResumes = allResumes.filter(r => !r.isBuiltResume);
    const builtResumes = allResumes.filter(r => r.isBuiltResume);

    // Calculate average ATS score
    const scores = uploadedResumes
      .map(r => r.atsScore || r.parsedData?.final_ats_score || 0)
      .filter(score => score > 0);

    const averageScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    const stats = {
      totalResumes: allResumes.length,
      uploadedResumes: uploadedResumes.length,
      builtResumes: builtResumes.length,
      averageATSScore: averageScore,
      targetRoles: user.targetRoles?.length || 0,
      coursesCompleted: user.coursesCompleted || 0,
      accountAge: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)) // days
    };

    res.json({
      status: 'success',
      data: stats
    });
  } catch (error) {
    console.error('❌ Get profile stats error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// ====================================
// 📤 EXPORTS
// ====================================

module.exports = {
  getProfile: exports.getProfile,
  updateProfile: exports.updateProfile,
  changePassword: exports.changePassword,
  deleteAccount: exports.deleteAccount,
  getProfileStats: exports.getProfileStats
};