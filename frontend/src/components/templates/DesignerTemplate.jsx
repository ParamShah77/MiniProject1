import React from 'react';
import BaseTemplate from './BaseTemplate';

const DesignerTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Raleway, sans-serif" className="designer-template">
      {/* Minimalist Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-extralight text-pink-500 mb-2 tracking-wide">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-500 font-light tracking-wide mb-4">
          {experience?.[0]?.position || 'Creative Professional'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-light">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.portfolio && (
            <span className="text-pink-400 font-normal">{personalInfo.portfolio.replace('https://', '')}</span>
          )}
        </div>
      </div>

      {/* About */}
      {personalInfo?.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-pink-500 mb-3 tracking-wide">About</h2>
          <p className="text-sm text-gray-600 leading-loose font-light">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-pink-500 mb-4 tracking-wide">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-normal text-base text-gray-800">{exp.position}</h3>
                  <p className="text-gray-500 font-light">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400 font-light">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric' })}
                  {' – '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="space-y-2 text-sm text-gray-600 font-light">
                  {exp.description.map((desc, i) => desc && <li key={i}>— {desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects/Portfolio */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-pink-500 mb-4 tracking-wide">Portfolio Highlights</h2>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg hover:border-pink-300 transition">
                <h3 className="font-normal text-base text-gray-800 mb-2">{project.name}</h3>
                {project.description && (
                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-2">{project.description}</p>
                )}
                {project.demo && (
                  <a href={project.demo} className="text-xs text-pink-400 font-normal">View Project →</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-pink-500 mb-3 tracking-wide">Skills & Tools</h2>
          <div className="flex flex-wrap gap-3">
            {[...(skills.technical || []), ...(skills.tools || [])].map((skill, i) => (
              <span key={i} className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-xs font-light tracking-wide">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].institution && (
        <div>
          <h2 className="text-xl font-light text-pink-500 mb-3 tracking-wide">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-normal text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <p className="text-sm text-gray-500 font-light">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Leadership Positions */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-pink-500 mb-4 tracking-wide">Leadership</h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-normal text-base text-gray-800">{position.title}</h3>
                  <p className="text-gray-500 font-light">{position.organization}</p>
                </div>
                <span className="text-sm text-gray-400 font-light">
                  {position.startDate && new Date(position.startDate).toLocaleDateString('en-US', { year: 'numeric' })}
                  {' – '}
                  {position.current ? 'Present' : position.endDate ? new Date(position.endDate).toLocaleDateString('en-US', { year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="space-y-2 text-sm text-gray-600 font-light">
                  {position.description.map((desc, i) => desc && <li key={i}>— {desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </BaseTemplate>
  );
};

export default DesignerTemplate;
