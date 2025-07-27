import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-16 bg-gray-900 p-4 flex flex-col items-center">
      <div className="mb-8">
        {/* Placeholder for Logo */}
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>
      <nav className="flex flex-col gap-4">
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg"
          onClick={() => window.location.reload()}
        >
          {/* Placeholder for New Chat Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg"
          onClick={() => {
            localStorage.removeItem('chatHistory');
            window.location.reload();
          }}
        >
          {/* Placeholder for Clear History Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;