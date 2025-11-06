import React from 'react';
import BaseTemplate from './BaseTemplate';

const DeveloperTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Montserrat, sans-serif" className="developer-template">
      {/* Header with GitHub Emphasis */}
      <div className="mb-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 -m-8 mb-6 rounded-b-lg">
        <h1 className="text-3xl font-bold mb-2">{personalInfo?.fullName || 'Your Name'}</h1>
        <p className="text-xl text-gray-300 mb-4">{experience?.[0]?.position || 'Software Developer'}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo?.github && (
            <span className="font-semibold">
              🐙 GitHub: {personalInfo.github.replace('https://github.com/', '')}
            </span>
          )}
          {personalInfo?.linkedin && <span>🔗 LinkedIn: {personalInfo.linkedin.replace('https://linkedin.com/in/', '')}</span>}
        </div>
      </div>

      {/* Tech Stack Showcase */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div className="mb-6 bg-gray-100 p-5 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>⚡</span> Tech Stack
          </h2>
          <div className="space-y-3">
            {skills.technical && skills.technical.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Languages & Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-800 text-white rounded font-semibold text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Tools & DevOps</p>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool, i) => (
                    <span key={i} className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded font-semibold text-xs">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">About Me</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Projects with GitHub Links */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 border-l-4 border-gray-800 pl-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base">{project.name}</h3>
                <div className="flex gap-2">
                  {project.github && (
                    <span className="text-xs px-2 py-1 bg-gray-800 text-white rounded">📂 Repo</span>
                  )}
                  {project.demo && (
                    <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded">🚀 Live</span>
                  )}
                </div>
              </div>
              {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Positions of Responsibility */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Leadership & Community</h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-4 border-l-4 border-gray-800 pl-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base">{position.title}</h3>
                <span className="text-xs text-gray-500">
                  {position.startDate && new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {position.current ? 'Present' : position.endDate ? new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{position.organization}</p>
              {position.description && position.description.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {position.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].institution && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}
    </BaseTemplate>
  );
};

export default DeveloperTemplate;
