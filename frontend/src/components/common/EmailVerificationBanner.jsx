import React, { useState, useEffect } from 'react';
import { Mail, X, Loader, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { showSuccess, showError, showInfo } from '../../utils/toast';

const EmailVerificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(null);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/auth/check-verification`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        const verified = response.data.data.isEmailVerified;
        setIsVerified(verified);
        setIsVisible(!verified); // Show banner if not verified
      }
    } catch (error) {
      console.error('Error checking verification:', error);
    }
  };

  const handleSendVerification = async () => {
    try {
      setSending(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/auth/send-verification`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === 'success') {
        setEmailSent(true);
        showSuccess(`✅ Verification email sent to ${response.data.data.email}! Check your inbox.`);
      }
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to send verification email');
    } finally {
      setSending(false);
    }
  };

  if (!isVisible || isVerified) return null;

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 dark:from-yellow-600 dark:via-yellow-700 dark:to-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Left: Icon + Message */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm sm:text-base">
                {emailSent ? '📧 Verification Email Sent!' : '⚠️ Please Verify Your Email'}
              </p>
              <p className="text-xs sm:text-sm opacity-90">
                {emailSent 
                  ? 'Check your inbox and click the verification link to activate your account.'
                  : 'Verify your email to unlock all features and secure your account.'
                }
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            {!emailSent && (
              <button
                onClick={handleSendVerification}
                disabled={sending}
                className="bg-white text-yellow-600 hover:bg-yellow-50 dark:bg-yellow-900 dark:text-white dark:hover:bg-yellow-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {sending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Send Verification Email
                  </>
                )}
              </button>
            )}
            {emailSent && (
              <div className="bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Email Sent!</span>
              </div>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
