import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Edit, Trash2, Download, Clock, Award, Eye } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { getTemplateComponent } from '../components/templates';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

const ResumeHistory = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResume, setPreviewResume] = useState(null);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/resume/built/all',
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        setResumes(response.data.data.resumes);
        console.log('✅ Loaded resumes:', response.data.data.resumes.length);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Error loading resumes. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Better edit handler with proper routing
  const handleEditResume = (resumeId, template) => {
    console.log('📝 Editing resume:', resumeId, 'Template:', template);
    
    // Navigate to builder with edit parameter
    navigate(`/builder?edit=${resumeId}&template=${template || 'classic'}`);
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/resume/built/${resumeId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      if (response.data.status === 'success') {
        alert('✅ Resume deleted successfully');
        fetchResumes(); // Refresh the list
      }
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('❌ Error deleting resume. Please try again.');
      }
    }
  };

  const handleDownloadPDF = async (resumeId) => {
    try {
      setDownloading(resumeId);
      const token = localStorage.getItem('token');
      
      console.log('📥 Fetching resume data for PDF:', resumeId);
      
      // Fetch the full resume data
      const response = await axios.get(
        `http://localhost:5000/api/resume/built/${resumeId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        const resumeData = response.data.data.resume;
        console.log('✅ Resume data fetched, generating PDF...');
        
        setPreviewResume({
          data: resumeData.builtResumeData,
          template: resumeData.selectedTemplate,
          name: resumeData.resumeName
        });
        
        // Wait for DOM to update
        setTimeout(() => {
          downloadResumeAsPDF(resumeData.resumeName);
        }, 500);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('❌ Error downloading resume. Please try again.');
      setDownloading(null);
      setPreviewResume(null);
    }
  };

  const downloadResumeAsPDF = (resumeName) => {
    const element = document.getElementById('hidden-resume-preview');
    
    if (!element) {
      console.error('Preview element not found');
      alert('❌ Error generating PDF preview');
      setDownloading(null);
      setPreviewResume(null);
      return;
    }

    console.log('🎨 Generating PDF from element...');

    const options = {
      margin: 0,
      filename: `${resumeName.replace(/[^a-z0-9]/gi, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      }
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        console.log('✅ PDF downloaded successfully');
        setPreviewResume(null);
        setDownloading(null);
      })
      .catch(err => {
        console.error('PDF generation error:', err);
        alert('❌ Error generating PDF. Please try again.');
        setPreviewResume(null);
        setDownloading(null);
      });
  };

  const getATSColor = (score) => {
    if (!score) return 'text-gray-400';
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary-500';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getATSBadgeVariant = (score) => {
    if (!score) return 'outline';
    if (score >= 90) return 'success';
    if (score >= 75) return 'primary';
    if (score >= 60) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mt-4">
          Loading your resumes...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
            Resume History
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
            Manage all your created resumes ({resumes.length} total)
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/builder')}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Create New Resume
        </Button>
      </div>

      {/* Resumes Grid */}
      {resumes.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
              No resumes yet
            </h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
              Create your first professional resume to get started
            </p>
            <Button variant="primary" onClick={() => navigate('/builder')}>
              Create Resume
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card 
              key={resume.id} 
              className="hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              {/* Resume Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                      {resume.resumeName || resume.name || 'Untitled Resume'}
                    </h3>
                    <Badge variant="outline" size="sm" className="mt-1">
                      {resume.selectedTemplate || resume.template || 'classic'}
                    </Badge>
                  </div>
                </div>
                
                {/* ATS Score */}
                {resume.atsScore && (
                  <div className="flex flex-col items-end flex-shrink-0 ml-2">
                    <Award className={`w-5 h-5 ${getATSColor(resume.atsScore)}`} />
                    <Badge 
                      variant={getATSBadgeVariant(resume.atsScore)}
                      size="sm"
                      className="mt-1"
                    >
                      {resume.atsScore}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  <Clock className="w-4 h-4" />
                  <span>
                    Created {new Date(resume.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {resume.updatedAt && resume.updatedAt !== resume.createdAt && (
                  <div className="flex items-center gap-2 text-xs text-success">
                    <Clock className="w-4 h-4" />
                    <span>
                      Updated {new Date(resume.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  icon={Edit}
                  onClick={() => handleEditResume(resume.id, resume.selectedTemplate || resume.template)}
                  title="Edit Resume"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={downloading === resume.id ? undefined : Download}
                  onClick={() => handleDownloadPDF(resume.id)}
                  disabled={downloading === resume.id}
                  title="Download as PDF"
                >
                  {downloading === resume.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    'PDF'
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  className="text-error hover:bg-error/10"
                  onClick={() => handleDelete(resume.id)}
                  title="Delete Resume"
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hidden Resume Preview for PDF Generation */}
      {previewResume && (
        <div style={{ position: 'fixed', left: '-99999px', top: 0 }}>
          <div 
            id="hidden-resume-preview" 
            className="bg-white"
            style={{ 
              width: '8.5in', 
              minHeight: '11in',
              padding: 0,
              margin: 0
            }}
          >
            {(() => {
              try {
                const TemplateComponent = getTemplateComponent(previewResume.template);
                return <TemplateComponent data={previewResume.data} />;
              } catch (error) {
                console.error('Template rendering error:', error);
                return <div>Error rendering template</div>;
              }
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeHistory;
