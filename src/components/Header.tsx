import React from 'react';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <div />
      <h1 className="text-2xl font-bold">SHAKTHINATHAN AI</h1>
      <div className="flex items-center gap-2">
        <span>Private</span>
        <div className="w-10 h-5 bg-gray-800 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;