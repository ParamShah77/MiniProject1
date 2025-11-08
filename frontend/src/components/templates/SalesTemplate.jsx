import React from 'react';
import { Mail, Phone, MapPin, Linkedin, TrendingUp, Award } from 'lucide-react';

const SalesTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm font-sans" style={{ minHeight: '11in' }}>
      {/* Header with Bold Design */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 -mx-12 -mt-12 mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-2xl font-light mb-4 opacity-90">
          Sales Professional
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
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
          <h2 className="text-xl font-bold text-orange-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            PROFESSIONAL SUMMARY
          </h2>
          <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Key Skills */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-3">
            KEY SKILLS
          </h2>
          <div className="flex flex-wrap gap-2">
            {[...skills.technical, ...skills.soft].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4">
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-orange-600 font-semibold text-base">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p className="font-bold text-orange-700">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {exp.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-orange-600 mr-3 mt-1 font-bold">►</span>
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
          <h2 className="text-xl font-bold text-orange-700 mb-4">
            EDUCATION
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-orange-600 font-medium">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              {edu.gpa && (
                <p className="text-sm text-gray-700 mt-2 font-medium">
                  GPA: {edu.gpa}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Awards */}
      {certifications?.length > 0 && certifications[0].name && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-orange-700 mb-4">
            CERTIFICATIONS & AWARDS
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start bg-orange-50 p-3 rounded-lg">
                <Award className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
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

export default SalesTemplate;
