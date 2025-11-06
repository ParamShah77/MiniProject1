import React from 'react';
import BaseTemplate from './BaseTemplate';

const DataScienceTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Lato, sans-serif" className="data-science-template">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-cyan-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-cyan-600 font-medium mb-3">
          Data Scientist | Machine Learning Engineer
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {personalInfo?.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo?.github && <span>🐙 {personalInfo.github.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-6 bg-cyan-50 p-4 rounded border-l-4 border-cyan-500">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-700 mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Technical Skills - Prominent */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div className="mb-6 bg-gray-50 p-5 rounded-lg">
          <h2 className="text-xl font-bold text-cyan-700 mb-4">Technical Proficiency</h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.technical && skills.technical.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-2">Languages & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-2">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-cyan-700 mb-3">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-5 pl-5 border-l-2 border-cyan-300">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-800">{exp.position}</h3>
                  <p className="text-cyan-600 font-medium">{exp.company} {exp.location && `| ${exp.location}`}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1.5">
                  {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects with Metrics */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-cyan-700 mb-3">Key Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-base text-gray-800 mb-1">{project.name}</h3>
              {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-cyan-100 text-cyan-700 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.highlights && project.highlights.length > 0 && project.highlights[0] && (
                <ul className="list-disc ml-5 text-xs text-gray-600 space-y-0.5">
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
          <h2 className="text-xl font-bold text-cyan-700 mb-3">Leadership & Responsibilities</h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-5 pl-5 border-l-2 border-cyan-300">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-800">{position.title}</h3>
                  <p className="text-cyan-600 font-medium">{position.organization}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {position.startDate && new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {position.current ? 'Present' : position.endDate ? new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1.5">
                  {position.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education & Certifications Side by Side */}
      <div className="grid grid-cols-2 gap-6">
        {education && education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-xl font-bold text-cyan-700 mb-3">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-sm">{edu.degree}</h3>
                {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                <p className="text-sm text-gray-700">{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && certifications[0].name && (
          <div>
            <h2 className="text-xl font-bold text-cyan-700 mb-3">Certifications</h2>
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
    </BaseTemplate>
  );
};

export default DataScienceTemplate;
