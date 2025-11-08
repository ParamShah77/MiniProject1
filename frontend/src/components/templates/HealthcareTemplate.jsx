import React from 'react';
import { Mail, Phone, MapPin, Heart, Award, Activity } from 'lucide-react';

const HealthcareTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, certifications, positionsOfResponsibility } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm font-sans" style={{ minHeight: '11in' }}>
      {/* Header with Healthcare Theme */}
      <div className="text-center mb-8 pb-6 border-b-4 border-rose-600">
        <div className="flex justify-center mb-3">
          <Heart className="w-12 h-12 text-rose-600" />
        </div>
        <h1 className="text-4xl font-bold text-rose-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-rose-700 font-semibold mb-4">
          Healthcare Professional
        </p>
        
        {/* Contact Info */}
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-700">
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

      {/* Professional Profile */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-rose-900 mb-3 uppercase tracking-wide">
            Professional Profile
          </h2>
          <div className="bg-rose-50 border-l-4 border-rose-600 p-4">
            <p className="text-gray-800 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        </div>
      )}

      {/* Clinical Competencies */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-rose-900 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Clinical Competencies & Skills
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[...skills.technical, ...skills.soft].map((skill, index) => (
              <div key={index} className="flex items-center bg-rose-50 px-4 py-2 rounded">
                <span className="text-rose-600 mr-2 text-lg">✚</span>
                <span className="text-gray-800 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience?.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-rose-900 mb-4 uppercase tracking-wide">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-rose-200 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                  <p className="text-rose-700 font-semibold">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                </div>
                <div className="text-right text-sm text-gray-700">
                  <p className="font-medium bg-rose-100 px-3 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
              </div>
              {exp.description && exp.description.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {exp.description.map((item, idx) => (
                    item && (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-rose-600 mr-2 font-bold">•</span>
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

      {/* Education & Training */}
      {education?.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-rose-900 mb-4 uppercase tracking-wide">
            Education & Training
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-300 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-rose-700 font-semibold">{edu.institution}</p>
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

      {/* Licenses & Certifications */}
      {certifications?.length > 0 && certifications[0].name && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-rose-900 mb-4 uppercase tracking-wide">
            Licenses & Certifications
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-start bg-rose-50 p-4 rounded border-l-4 border-rose-600">
                <Award className="w-5 h-5 text-rose-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Affiliations & Leadership */}
      {positionsOfResponsibility?.length > 0 && positionsOfResponsibility[0].title && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-rose-900 mb-4 uppercase tracking-wide">
            Professional Affiliations & Leadership
          </h2>
          {positionsOfResponsibility.map((pos, index) => (
            <div key={index} className="mb-4 bg-gray-50 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{pos.title}</h3>
                  <p className="text-rose-700 font-medium">{pos.organization}</p>
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

export default HealthcareTemplate;
