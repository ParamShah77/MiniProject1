const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with correct model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // ✅ Use available model

/**
 * Optimize professional summary - AGGRESSIVE MODE
 */
const optimizeSummary = async (summary, targetRole) => {
  const prompt = `You are an expert ATS-optimized resume writer. Make this professional summary MORE IMPRESSIVE and ATS-optimized.

Current Summary: "${summary}"
Target Role: ${targetRole || 'General'}

IMPORTANT CHANGES to make:
- Add specific metrics and numbers where possible
- Use powerful action verbs (Spearheaded, Orchestrated, Engineered, etc.)
- Make it 50-100% longer and more detailed
- Include technical keywords related to the role
- Make it compelling and achievement-focused
- Highlight leadership and impact

Return ONLY the completely rewritten and MUCH MORE DETAILED summary. No explanations or markdown.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const optimized = response.text().trim();
    console.log('✅ Summary optimized');
    return optimized;
  } catch (error) {
    console.error('❌ Error optimizing summary:', error.message);
    return summary; // Fallback to original
  }
};

/**
 * Optimize work experience bullet points - AGGRESSIVE MODE
 */
const optimizeExperience = async (experience, targetRole) => {
  const descriptions = experience.description || [];
  
  if (descriptions.length === 0) return descriptions;
  
  const prompt = `You are an ATS expert resume writer. COMPLETELY REWRITE these bullet points to be MUCH MORE IMPRESSIVE.

Position: ${experience.position}
Company: ${experience.company}
Target Role: ${targetRole || 'Similar positions'}

Current Bullet Points:
${descriptions.map((d, i) => `${i + 1}. ${d}`).join('\n')}

IMPORTANT - Make MAJOR improvements:
- Start each with POWERFUL action verbs (Spearheaded, Orchestrated, Engineered, Implemented, Architected, etc.)
- Add SPECIFIC metrics and percentages (e.g., "reduced by 40%", "improved by 3x", "managed $5M budget")
- Use STAR method: Situation, Task, Action, Result
- Make each bullet 2-3 lines longer with more detail
- Include technical keywords and technologies
- Focus on IMPACT and BUSINESS VALUE
- Make them achievement-focused, not task-focused
- Quantify everything possible

Return ONLY a JSON array of the completely rewritten bullet points. Each should be 2-3 sentences with metrics.
Example format: ["Spearheaded development of X, resulting in 40% improvement in Y", "Orchestrated team of 10 engineers to deliver Z, reducing costs by $500K"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    // Extract JSON array
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('✅ Experience optimized:', parsed.length, 'bullets');
      return parsed;
    }
    
    console.warn('⚠️ Could not parse experience JSON, returning original');
    return descriptions;
  } catch (error) {
    console.error('❌ Error optimizing experience:', error.message);
    return descriptions;
  }
};

/**
 * Optimize project description - AGGRESSIVE MODE
 */
