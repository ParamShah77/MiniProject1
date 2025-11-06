import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
