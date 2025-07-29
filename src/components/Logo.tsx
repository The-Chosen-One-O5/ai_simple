import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 blur-xl opacity-30 -z-10"></div>
      </div>
      
      {/* Brand Text */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold text-gradient tracking-tight">
          Shakthinathan AI
        </h1>
        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
          Your intelligent assistant powered by advanced AI models
        </p>
      </div>

      {/* Feature highlights */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex items-center space-x-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border-light)] rounded-full">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm text-[var(--text-primary)]">Smart Conversations</span>
        </div>
        
        <div className="flex items-center space-x-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border-light)] rounded-full">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-[var(--text-primary)]">Image Generation</span>
        </div>
        
        <div className="flex items-center space-x-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border-light)] rounded-full">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="text-sm text-[var(--text-primary)]">Multiple Models</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;