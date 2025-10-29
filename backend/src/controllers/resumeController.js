const Resume = require('../models/Resume');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs'); // For createReadStream
const axios = require('axios');
const FormData = require('form-data');

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private
exports.uploadResume = async (req, res) => {
  try {
    console.log('📤 Upload request received');
    console.log('User:', req.user?.id);
    console.log('File:', req.file);

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Please upload a file'
      });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    
    // Determine file type
    const fileType = mimetype === 'application/pdf' ? 'pdf' : 'docx';
    
    // Generate unique filename
    const fileName = `${req.user.id}_${Date.now()}${path.extname(originalname)}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    
    // Save file locally
    const filePath = path.join(uploadsDir, fileName);
    await fs.writeFile(filePath, buffer);
    
    console.log('✅ File saved:', fileName);

    // Create resume record in database
    const resume = await Resume.create({
      userId: req.user.id,
      fileName: fileName,
      originalName: originalname,
      fileUrl: `/uploads/${fileName}`,
      fileSize: size,
      fileType: fileType,
      parseStatus: 'processing'
    });

    console.log('✅ Resume saved to database:', resume._id);

    // Call ML service to parse resume
    try {
      const formData = new FormData();
      formData.append('file', fsSync.createReadStream(filePath));

      const mlResponse = await axios.post(
        'http://localhost:8000/parse-resume',
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000
        }
      );

      if (mlResponse.data.success) {
        // Update resume with parsed data
        resume.parsedData = mlResponse.data.data;
        resume.parseStatus = 'completed';
        await resume.save();
        
        console.log('✅ Resume parsed successfully');
      }
    } catch (mlError) {
      console.error('❌ ML parsing error:', mlError.message);
      resume.parseStatus = 'failed';
      resume.parseError = mlError.message;
      await resume.save();
    }

    res.status(201).json({
      status: 'success',
      message: 'Resume uploaded successfully',
      data: {
        resume: {
          id: resume._id,
          fileName: resume.originalName,
          fileSize: resume.fileSize,
          fileType: resume.fileType,
          uploadedAt: resume.uploadedAt,
          parseStatus: resume.parseStatus,
          skills: resume.parsedData?.skills || []
        }
      }
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error uploading resume',
      error: error.message
    });
  }
};

// @desc    Get all user's resumes
// @route   GET /api/resume
// @access  Private
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ uploadedAt: -1 })
      .select('-parsedData');

    res.status(200).json({
      status: 'success',
      data: {
        count: resumes.length,
        resumes: resumes.map(resume => ({
          id: resume._id,
          fileName: resume.originalName,
          fileSize: resume.fileSize,
          fileType: resume.fileType,
          parseStatus: resume.parseStatus,
          uploadedAt: resume.uploadedAt
        }))
      }
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching resumes'
    });
  }
};

// @desc    Get resume by ID
// @route   GET /api/resume/:id
// @access  Private
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { resume }
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching resume'
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
// @access  Private
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume not found'
      });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '../../uploads', resume.fileName);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    await Resume.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting resume'
    });
  }
};