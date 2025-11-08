import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Users } from 'lucide-react';

const HRTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, positionsOfResponsibility } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm font-sans" style={{ minHeight: '11in' }}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-teal-600">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-teal-700 font-medium mb-3">
          Human Resources Professional
        </p>
        
        {/* Contact Info */}
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
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

      {/* Professional Profile */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-700 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5" />
            Professional Profile
          </h2>
          <p className="text-gray-700 leading-relaxed border-l-4 border-teal-300 pl-4">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Areas of Expertise */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-700 mb-3 uppercase tracking-wide">
            Areas of Expertise
          </h2>
          <div className="bg-teal-50 p-4 rounded">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[...skills.technical, ...skills.soft].map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-700 mb-4 uppercase tracking-wide">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 border-l-4 border-teal-300 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-teal-700 font-medium">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p className="font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {exp.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-teal-600 mr-2 mt-1">●</span>
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
          <h2 className="text-lg font-bold text-teal-700 mb-4 uppercase tracking-wide">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 bg-gray-50 p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-teal-700">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              {edu.gpa && <p className="text-sm text-gray-700 mt-2">GPA: {edu.gpa}</p>}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {edu.achievements.map((achievement, idx) => (
                    achievement && (
                      <li key={idx} className="text-sm text-gray-700">
                        • {achievement}
                      </li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-700 mb-4 uppercase tracking-wide">
            Professional Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start bg-teal-50 p-3 rounded">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-3 mt-2"></div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positions of Responsibility */}
      {positionsOfResponsibility?.length > 0 && positionsOfResponsibility[0].title && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-700 mb-4 uppercase tracking-wide">
            Leadership & Responsibilities
          </h2>
          {positionsOfResponsibility.map((pos, index) => (
            <div key={index} className="mb-4 border-l-2 border-teal-400 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{pos.title}</h3>
                  <p className="text-teal-600">{pos.organization}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {pos.startDate} - {pos.current ? 'Present' : pos.endDate}
                </p>
              </div>
              {pos.description && pos.description.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {pos.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="text-sm text-gray-700">
                        • {item}
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

export default HRTemplate;