const optimizeProject = async (project) => {
  if (!project.description) return project.description;

  const prompt = `You are an expert resume writer. COMPLETELY REWRITE this project description to be MORE IMPRESSIVE.

Project: ${project.name}
Current Description: "${project.description}"
Technologies: ${project.technologies?.join(', ') || 'Not specified'}

MAKE MAJOR IMPROVEMENTS:
- Make it 2-3x longer and more detailed
- Add specific metrics and impact (users, performance improvement, scalability, etc.)
- Use powerful action verbs (Engineered, Architected, Implemented, etc.)
- Highlight technical complexity and business value
- Include scale and impact numbers
- Make it achievement-focused
- Mention architecture, design patterns, or best practices used

Return ONLY the completely rewritten description. 3-4 sentences minimum with metrics. No explanations or markdown.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const optimized = response.text().trim();
    console.log('✅ Project optimized');
    return optimized;
  } catch (error) {
    console.error('❌ Error optimizing project:', error.message);
    return project.description;
  }
};

/**
 * Suggest additional trending skills
 */
const suggestSkills = async (currentSkills, targetRole, experience) => {
  const allSkills = [
    ...(currentSkills.technical || []),
    ...(currentSkills.tools || []),
    ...(currentSkills.soft || [])
  ];

  if (allSkills.length === 0) return [];

  const prompt = `You are a technical recruiter. Suggest 8-12 HIGH-DEMAND skills that would boost this resume's ATS score.

Current Skills (${allSkills.length} total): ${allSkills.join(', ')}
Target Role: ${targetRole || 'Software Engineer'}
Experience Level: ${experience?.length || 0} positions

Add TRENDING and HIGH-DEMAND skills that:
- Are relevant to the target role
- Are NOT already in the list
- Will significantly boost ATS score
- Are actively being searched for by companies in 2024-2025
- Include modern frameworks, cloud platforms, DevOps tools, AI/ML technologies

Return ONLY a JSON array of skill names (no descriptions, no markdown).
Example: ["React.js", "Docker", "Kubernetes", "AWS", "CI/CD", "GraphQL", "TypeScript", "MongoDB", "Redis", "Microservices"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Remove markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('✅ Skills suggested:', parsed.length);
      return parsed;
    }
    
    return [];
  } catch (error) {
    console.error('❌ Error suggesting skills:', error.message);
    return [];
  }
};

/**
 * Full resume optimization - AGGRESSIVE MODE
 */
const optimizeFullResume = async (resumeData, targetRole) => {
  try {
    console.log('🤖 Starting AGGRESSIVE AI optimization...');
    const optimized = { ...resumeData };

    // 1. Optimize Summary - ALWAYS optimize
    if (resumeData.personalInfo?.summary) {
      console.log('📝 Optimizing summary...');
      optimized.personalInfo = {
        ...resumeData.personalInfo,
        summary: await optimizeSummary(resumeData.personalInfo.summary, targetRole)
      };
      await new Promise(r => setTimeout(r, 1000)); // Rate limit protection
    }

    // 2. Optimize Experience - AGGRESSIVE optimization
    if (resumeData.experience && resumeData.experience.length > 0) {
      console.log('💼 Optimizing experience...');
      optimized.experience = [];
      
      for (const exp of resumeData.experience) {
        if (exp.description && exp.description.length > 0) {
          const optimizedDesc = await optimizeExperience(exp, targetRole);
          optimized.experience.push({
            ...exp,
            description: optimizedDesc
          });
          await new Promise(r => setTimeout(r, 1000)); // Rate limit protection
        } else {
          optimized.experience.push(exp);
        }
      }
    }

    // 3. Optimize Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      console.log('🚀 Optimizing projects...');
      optimized.projects = [];
      
      for (const project of resumeData.projects) {
        if (project.description) {
          const optimizedDesc = await optimizeProject(project);
          optimized.projects.push({
            ...project,
            description: optimizedDesc
          });
          await new Promise(r => setTimeout(r, 1000)); // Rate limit protection
        } else {
          optimized.projects.push(project);
        }
      }
    }

    // 4. Suggest Additional Skills
    if (resumeData.skills) {
      console.log('🎯 Suggesting skills...');
      const suggestedSkills = await suggestSkills(
        resumeData.skills,
        targetRole,
        resumeData.experience
      );
      optimized.suggestedSkills = suggestedSkills;
    }

    console.log('✅ AI optimization COMPLETE!');

    return {
      success: true,
      optimizedData: optimized, // ✅ Match controller expectation
      atsScore: 92, // Mock score (you can calculate this later)
      suggestions: [
        'Summary enhanced with powerful action verbs and metrics',
        'Experience bullets rewritten with STAR method and quantifiable results',
        'Project descriptions expanded with technical details and impact',
        'Trending skills suggested based on current industry demands'
      ],
      keywords: suggestedSkills || []
    };
  } catch (error) {
    console.error('❌ Full optimization error:', error.message);
    throw error;
  }
};

module.exports = {
  optimizeSummary,
  optimizeExperience,
  optimizeProject,
  suggestSkills,
  optimizeFullResume
};
