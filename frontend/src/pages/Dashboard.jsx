import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    resumesAnalyzed: 0,
    resumesThisWeek: 0,
    averageMatchScore: 0,
    scoreImprovement: 0,
    targetRoles: 0,
    activeTargetRoles: 0,
    coursesRecommended: 0,
    coursesCompleted: 0
  });
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentAnalyses();
    const interval = setInterval(() => {
      fetchDashboardStats();
      fetchRecentAnalyses();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/dashboard/stats',
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        console.log('✅ Stats loaded:', response.data.data);
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
    }
  };

  // ✅ UPDATED: Fetch uploaded resumes with better error handling
  const fetchRecentAnalyses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:5000/api/resume/built/all',
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      console.log('📊 API Response:', response.data);

      if (response.data.status === 'success') {
        // ✅ Handle both response formats:
        // Format 1: { status, data: [...] }
        // Format 2: { status, data: { count, resumes: [...] } }
        
        let allResumes = [];
        
        if (Array.isArray(response.data.data)) {
          // If data is an array, use it directly
          allResumes = response.data.data;
          console.log('✅ Using array format, found:', allResumes.length, 'resumes');
        } else if (response.data.data && Array.isArray(response.data.data.resumes)) {
          // If data has a resumes property, use that
          allResumes = response.data.data.resumes;
          console.log('✅ Using object format, found:', allResumes.length, 'resumes');
        } else {
          console.warn('⚠️ Unexpected response format:', response.data);
          allResumes = [];
        }

        console.log('📋 All resumes:', allResumes);

        // ✅ Filter to show ONLY uploaded resumes (isBuiltResume: false)
        const uploadedResumes = allResumes
          .filter(resume => {
            const isUploaded = resume.isBuiltResume === false;
            if (!isUploaded) {
              console.log('⏭️ Skipping built resume:', resume.originalName || resume._id);
            }
            return isUploaded;
          })
          .sort((a, b) => {
            const dateA = new Date(a.uploadedAt || a.createdAt);
            const dateB = new Date(b.uploadedAt || b.createdAt);
            return dateB - dateA; // Most recent first
          })
          .slice(0, 5);

        console.log('✅ Filtered uploaded resumes:', uploadedResumes.length);
        console.log('📄 Recent uploaded resumes:', uploadedResumes.map(r => ({
          name: r.originalName,
          isBuilt: r.isBuiltResume,
          date: r.uploadedAt || r.createdAt
        })));

        setRecentAnalyses(uploadedResumes);
      } else {
        console.warn('⚠️ API returned non-success status:', response.data.status);
        setRecentAnalyses([]);
      }
    } catch (error) {
      console.error('❌ Error fetching analyses:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
        console.error('Status code:', error.response.status);
      }
      setRecentAnalyses([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScoreColor = (score) => {
    if (!score || score === 'N/A') return 'text-gray-500 dark:text-gray-400';
    const numScore = parseInt(score);
    if (numScore >= 70) return 'text-green-600 dark:text-green-400';
    if (numScore >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your career development progress
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Resumes Analyzed */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Resumes Analyzed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.resumesAnalyzed}</p>
                <p className="text-sm text-green-600 dark:text-green-400">↑ +{stats.resumesThisWeek} this week</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Average Match Score */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Average Match Score</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.averageMatchScore}%</p>
                <p className="text-sm text-green-600 dark:text-green-400">↑ +{stats.scoreImprovement}% improvement</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h.01a1 1 0 110 2H12zm-3.976 1.9a1 1 0 10-1.904-.6A6.002 6.002 0 006 11a1 1 0 102 0 4 4 0 014-4h.01a1 1 0 100-2H8a6 6 0 00-6 6 1 1 0 102 0 4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Target Roles */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Target Roles</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.targetRoles}</p>
                <p className="text-sm text-green-600 dark:text-green-400">↑ {stats.activeTargetRoles} active</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 4: Courses Recommended */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Courses Recommended</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.coursesRecommended}</p>
                <p className="text-sm text-green-600 dark:text-green-400">↑ {stats.coursesCompleted} completed</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Get started with your career analysis</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/resume-upload" className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <svg className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analyze Resume</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Upload your resume for AI-powered analysis</p>
              </div>
            </a>

            <a href="/resume-builder" className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <svg className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Build Resume</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create ATS-friendly resume from scratch</p>
              </div>
            </a>

            <a href="/resume-analysis" className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <svg className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">View Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review your past analyses and insights</p>
              </div>
            </a>

            <a href="/resume-history" className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <svg className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resume History</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all your created resumes</p>
              </div>
            </a>
          </div>
        </div>

        {/* ✅ Recent Analyses Section - Shows ONLY Uploaded Resumes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Analyses</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Your latest uploaded and analyzed resumes
              </p>
            </div>
            {recentAnalyses.length > 0 && (
              <a 
                href="/resume-analysis" 
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                View All →
              </a>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">Loading recent analyses...</p>
              </div>
            ) : recentAnalyses.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                  No recent analyses yet
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
                  Upload your first resume to get started with AI-powered analysis
                </p>
                <a 
                  href="/resume-upload" 
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Resume
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAnalyses.map((analysis) => {
                  const score = analysis.atsScore || analysis.parsedData?.final_ats_score || 'N/A';
                  return (
                    <div 
                      key={analysis._id} 
                      className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/resume-analysis?id=${analysis._id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">📄</span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {analysis.originalName || 'Resume Analysis'}
                            </h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                📅 {formatDate(analysis.uploadedAt || analysis.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                📌 {analysis.fileType?.toUpperCase() || 'PDF'}
                              </span>
                              {analysis.parsedData?.extracted_skills && (
                                <span className="flex items-center gap-1">
                                  🎯 {analysis.parsedData.extracted_skills.length} skills
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                            {score}{typeof score === 'number' ? '%' : ''}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ATS Score</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
