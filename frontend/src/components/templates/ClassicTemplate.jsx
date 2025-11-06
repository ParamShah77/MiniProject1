import React from 'react';
import BaseTemplate from './BaseTemplate';

const ClassicTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Calibri, Arial, sans-serif" className="classic-template">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center gap-4 text-sm text-gray-700">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>•</span>}
          {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          {personalInfo?.location && <span>•</span>}
          {personalInfo?.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo?.linkedin || personalInfo?.github) && (
          <div className="flex justify-center gap-4 text-sm text-gray-600 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>•</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <span className="font-bold text-base">{exp.position}</span>
                  {exp.company && <span className="text-gray-700"> - {exp.company}</span>}
                </div>
                <div className="text-sm text-gray-600">
                  {exp.startDate && (
                    <>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.current ? 'Present' : exp.endDate ? 
                        new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 
                        'Present'}
                    </>
                  )}
                </div>
              </div>
              {exp.location && (
                <div className="text-sm text-gray-600 italic mb-2">{exp.location}</div>
              )}
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {exp.description.map((desc, i) => (
                    desc && <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold">{edu.degree}</span>
                  {edu.field && <span className="text-gray-700"> in {edu.field}</span>}
                </div>
                <div className="text-sm text-gray-600">
                  {edu.startDate && edu.endDate && (
                    <>
                      {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                    </>
                  )}
                </div>
              </div>
              <div className="text-gray-700">{edu.institution}</div>
              {edu.gpa && <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">
            Skills
          </h2>
          {skills.technical && skills.technical.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">Technical: </span>
              <span className="text-gray-800">{skills.technical.join(', ')}</span>
            </div>
          )}
          {skills.tools && skills.tools.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">Tools: </span>
              <span className="text-gray-800">{skills.tools.join(', ')}</span>
            </div>
          )}
          {skills.soft && skills.soft.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">Soft Skills: </span>
              <span className="text-gray-800">{skills.soft.join(', ')}</span>
            </div>
          )}
          {skills.languages && skills.languages.length > 0 && (
            <div>
              <span className="font-semibold">Languages: </span>
              <span className="text-gray-800">{skills.languages.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="font-bold">{project.name}</div>
              {project.description && (
                <p className="text-sm text-gray-800 mb-1">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Technologies: </span>
                  {project.technologies.join(', ')}
                </div>
              )}
              {(project.github || project.demo) && (
                <div className="text-sm text-gray-600">
                  {project.github && <span>GitHub: {project.github}</span>}
                  {project.github && project.demo && <span> | </span>}
                  {project.demo && <span>Demo: {project.demo}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Positions of Responsibility */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">
            Positions of Responsibility
          </h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <span className="font-bold text-base">{position.title}</span>
                  {position.organization && <span className="text-gray-700"> - {position.organization}</span>}
                </div>
                <div className="text-sm text-gray-600">
                  {position.startDate && (
                    <>
                      {new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {position.current ? 'Present' : position.endDate ? 
                        new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 
                        'Present'}
                    </>
                  )}
                </div>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {position.description.map((desc, i) => (
                    desc && <li key={i}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && certifications[0].name && (
        <div>
          <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-sm text-gray-600">
                  {cert.date && new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              {cert.issuer && <div className="text-sm text-gray-700">{cert.issuer}</div>}
            </div>
          ))}
        </div>
      )}
    </BaseTemplate>
  );
};

export default ClassicTemplate;
