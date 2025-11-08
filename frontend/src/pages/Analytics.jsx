import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Award, Target, BarChart3, PieChart as PieChartIcon, ArrowLeft, Activity } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [monthlyActivity, setMonthlyActivity] = useState([]);
  const [skillsDistribution, setSkillsDistribution] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [overviewRes, activityRes, skillsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/analytics/overview`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/analytics/monthly-activity?months=6`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_BASE_URL}/analytics/skills-distribution`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (overviewRes.data.status === 'success') {
        setAnalyticsData(overviewRes.data.data);
      }
      if (activityRes.data.status === 'success') {
        setMonthlyActivity(activityRes.data.data.monthlyActivity);
      }
      if (skillsRes.data.status === 'success') {
        setSkillsDistribution(skillsRes.data.data.distribution);
      }

    } catch (error) {
      console.error('❌ Analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
            <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Analytics Data</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Start uploading resumes and analyzing jobs to see your analytics!</p>
            <Link to="/resume-upload" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Upload Resume
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { summary, trends, activity } = analyticsData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Career Analytics
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your progress and insights across resumes, analyses, and job matches
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-bold">{summary.totalResumes}</span>
            </div>
            <h3 className="text-sm font-medium opacity-90">Total Resumes</h3>
            <p className="text-xs opacity-75 mt-1">
              {summary.uploadedResumes} uploaded · {summary.builtResumes} built
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-bold">{summary.averageAtsScore}%</span>
            </div>
            <h3 className="text-sm font-medium opacity-90">Average ATS Score</h3>
            <p className="text-xs opacity-75 mt-1">
              Best: {summary.bestAtsScore}% · Latest: {summary.latestAtsScore}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-bold">{summary.averageMatchScore}%</span>
            </div>
            <h3 className="text-sm font-medium opacity-90">Avg Job Match</h3>
            <p className="text-xs opacity-75 mt-1">
              Best: {summary.bestMatchScore}% · {summary.totalJobAnalyses} analyzed
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-bold">{summary.uniqueSkills}</span>
            </div>
            <h3 className="text-sm font-medium opacity-90">Unique Skills</h3>
            <p className="text-xs opacity-75 mt-1">
              Across all resumes
            </p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* ATS Score Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              ATS Score Trend
            </h2>
            {trends.atsScoreTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends.atsScoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    className="text-gray-600 dark:text-gray-400"
                  />
                  <YAxis className="text-gray-600 dark:text-gray-400" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="ATS Score %" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                No ATS analysis data yet
              </div>
            )}
          </div>

          {/* Job Match Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Job Match Scores
            </h2>
            {trends.jobMatchTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trends.jobMatchTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis 
                    dataKey="jobTitle" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    className="text-xs text-gray-600 dark:text-gray-400"
                  />
                  <YAxis className="text-gray-600 dark:text-gray-400" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="matchScore" fill="#8b5cf6" name="Match Score %" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                No job match data yet
              </div>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Monthly Activity (Last 6 Months)
            </h2>
            {monthlyActivity.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-gray-600 dark:text-gray-400" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="resumes" fill="#3b82f6" name="Resumes" />
                  <Bar dataKey="analyses" fill="#10b981" name="Analyses" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                No activity data yet
              </div>
            )}
          </div>

          {/* Skills Distribution */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-orange-600" />
              Skills Distribution
            </h2>
            {skillsDistribution.some(s => s.value > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillsDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {skillsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                No skills data yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Last 30 Days Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{activity.resumesUploaded}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Resumes Uploaded</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{activity.analysesRun}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Analyses Run</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{activity.jobsAnalyzed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Jobs Analyzed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
