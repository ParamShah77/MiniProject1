import React from 'react';
import BaseTemplate from './BaseTemplate';

const SeniorProfessionalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Arial, sans-serif" className="senior-professional-template">
      {/* Executive Header */}
      <div className="text-center mb-6 pb-5 border-b-3 border-blue-800">
        <h1 className="text-4xl font-bold text-blue-900 mb-2 tracking-tight">
          {personalInfo?.fullName || 'EXECUTIVE NAME'}
        </h1>
        <p className="text-xl text-gray-700 font-semibold mb-3">
          {experience?.[0]?.position || 'Senior Executive | Strategic Leader'}
        </p>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>•</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>•</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo?.summary && (
        <div className="mb-6 bg-blue-50 p-5 border-l-4 border-blue-800">
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide">
            Executive Summary
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed font-medium">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {skills && (skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2">
            {[...(skills.technical || []), ...(skills.soft || [])].slice(0, 12).map((skill, i) => (
              <div key={i} className="flex items-center">
                <span className="text-blue-700 mr-2 font-bold">▸</span>
                <span className="text-sm font-medium text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900 uppercase">{exp.position}</h3>
                  <p className="text-blue-700 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600 font-bold">
                  {exp.startDate && new Date(exp.startDate).getFullYear()}
                  {' – '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-none text-sm text-gray-700 space-y-1.5">
                  {exp.description.map((desc, i) => desc && (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">▸</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Leadership Positions */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Leadership & Board Positions
          </h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900 uppercase">{position.title}</h3>
                  <p className="text-blue-700 font-semibold">{position.organization}</p>
                </div>
                <span className="text-sm text-gray-600 font-bold">
                  {position.startDate && new Date(position.startDate).getFullYear()}
                  {' – '}
                  {position.current ? 'Present' : position.endDate ? new Date(position.endDate).getFullYear() : 'Present'}
                </span>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="list-none text-sm text-gray-700 space-y-1.5">
                  {position.description.map((desc, i) => desc && (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-700 mr-2 mt-1">▸</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {education && education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold text-sm">{edu.degree}</h3>
                {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                <p className="text-sm font-semibold text-gray-800">{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && certifications[0].name && (
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Professional Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-bold text-sm">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Board Memberships / Awards (Optional) */}
      {projects && projects.length > 0 && projects[0].name && (
        <div>
          <h2 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Key Achievements
          </h2>
          <ul className="list-none space-y-2">
            {projects.map((project, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-700 mr-2 mt-1">▸</span>
                <div>
                  <span className="font-semibold">{project.name}:</span>
                  <span className="text-sm text-gray-700 ml-1">{project.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </BaseTemplate>
  );
};

export default SeniorProfessionalTemplate;
