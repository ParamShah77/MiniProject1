import React from 'react';
import { Mail, Phone, MapPin, TrendingUp, DollarSign, Award } from 'lucide-react';

const FinanceTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm font-sans" style={{ minHeight: '11in' }}>
      {/* Header with Green Theme */}
      <div className="mb-8 pb-6 border-b-4 border-green-700">
        <h1 className="text-4xl font-bold text-green-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-green-700 font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Finance Professional
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
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

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-3 uppercase tracking-wider border-b-2 border-green-700 pb-2">
            Professional Summary
          </h2>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
            <p className="text-gray-800 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-3 uppercase tracking-wider border-b-2 border-green-700 pb-2">
            Core Competencies
          </h2>
          <div className="bg-green-50 p-4 rounded">
            <div className="grid grid-cols-2 gap-3">
              {[...skills.technical, ...skills.soft].map((skill, index) => (
                <div key={index} className="flex items-center text-gray-800">
                  <span className="text-green-700 mr-2">▪</span>
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-4 uppercase tracking-wider border-b-2 border-green-700 pb-2">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 pb-6 border-l-4 border-green-700 pl-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                  <p className="text-green-800 font-semibold">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                </div>
                <div className="text-right text-sm text-gray-700">
                  <p className="font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {exp.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-green-700 mr-2 font-bold">•</span>
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

      {/* Key Financial Projects */}
      {projects?.length > 0 && projects[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-4 uppercase tracking-wider border-b-2 border-green-700 pb-2">
            Key Financial Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4 bg-green-50 p-4 rounded">
              <h3 className="font-bold text-gray-900 mb-2">{project.name}</h3>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-200 text-green-900 text-xs rounded-full font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.description && (
                <ul className="mt-2 space-y-1">
                  {project.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-700 mr-2">▸</span>
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
          <h2 className="text-lg font-bold text-green-900 mb-4 uppercase tracking-wider border-b-2 border-green-700 pb-2">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-300 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-green-800 font-semibold">{edu.institution}</p>
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
      )}

      {/* Professional Certifications */}
      {certifications?.length > 0 && certifications[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-4 uppercase tracking-wider border-b-2 border-green-700 pb-2">
            Professional Certifications
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start bg-green-50 p-3 rounded">
                <Award className="w-5 h-5 text-green-700 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceTemplate;
