import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Award } from 'lucide-react';

const MarketingTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm font-sans" style={{ minHeight: '11in' }}>
      {/* Header with Brand Colors */}
      <div className="border-l-8 border-purple-600 pl-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-purple-600 font-medium mb-3">
          Marketing Professional
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-purple-700 mb-3 uppercase tracking-wide border-b-2 border-purple-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Core Competencies */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-purple-700 mb-3 uppercase tracking-wide border-b-2 border-purple-600 pb-1">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {[...skills.technical, ...skills.soft].map((skill, index) => (
              <div key={index} className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-purple-700 mb-3 uppercase tracking-wide border-b-2 border-purple-600 pb-1">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <span className="text-purple-600 mr-2 mt-1">▸</span>
                        <span>{item}</span>
                      </li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Campaigns & Projects */}
      {projects?.length > 0 && projects[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-purple-700 mb-3 uppercase tracking-wide border-b-2 border-purple-600 pb-1">
            Key Campaigns & Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              <p className="text-gray-700 text-sm mt-1">{project.description}</p>
              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {project.highlights.map((highlight, idx) => (
                    highlight && (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>{highlight}</span>
                      </li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-purple-700 mb-3 uppercase tracking-wide border-b-2 border-purple-600 pb-1">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-purple-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              {edu.gpa && <p className="text-sm text-gray-700 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-purple-700 mb-3 uppercase tracking-wide border-b-2 border-purple-600 pb-1">
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start">
                <Award className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingTemplate;
