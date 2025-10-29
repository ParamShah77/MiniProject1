const Resume = require('../models/Resume');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Create/Update built resume
// @route   POST /api/builder/save
// @access  Private
exports.saveBuiltResume = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume data is required'
      });
    }

    // Check if user already has a built resume
    let resume = await Resume.findOne({
      userId: req.user.id,
      isBuiltResume: true
    });

    if (resume) {
      // Update existing resume
      resume.builtResumeData = resumeData;
      resume.updatedAt = Date.now();
      await resume.save();
    } else {
      // Create new built resume
      resume = await Resume.create({
        userId: req.user.id,
        fileName: 'built_resume.pdf',
        originalName: `${req.user.name}_Resume.pdf`,
        fileUrl: '/built-resumes/' + req.user.id,
        fileSize: 0,
        fileType: 'pdf',
        isBuiltResume: true,
        builtResumeData: resumeData,
        parseStatus: 'completed'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Resume saved successfully',
      data: { resume }
    });
  } catch (error) {
    console.error('Save built resume error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error saving resume'
    });
  }
};

// @desc    Get built resume
// @route   GET /api/builder/resume
// @access  Private
exports.getBuiltResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      userId: req.user.id,
      isBuiltResume: true
    });

    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'No built resume found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { resume }
    });
  } catch (error) {
    console.error('Get built resume error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching resume'
    });
  }
};

// @desc    Export resume as PDF
// @route   GET /api/builder/export
// @access  Private
exports.exportResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      userId: req.user.id,
      isBuiltResume: true
    });

    if (!resume || !resume.builtResumeData) {
      return res.status(404).json({
        status: 'error',
        message: 'No resume data found'
      });
    }

    const data = resume.builtResumeData;

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${data.personalInfo?.fullName || 'resume'}_resume.pdf`);
    
    // Pipe PDF to response
    doc.pipe(res);

    // Build PDF content
    generatePDF(doc, data);

    doc.end();
  } catch (error) {
    console.error('Export PDF error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error exporting resume'
    });
  }
};

// Helper function to generate PDF
function generatePDF(doc, data) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  // Header - Personal Info
  doc.fontSize(24).font('Helvetica-Bold').text(personalInfo?.fullName || 'Your Name', { align: 'center' });
  doc.moveDown(0.3);
  
  doc.fontSize(10).font('Helvetica');
  const contactInfo = [
    personalInfo?.email,
    personalInfo?.phone,
    personalInfo?.location,
    personalInfo?.linkedin,
    personalInfo?.github
  ].filter(Boolean).join(' | ');
  
  doc.text(contactInfo, { align: 'center' });
  doc.moveDown(1);

  // Summary
  if (personalInfo?.summary) {
    doc.fontSize(11).font('Helvetica-Oblique').text(personalInfo.summary);
    doc.moveDown(1);
  }

  // Experience
  if (experience && experience.length > 0) {
    addSection(doc, 'PROFESSIONAL EXPERIENCE');
    experience.forEach((exp, index) => {
      doc.fontSize(12).font('Helvetica-Bold').text(exp.position);
      doc.fontSize(10).font('Helvetica').text(`${exp.company} | ${exp.location || ''}`);
      doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
      doc.moveDown(0.3);
      
      if (exp.description && exp.description.length > 0) {
        exp.description.forEach(point => {
          doc.fontSize(10).text(`• ${point}`, { indent: 20 });
        });
      }
      
      if (exp.technologies && exp.technologies.length > 0) {
        doc.fontSize(9).font('Helvetica-Oblique').text(`Technologies: ${exp.technologies.join(', ')}`, { indent: 20 });
      }
      
      if (index < experience.length - 1) doc.moveDown(0.8);
    });
    doc.moveDown(1);
  }

  // Education
  if (education && education.length > 0) {
    addSection(doc, 'EDUCATION');
    education.forEach((edu, index) => {
      doc.fontSize(12).font('Helvetica-Bold').text(edu.degree);
      doc.fontSize(10).font('Helvetica').text(`${edu.institution} | ${edu.location || ''}`);
      doc.text(`${edu.field} | ${edu.startDate} - ${edu.endDate}`);
      if (edu.gpa) doc.text(`GPA: ${edu.gpa}`);
      if (index < education.length - 1) doc.moveDown(0.5);
    });
    doc.moveDown(1);
  }

  // Skills
  if (skills) {
    addSection(doc, 'SKILLS');
    if (skills.technical && skills.technical.length > 0) {
      doc.fontSize(10).font('Helvetica-Bold').text('Technical: ');
      doc.font('Helvetica').text(skills.technical.join(', '));
    }
    if (skills.tools && skills.tools.length > 0) {
      doc.fontSize(10).font('Helvetica-Bold').text('Tools: ');
      doc.font('Helvetica').text(skills.tools.join(', '));
    }
    if (skills.languages && skills.languages.length > 0) {
      doc.fontSize(10).font('Helvetica-Bold').text('Languages: ');
      doc.font('Helvetica').text(skills.languages.join(', '));
    }
    doc.moveDown(1);
  }

  // Projects
  if (projects && projects.length > 0) {
    addSection(doc, 'PROJECTS');
    projects.forEach((project, index) => {
      doc.fontSize(11).font('Helvetica-Bold').text(project.name);
      doc.fontSize(10).font('Helvetica').text(project.description);
      if (project.technologies && project.technologies.length > 0) {
        doc.text(`Tech Stack: ${project.technologies.join(', ')}`);
      }
      if (project.github) doc.text(`GitHub: ${project.github}`);
      if (index < projects.length - 1) doc.moveDown(0.5);
    });
    doc.moveDown(1);
  }

  // Certifications
  if (certifications && certifications.length > 0) {
    addSection(doc, 'CERTIFICATIONS');
    certifications.forEach((cert) => {
      doc.fontSize(10).font('Helvetica-Bold').text(cert.name);
      doc.font('Helvetica').text(`${cert.issuer} | ${cert.date}`);
      doc.moveDown(0.3);
    });
  }
}

function addSection(doc, title) {
  doc.fontSize(14).font('Helvetica-Bold').text(title);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);
}

module.exports = exports;
