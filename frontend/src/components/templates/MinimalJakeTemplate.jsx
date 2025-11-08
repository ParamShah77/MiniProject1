import React from 'react';

const MinimalJakeTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-sm" style={{
      fontFamily: "'Computer Modern', 'Latin Modern Roman', 'Times New Roman', serif",
      minHeight: '11in',
      fontSize: '11pt',
      lineHeight: '1.3',
      color: '#000000'
    }}>
      
      {/* ========== HEADER ========== */}
      <div style={{ 
        textAlign: 'center',
        marginBottom: '0.15in',
        borderBottom: '1.5pt solid #000000',
        paddingBottom: '0.1in'
      }}>
        <h1 style={{
          fontSize: '20pt',
          fontWeight: 'bold',
          margin: '0 0 0.08in 0',
          letterSpacing: '0.5pt'
        }}>
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        
        <div style={{ 
          fontSize: '10pt',
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0 0.15in'
        }}>
          {personalInfo?.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo?.email && (
            <>
              {personalInfo?.phone && <span>|</span>}
              <span style={{ wordBreak: 'break-all' }}>{personalInfo.email}</span>
            </>
          )}
          {personalInfo?.linkedin && (
            <>
              {(personalInfo?.phone || personalInfo?.email) && <span>|</span>}
              <span style={{ wordBreak: 'break-all', fontSize: '9pt' }}>
                {personalInfo.linkedin.replace('https://', '').replace('http://', '')}
              </span>
            </>
          )}
          {personalInfo?.github && (
            <>
              <span>|</span>
              <span style={{ wordBreak: 'break-all', fontSize: '9pt' }}>
                {personalInfo.github.replace('https://', '').replace('http://', '')}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ========== EDUCATION ========== */}
      {education && education.length > 0 && education[0].institution && (
        <div style={{ marginBottom: '0.15in' }}>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '0.08in' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.02in'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                  {edu.location || (personalInfo?.location || '')}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '10pt',
                fontStyle: 'italic'
              }}>
                <div>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                  {edu.gpa && <span>; GPA: {edu.gpa}</span>}
                </div>
                <div>
                  {edu.startDate && edu.endDate && (
                    <>
                      {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' – '}
                      {new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== WORK EXPERIENCE ========== */}
      {experience && experience.length > 0 && experience[0].company && (
        <div style={{ marginBottom: '0.15in' }}>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Work Experience
          </h2>
          
          {experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '0.12in' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.02in'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                  {exp.position}
                </div>
                <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                  {exp.startDate && (
                    <>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' – '}
                      {exp.current ? 'Present' : exp.endDate ? 
                        new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 
                        'Present'}
                    </>
                  )}
                </div>
              </div>
              
              <div style={{ 
                fontSize: '10pt',
                fontStyle: 'italic',
                marginBottom: '0.05in'
              }}>
                {exp.company}
                {exp.location && <span> – {exp.location}</span>}
              </div>
              
              {exp.description && exp.description.length > 0 && (
                <ul style={{ 
                  margin: '0',
                  paddingLeft: '0.2in',
                  fontSize: '10.5pt',
                  lineHeight: '1.4'
                }}>
                  {exp.description.map((desc, i) => (
                    desc && (
                      <li key={i} style={{ 
                        marginBottom: '0.03in',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}>
                        {desc}
                      </li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ========== PROJECTS ========== */}
      {projects && projects.length > 0 && projects[0].name && (
        <div style={{ marginBottom: '0.15in' }}>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Projects
          </h2>
          
          {projects.map((project, index) => (
            <div key={index} style={{ marginBottom: '0.12in' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.02in'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                  {project.name}
                </div>
                {project.date && (
                  <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                    {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                )}
              </div>
              
              {project.description && (
                <div style={{ 
                  fontSize: '10.5pt',
                  lineHeight: '1.4',
                  marginBottom: '0.03in',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {project.description}
                </div>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div style={{ 
                  fontSize: '10pt',
                  fontStyle: 'italic'
                }}>
                  <span style={{ fontWeight: 'bold' }}>Technologies:</span> {project.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ========== POSITIONS OF RESPONSIBILITY ========== */}
      {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
        <div style={{ marginBottom: '0.15in' }}>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Positions of Responsibility
          </h2>
          
          {data.positionsOfResponsibility.map((position, index) => (
            <div key={index} style={{ marginBottom: '0.12in' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.02in'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                  {position.title}
                </div>
                <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                  {position.startDate && (
                    <>
                      {new Date(position.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' – '}
                      {position.current ? 'Present' : position.endDate ? 
                        new Date(position.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 
                        'Present'}
                    </>
                  )}
                </div>
              </div>
              
              <div style={{ 
                fontSize: '10pt',
                fontStyle: 'italic',
                marginBottom: '0.05in'
              }}>
                {position.organization}
              </div>
              
              {position.description && position.description.length > 0 && (
                <ul style={{ 
                  margin: '0',
                  paddingLeft: '0.2in',
                  fontSize: '10.5pt',
                  lineHeight: '1.4'
                }}>
                  {position.description.map((desc, i) => (
                    desc && (
                      <li key={i} style={{ 
                        marginBottom: '0.03in',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}>
                        {desc}
                      </li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ========== TECHNICAL SKILLS ========== */}
      {skills && (skills.technical?.length > 0 || skills.tools?.length > 0 || skills.languages?.length > 0 || skills.soft?.length > 0) && (
        <div style={{ marginBottom: '0.15in' }}>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Technical Skills
          </h2>
          
          <div style={{ fontSize: '10.5pt', lineHeight: '1.5' }}>
            {skills.languages && skills.languages.length > 0 && (
              <div style={{ marginBottom: '0.05in' }}>
                <span style={{ fontWeight: 'bold' }}>Languages: </span>
                <span>{skills.languages.join(', ')}</span>
              </div>
            )}
            
            {skills.technical && skills.technical.length > 0 && (
              <div style={{ marginBottom: '0.05in' }}>
                <span style={{ fontWeight: 'bold' }}>Technical Skills: </span>
                <span>{skills.technical.join(', ')}</span>
              </div>
            )}
            
            {skills.tools && skills.tools.length > 0 && (
              <div style={{ marginBottom: '0.05in' }}>
                <span style={{ fontWeight: 'bold' }}>Developer Tools: </span>
                <span>{skills.tools.join(', ')}</span>
              </div>
            )}
            
            {skills.soft && skills.soft.length > 0 && (
              <div>
                <span style={{ fontWeight: 'bold' }}>Soft Skills: </span>
                <span>{skills.soft.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========== CERTIFICATIONS ========== */}
      {certifications && certifications.length > 0 && certifications[0].name && (
        <div style={{ marginBottom: '0.15in' }}>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Certifications
          </h2>
          
          {certifications.map((cert, index) => (
            <div key={index} style={{ marginBottom: '0.05in', fontSize: '10.5pt' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold' }}>{cert.name}</span>
                  {cert.issuer && <span> – {cert.issuer}</span>}
                </div>
                {cert.date && (
                  <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>
                    {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== SUMMARY (if exists) ========== */}
      {personalInfo?.summary && (
        <div>
          <h2 style={{
            fontSize: '11pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            borderBottom: '1pt solid #000000',
            paddingBottom: '0.02in',
            marginBottom: '0.08in'
          }}>
            Summary
          </h2>
          
          <div style={{ 
            fontSize: '10.5pt',
            lineHeight: '1.5',
            textAlign: 'justify',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            {personalInfo.summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalJakeTemplate;
