import React from 'react';
import BaseTemplate from './BaseTemplate';

const ProjectBasedTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Nunito, sans-serif" className="project-based-template">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-3">
          {experience?.[0]?.position || 'Your Professional Title'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo?.github && <span>💻 {personalInfo.github.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-6 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Featured Projects (Large Cards) */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Featured Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="border-2 border-purple-200 rounded-lg p-5 bg-gradient-to-br from-white to-purple-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                  {(project.github || project.demo) && (
                    <div className="flex gap-2 text-xs">
                      {project.github && (
                        <a href={project.github} className="px-3 py-1 bg-gray-800 text-white rounded">GitHub</a>
                      )}
                      {project.demo && (
                        <a href={project.demo} className="px-3 py-1 bg-purple-600 text-white rounded">Live Demo</a>
                      )}
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.highlights && project.highlights.length > 0 && project.highlights[0] && (
                  <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                    {project.highlights.map((highlight, i) => highlight && <li key={i}>{highlight}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 pl-4 border-l-3 border-purple-300">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <p className="text-purple-600">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1 mt-2">
                  {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Positions of Responsibility */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Leadership Roles</h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-4 pl-4 border-l-3 border-purple-300">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{position.title}</h3>
                  <p className="text-purple-600">{position.organization}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {position.startDate && new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {position.current ? 'Present' : position.endDate ? new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1 mt-2">
                  {position.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.technical?.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                  {skill}
                </span>
              ))}
              {skills.tools?.map((tool, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-3">Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default ProjectBasedTemplate;
