import React from 'react';
import BaseTemplate from './BaseTemplate';

const BusinessAnalystTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="'Open Sans', sans-serif" className="business-analyst-template">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-blue-600">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-blue-600 font-semibold mb-3">
          {experience?.[0]?.position || 'Business Analyst'}
        </p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>|</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>|</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
        {personalInfo?.linkedin && (
          <div className="text-sm text-blue-600 mt-2">{personalInfo.linkedin.replace('https://', '')}</div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2 pb-1 border-b border-gray-300">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {skills && (skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-300">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[...(skills.technical || []), ...(skills.soft || [])].map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-blue-500">▪</span>
                <span className="text-sm text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-300">
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 className="font-bold text-base">{exp.company}</h3>
                  <p className="text-gray-700 italic">{exp.position}</p>
                </div>
                <span className="text-sm text-gray-600 font-semibold">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1.5">
                  {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-300">
            KEY PROJECTS
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-sm">{project.name}</h3>
              {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
              {project.highlights && project.highlights.length > 0 && project.highlights[0] && (
                <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                  {project.highlights.map((h, i) => h && <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Positions of Responsibility */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-300">
            LEADERSHIP & RESPONSIBILITIES
          </h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 className="font-bold text-base">{position.title}</h3>
                  <p className="text-gray-700 italic">{position.organization}</p>
                </div>
                <span className="text-sm text-gray-600 font-semibold">
                  {position.startDate && new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {position.current ? 'Present' : position.endDate ? new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1.5">
                  {position.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {education && education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-300">
              EDUCATION
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-sm">{edu.degree}</h3>
                {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                <p className="text-sm text-gray-700">{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && certifications[0].name && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-1 border-b border-gray-300">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-semibold text-sm">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Technical Skills */}
      {skills?.tools && skills.tools.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2 pb-1 border-b border-gray-300">
            TECHNICAL SKILLS
          </h2>
          <p className="text-sm text-gray-700">{skills.tools.join(' • ')}</p>
        </div>
      )}
    </BaseTemplate>
  );
};

export default BusinessAnalystTemplate;
