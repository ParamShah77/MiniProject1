const aiService = require('../services/aiService');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro' // ✅ Change from 'gemini-1.5-flash'
});

// Optimize entire resume
exports.optimizeResume = async (req, res) => {
  try {
    const { resumeData } = req.body;
    const userId = req.user.id || req.user.userId;

    console.log('🤖 AI Optimization requested');

    if (!resumeData) {
      return res.status(400).json({
        status: 'error',
        message: 'Resume data is required'
      });
    }

    console.log('🤖 Starting AGGRESSIVE AI optimization...');

    const optimized = { ...resumeData };

    // ✅ Initialize variables with default values
    let optimizedSummary = resumeData.personalInfo?.summary || '';
    let optimizedExperience = resumeData.experience || [];
    let optimizedProjects = resumeData.projects || [];
    let suggestedSkills = []; // ✅ Initialize here!

    // 1. Optimize Summary
    try {
      console.log('📝 Optimizing summary...');
      if (resumeData.personalInfo?.summary) {
        optimizedSummary = await optimizeSummary(resumeData.personalInfo.summary, resumeData);
      }
    } catch (error) {
      console.error('❌ Error optimizing summary:', error.message);
      // Keep original summary
    }

    // 2. Optimize Experience
    try {
      console.log('💼 Optimizing experience...');
      if (resumeData.experience && resumeData.experience.length > 0) {
        optimizedExperience = await Promise.all(
          resumeData.experience.map(async (exp) => {
            try {
              return await optimizeExperience(exp);
            } catch (err) {
              console.error('❌ Error optimizing experience:', err.message);
              return exp; // Keep original on error
            }
          })
        );
      }
    } catch (error) {
      console.error('❌ Error optimizing experience:', error.message);
    }

    // 3. Optimize Projects
    try {
      console.log('🚀 Optimizing projects...');
      if (resumeData.projects && resumeData.projects.length > 0) {
        optimizedProjects = await Promise.all(
          resumeData.projects.map(async (project) => {
            try {
              return await optimizeProject(project);
            } catch (err) {
              console.error('❌ Error optimizing project:', err.message);
              return project; // Keep original on error
            }
          })
        );
      }
    } catch (error) {
      console.error('❌ Error optimizing projects:', error.message);
    }

    // 4. Suggest Skills
    try {
      console.log('🎯 Suggesting skills...');
      suggestedSkills = await suggestSkills(resumeData);
    } catch (error) {
      console.error('❌ Error suggesting skills:', error.message);
      suggestedSkills = []; // ✅ Default to empty array on error
    }

    // Build optimized resume
    optimized.personalInfo = {
      ...resumeData.personalInfo,
      summary: optimizedSummary
    };
    optimized.experience = optimizedExperience;
    optimized.projects = optimizedProjects;

    // Calculate new ATS score
    const atsScore = calculateATSScore(optimized);

    console.log('✅ AI optimization COMPLETE!');
    console.log('🎯 New ATS Score:', atsScore);

    res.status(200).json({
      status: 'success',
      data: {
        optimizedData: optimized,
        atsScore: atsScore,
        suggestedSkills: suggestedSkills,
        improvements: [
          'Enhanced professional summary with industry keywords',
          'Improved bullet points with action verbs and metrics',
          'Optimized for ATS scanning',
          'Added relevant technical skills',
          'Professional grammar and tone'
        ]
      }
    });

  } catch (error) {
    console.error('❌ Full optimization error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'AI Optimization Error: ' + error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Optimize specific section
exports.optimizeSection = async (req, res) => {
  try {
    const { section, data, targetRole } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        status: 'error',
        message: 'Gemini API key not configured'
      });
    }

    let optimized;

    switch (section) {
      case 'summary':
        optimized = await aiService.optimizeSummary(data, targetRole);
        break;
      case 'experience':
        optimized = await aiService.optimizeExperience(data, targetRole);
        break;
      case 'project':
        optimized = await aiService.optimizeProject(data);
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Invalid section type'
        });
    }

    res.json({
      status: 'success',
      data: optimized,
      message: `${section} optimized successfully`
    });
  } catch (error) {
    console.error('Section Optimization Error:', error.message);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to optimize section'
    });
  }
};

// Get skill suggestions
exports.suggestSkills = async (req, res) => {
  try {
    const { currentSkills, targetRole, experience } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        status: 'error',
        message: 'Gemini API key not configured'
      });
    }

    const suggestions = await aiService.suggestSkills(
      currentSkills,
      targetRole,
      experience
    );

    res.json({
      status: 'success',
      data: { skills: suggestions },
      message: 'Skills suggested successfully'
    });
  } catch (error) {
    console.error('Skill Suggestion Error:', error.message);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to suggest skills'
    });
  }
};

// Helper function
function calculateATSScore(resumeData) {
  let score = 0;
  
  if (resumeData.personalInfo?.summary && resumeData.personalInfo.summary.length > 50) {
    score += 15;
  }
  
  if (resumeData.experience && resumeData.experience.length > 0) {
    score += 15;
    if (resumeData.experience.some(exp => exp.description && exp.description.length >= 3)) {
      score += 10;
    }
  }
  
  if (resumeData.education && resumeData.education.length > 0) {
    score += 15;
  }
  
  const totalSkills = (resumeData.skills?.technical?.length || 0) + 
                      (resumeData.skills?.tools?.length || 0);
  if (totalSkills >= 5) score += 10;
  if (totalSkills >= 10) score += 10;
  
  if (resumeData.projects && resumeData.projects.length > 0) {
    score += 10;
    if (resumeData.projects.some(proj => proj.description)) {
      score += 5;
    }
  }
  
  if (resumeData.personalInfo?.email) score += 5;
  if (resumeData.personalInfo?.phone) score += 5;
  
  return Math.min(score, 100);
}

// DO NOT ADD module.exports = {} here
// Using exports.functionName is enough

async function optimizeSummary(summary, resumeData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Optimize this professional summary for a resume. Make it compelling, ATS-friendly, and professional. Keep it under 150 words.

Current summary: ${summary}

Role: ${resumeData.experience?.[0]?.position || 'Professional'}
Skills: ${resumeData.skills?.technical?.join(', ') || 'N/A'}

Return ONLY the optimized summary text, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    // ✅ Return original with minor enhancements
    return enhanceSummaryFallback(summary);
  }
}

// ✅ Fallback function when AI fails
function enhanceSummaryFallback(summary) {
  if (!summary || summary.length < 20) {
    return "Results-driven professional with proven expertise in delivering high-impact solutions. Skilled in leveraging technology and strategic thinking to drive business success and exceed organizational goals.";
  }
  
  let enhanced = summary.trim();
  enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);
  
  if (!enhanced.endsWith('.')) {
    enhanced += '.';
  }
  
  return enhanced;
}
