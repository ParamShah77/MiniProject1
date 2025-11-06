import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Upload, History, FileText, BookOpen, Target, Settings } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/upload', label: 'Analyze Resume', icon: Upload },
    { path: '/history', label: 'History', icon: History },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/builder', label: 'Resume Builder', icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/dashboard" className="flex items-center gap-2" onClick={onClose}>
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
                CareerPath360<span className="text-primary-500">.AI</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400'
                        : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

            {/* Additional Links */}
            <div className="space-y-1">
              <Link
                to="/settings"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center">
              © 2025 CareerPath360.AI
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
