import React from 'react';

const Header = () => {
  return (
    <header className="w-full flex justify-end items-center p-6">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <svg 
          className="w-4 h-4" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
            clipRule="evenodd" 
          />
        </svg>
        <span>Private</span>
      </div>
    </header>
  );
};

export default Header;