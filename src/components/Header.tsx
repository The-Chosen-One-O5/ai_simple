import React from 'react';

const Header = () => {
  return (
    <header className="p-4 border-b border-gray-700 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Shakthinathan AI</h1>
      <div className="flex items-center gap-2">
        <span>Private</span>
        {/* Placeholder for a toggle switch */}
        <div className="w-10 h-5 bg-gray-800 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;