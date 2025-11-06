import React from 'react';
import BaseTemplate from './BaseTemplate';

const StudentFresherTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <BaseTemplate font="Roboto, sans-serif" className="student-fresher-template">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-blue-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600">
          {personalInfo?.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo?.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
        </div>
        {(personalInfo?.linkedin || personalInfo?.github) && (
          <div className="flex justify-center gap-3 text-sm text-blue-600 mt-2">
            {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://', '')}</span>}
            {personalInfo.github && <span>{personalInfo.github.replace('https://', '')}</span>}
          </div>
        )}
      </div>

      {/* Objective */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase">Career Objective</h2>
          <p className="text-sm text-gray-700 leading-relaxed pl-2 border-l-3 border-blue-300">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education (Priority for freshers) */}
      {education && education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pl-4 border-l-2 border-gray-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base">{edu.degree}</h3>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  <p className="text-gray-700 font-medium">{edu.institution}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {edu.startDate && edu.endDate && (
                    <>{new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}</>
                  )}
                </div>
              </div>
              {edu.gpa && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">GPA:</span> {edu.gpa}
                </p>
              )}
              {edu.achievements && edu.achievements.length > 0 && edu.achievements[0] && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-2">
                  {edu.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">Technical Skills</h2>
          <div className="pl-4">
            {skills.technical && skills.technical.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Programming & Technologies: </span>
                <span className="text-gray-700">{skills.technical.join(' • ')}</span>
              </div>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Tools & Platforms: </span>
                <span className="text-gray-700">{skills.tools.join(' • ')}</span>
              </div>
            )}
            {skills.soft && skills.soft.length > 0 && (
              <div>
                <span className="font-semibold text-gray-800">Soft Skills: </span>
                <span className="text-gray-700">{skills.soft.join(' • ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 pl-4 border-l-2 border-gray-300">
              <h3 className="font-semibold text-base">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-gray-700 mt-1">{project.description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Tech Stack:</span> {project.technologies.join(', ')}
                </p>
              )}
              {project.highlights && project.highlights.length > 0 && project.highlights[0] && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-1">
                  {project.highlights.map((highlight, i) => highlight && <li key={i}>{highlight}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Positions of Responsibility */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">Positions of Responsibility</h2>
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} className="mb-4 pl-4 border-l-2 border-gray-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base">{position.title}</h3>
                  <p className="text-gray-700 font-medium">{position.organization}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {position.startDate && position.endDate && (
                    <>
                      {new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' – '}
                      {position.current ? 'Present' : new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </>
                  )}
                </div>
              </div>
              {position.description && position.description.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-2">
                  {position.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience (Optional for freshers) */}
      {experience && experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 pl-4 border-l-2 border-gray-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' - '}
                  {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </span>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="list-disc ml-4 text-sm text-gray-700 mt-2">
                  {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && certifications[0].name && (
        <div>
          <h2 className="text-lg font-bold text-blue-600 mb-3 uppercase">Certifications</h2>
          <div className="pl-4 space-y-2">
            {certifications.map((cert, index) => (
              <div key={index}>
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && <span className="text-gray-600"> - {cert.issuer}</span>}
                {cert.date && (
                  <span className="text-sm text-gray-500 ml-2">
                    ({new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseTemplate>
  );
};

export default StudentFresherTemplate;
