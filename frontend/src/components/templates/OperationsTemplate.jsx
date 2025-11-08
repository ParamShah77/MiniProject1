import React from 'react';
import { Mail, Phone, MapPin, Package, TrendingUp } from 'lucide-react';

const OperationsTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, positionsOfResponsibility } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm font-sans" style={{ minHeight: '11in' }}>
      {/* Header with Indigo Theme */}
      <div className="bg-indigo-700 text-white p-8 -m-12 mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl font-light mb-4 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Operations & Logistics Professional
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm">
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
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="mb-8 bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-700">
          <h2 className="text-lg font-bold text-indigo-900 mb-3 uppercase tracking-wide">
            Executive Summary
          </h2>
          <p className="text-gray-800 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Core Competencies */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-900 mb-4 uppercase tracking-wide flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Core Competencies
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[...skills.technical, ...skills.soft].map((skill, index) => (
              <div key={index} className="text-center py-2 bg-indigo-100 text-indigo-900 rounded-md font-medium text-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-900 mb-4 uppercase tracking-wide">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 pb-6 border-b-2 border-indigo-200 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-indigo-700 font-semibold text-base">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                </div>
                <div className="text-right text-sm text-gray-700">
                  <p className="font-semibold bg-indigo-100 px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {exp.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-indigo-700 mr-2 font-bold text-lg">■</span>
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

      {/* Key Projects & Initiatives */}
      {projects?.length > 0 && projects[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-900 mb-4 uppercase tracking-wide">
            Key Projects & Process Improvements
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 border-l-4 border-indigo-700 pl-4 bg-gray-50 p-4">
              <h3 className="font-bold text-gray-900 text-base mb-2">{project.name}</h3>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-200 text-indigo-900 text-xs rounded font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.description && (
                <ul className="space-y-1">
                  {project.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-indigo-700 mr-2">▸</span>
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

      {/* Education */}
      {education?.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-900 mb-4 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="bg-indigo-50 p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <p className="text-indigo-800 font-semibold">{edu.institution}</p>
                    {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-gray-700 mt-2">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leadership & Professional Development */}
      {positionsOfResponsibility?.length > 0 && positionsOfResponsibility[0].title && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-900 mb-4 uppercase tracking-wide">
            Leadership & Professional Development
          </h2>
          {positionsOfResponsibility.map((pos, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{pos.title}</h3>
                  <p className="text-indigo-700 font-medium">{pos.organization}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {pos.startDate} - {pos.current ? 'Present' : pos.endDate}
                </p>
              </div>
              {pos.description && pos.description.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {pos.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-indigo-700 mr-2">•</span>
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
    </div>
  );
};

export default OperationsTemplate;
