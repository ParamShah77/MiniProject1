import React from 'react';

const MinimalJakeTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  return (
    <div 
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        backgroundColor: '#ffffff',
        width: '8.5in',
        minHeight: '11in',
        padding: '0.5in',
        boxSizing: 'border-box',
        fontSize: '10pt',
        lineHeight: '1.5'
      }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '35% 65%', 
        gap: '1.5rem',
        height: '100%'
      }}>
        
        {/* LEFT COLUMN */}
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '1.5rem 1rem',
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          {/* Profile Circle */}
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '48px',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            {personalInfo?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          {/* Contact Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              color: '#2563eb', 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem', 
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              CONTACT
            </h3>
            <div style={{ fontSize: '0.75rem', lineHeight: '1.6', color: '#4b5563' }}>
              {personalInfo?.phone && (
                <div style={{ 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#2563eb', flexShrink: 0 }}>📱</span>
                  <span style={{ wordBreak: 'break-word' }}>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.email && (
                <div style={{ 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#2563eb', flexShrink: 0 }}>✉</span>
                  <span style={{ wordBreak: 'break-all', fontSize: '0.7rem' }}>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div style={{ 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#2563eb', flexShrink: 0 }}>📍</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo?.linkedin && (
                <div style={{ 
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#2563eb', flexShrink: 0 }}>🔗</span>
                  <span style={{ 
                    wordBreak: 'break-all', 
                    fontSize: '0.65rem',
                    lineHeight: '1.4'
                  }}>
                    {personalInfo.linkedin.replace('https://', '').replace('http://', '')}
                  </span>
                </div>
              )}
              {personalInfo?.github && (
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#2563eb', flexShrink: 0 }}>💻</span>
                  <span style={{ 
                    wordBreak: 'break-all', 
                    fontSize: '0.65rem',
                    lineHeight: '1.4'
                  }}>
                    {personalInfo.github.replace('https://', '').replace('http://', '')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && (skills.technical?.length > 0 || skills.tools?.length > 0) && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ 
                color: '#2563eb', 
                fontSize: '0.875rem', 
                fontWeight: 'bold', 
                marginBottom: '0.75rem', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                SKILLS
              </h3>
              {skills.technical && skills.technical.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Technical
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {skills.technical.map((skill, i) => (
                      <span 
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.tools && skills.tools.length > 0 && (
                <div>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Tools
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {skills.tools.map((tool, i) => (
                      <span 
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#e5e7eb',
                          color: '#374151',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {skills?.languages && skills.languages.length > 0 && (
            <div>
              <h3 style={{ 
                color: '#2563eb', 
                fontSize: '0.875rem', 
                fontWeight: 'bold', 
                marginBottom: '0.75rem', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                LANGUAGES
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                {skills.languages.map((lang, i) => (
                  <div key={i} style={{ marginBottom: '0.25rem' }}>{lang}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Header with NAME */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '300',
              color: '#2563eb',
              marginBottom: '0.5rem',
              lineHeight: '1.2',
              wordWrap: 'break-word'
            }}>
              {personalInfo?.fullName || 'Your Name'}
            </h1>
            <p style={{ 
              fontSize: '1rem', 
              color: '#6b7280',
              wordWrap: 'break-word'
            }}>
              {personalInfo?.summary?.substring(0, 100) || 'Professional Summary'}
            </p>
          </div>

          {/* Full Summary */}
          {personalInfo?.summary && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '0.5rem'
              }}>
                About Me
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#374151', 
                lineHeight: '1.6',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && experience[0].company && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '1rem'
              }}>
                Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                      <h3 style={{ 
                        fontWeight: '600', 
                        fontSize: '0.95rem',
                        marginBottom: '0.25rem',
                        wordWrap: 'break-word'
                      }}>
                        {exp.position}
                      </h3>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: '0.875rem',
                        wordWrap: 'break-word'
                      }}>
                        {exp.company}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {exp.startDate && (
                        <>
                          {new Date(exp.startDate).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })}
                          {' - '}
                          {exp.current ? 'Present' : exp.endDate ? 
                            new Date(exp.endDate).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }) : 
                            'Present'}
                        </>
                      )}
                    </div>
                  </div>
                  {exp.description && exp.description.length > 0 && (
                    <ul style={{ 
                      listStyle: 'none', 
                      margin: 0, 
                      padding: 0, 
                      fontSize: '0.875rem', 
                      lineHeight: '1.5'
                    }}>
                      {exp.description.map((desc, i) => (
                        desc && (
                          <li key={i} style={{ 
                            marginBottom: '0.25rem',
                            color: '#374151',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                          }}>
                            • {desc}
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
          {education && education.length > 0 && education[0].institution && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '1rem'
              }}>
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontWeight: '600', 
                        fontSize: '0.95rem',
                        wordWrap: 'break-word'
                      }}>
                        {edu.institution}
                      </h3>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: '0.875rem',
                        marginTop: '0.25rem',
                        wordWrap: 'break-word'
                      }}>
                        {edu.degree}{edu.field && `, ${edu.field}`}
                      </div>
                      {edu.gpa && (
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: '#9ca3af',
                          marginTop: '0.25rem'
                        }}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af',
                      flexShrink: 0,
                      marginLeft: '1rem'
                    }}>
                      {edu.startDate && edu.endDate && (
                        <>{new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}</>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && projects[0].name && (
            <div>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '1rem'
              }}>
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <h3 style={{ 
                    fontWeight: '600', 
                    fontSize: '0.95rem',
                    marginBottom: '0.25rem',
                    wordWrap: 'break-word'
                  }}>
                    {project.name}
                  </h3>
                  {project.description && (
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#374151',
                      marginTop: '0.25rem',
                      marginBottom: '0.5rem',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.25rem'
                    }}>
                      {project.technologies.map((tech, i) => (
                        <span key={i} style={{ 
                          fontSize: '0.7rem', 
                          padding: '0.125rem 0.5rem',
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          borderRadius: '4px'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Positions of Responsibility */}
          {data.positionsOfResponsibility && data.positionsOfResponsibility.length > 0 && data.positionsOfResponsibility[0].title && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#2563eb', 
                marginBottom: '1rem'
              }}>
                Leadership & Responsibilities
              </h2>
              {data.positionsOfResponsibility.map((position, index) => (
                <div key={index} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                      <h3 style={{ 
                        fontWeight: '600', 
                        fontSize: '0.95rem',
                        marginBottom: '0.25rem',
                        wordWrap: 'break-word'
                      }}>
                        {position.title}
                      </h3>
                      <div style={{ 
                        color: '#6b7280', 
                        fontSize: '0.875rem',
                        wordWrap: 'break-word'
                      }}>
                        {position.organization}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {position.startDate && (
                        <>
                          {new Date(position.startDate).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })}
                          {' - '}
                          {position.current ? 'Present' : position.endDate ? 
                            new Date(position.endDate).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }) : 
                            'Present'}
                        </>
                      )}
                    </div>
                  </div>
                  {position.description && position.description.length > 0 && (
                    <ul style={{ 
                      listStyle: 'none', 
                      margin: 0, 
                      padding: 0, 
                      fontSize: '0.875rem', 
                      lineHeight: '1.5'
                    }}>
                      {position.description.map((desc, i) => (
                        desc && (
                          <li key={i} style={{ 
                            marginBottom: '0.25rem',
                            color: '#374151',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                          }}>
                            • {desc}
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
      </div>
    </div>
  );
};

export default MinimalJakeTemplate;
