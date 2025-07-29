import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-center items-center p-6 border-b border-[var(--border-light)] bg-[var(--surface)] backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gradient">Shakthinathan AI</h1>
      </div>
    </header>
  );
};

export default Header;