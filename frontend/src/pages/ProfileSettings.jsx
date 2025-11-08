import React, { useState, useEffect } from 'react';
import { User, Lock, Trash2, Save, AlertCircle, CheckCircle, Mail, Phone, MapPin, FileText } from 'lucide-react';
import axios from 'axios';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { API_BASE_URL } from '../utils/api';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Profile data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    targetRoles: []
  });

  // Password data
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/profile`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showMessage('error', 'Failed to load profile data');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        profile,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        showMessage('success', 'Profile updated successfully!');
        // Update local storage if name changed
        if (profile.name) {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.name = profile.name;
          localStorage.setItem('user', JSON.stringify(user));
        }
      }
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    // Validation
    if (!passwords.currentPassword) {
      showMessage('error', 'Current password is required');
      return;
    }

    if (passwords.newPassword.length < 6) {
      showMessage('error', 'New password must be at least 6 characters');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.put(
        `${API_BASE_URL}/profile/change-password`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        showMessage('success', 'Password changed successfully!');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const password = prompt('⚠️ Enter your password to confirm account deletion:');
    
    if (!password) return;

    if (!window.confirm('⚠️ Are you ABSOLUTELY sure?\n\nThis will permanently delete:\n• Your account\n• All your resumes\n• All your data\n\nThis action CANNOT be undone!')) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.delete(
        `${API_BASE_URL}/profile`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          data: { password }
        }
      );

      alert('✅ Account deleted successfully. We\'re sorry to see you go!');
      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const MessageAlert = () => {
    if (!message.text) return null;

    return (
      <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
        message.type === 'success' 
          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      }`}>
        {message.type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span>{message.text}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage your account settings and preferences
        </p>

        <MessageAlert />

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 font-medium transition-all ${
              activeTab === 'profile'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-3 font-medium transition-all ${
              activeTab === 'security'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Security
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h2>
            
            <div className="space-y-5">
              <Input
                label="Full Name"
                icon={User}
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="John Doe"
              />

              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                placeholder="john@example.com"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  icon={Phone}
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                />

                <Input
                  label="Location"
                  icon={MapPin}
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="New York, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows="4"
                  maxLength="500"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                  placeholder="Tell us about yourself... (max 500 characters)"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {profile.bio?.length || 0}/500 characters
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="primary"
                  icon={Save}
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={fetchProfile}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Change Password
              </h2>
              
              <div className="space-y-5">
                <Input
                  label="Current Password"
                  type="password"
                  icon={Lock}
                  value={passwords.currentPassword}
                  onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />

                <Input
                  label="New Password"
                  type="password"
                  icon={Lock}
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                  placeholder="Enter new password (min 6 characters)"
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  icon={Lock}
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />

                {passwords.newPassword && passwords.confirmPassword && (
                  <div className={`text-sm ${
                    passwords.newPassword === passwords.confirmPassword
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {passwords.newPassword === passwords.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}

                <Button
                  variant="primary"
                  icon={Lock}
                  onClick={handleChangePassword}
                  disabled={loading || !passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword}
                  className="w-full"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </div>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-800">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                ⚠️ Danger Zone
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Once you delete your account, there is no going back. All your data will be permanently deleted.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-6 space-y-1">
                <li>Your account will be permanently deleted</li>
                <li>All your resumes will be removed</li>
                <li>Your progress and statistics will be lost</li>
                <li>This action cannot be undone</li>
              </ul>
              <Button
                variant="danger"
                icon={Trash2}
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                Delete My Account
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;