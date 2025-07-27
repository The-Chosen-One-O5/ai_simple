import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Logo Icon */}
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
        <svg
          className="w-10 h-10 text-black"
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
      
      {/* Brand Text */}
      <h1 className="text-4xl font-bold text-white tracking-tighter">
        Shakthinathan AI
      </h1>
    </div>
  );
};

export default Logo;