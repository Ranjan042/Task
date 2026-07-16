import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-6 px-10 border-b border-gray-100 bg-primary sticky top-0 z-10">
      <nav className="flex gap-8">
        <a href="#" className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-1">Explore</a>
      </nav>

      <div className="flex items-center gap-6">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search recipes..." 
            className="bg-[#F3EFE9] rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        
        <button className="text-gray-600 hover:text-gray-900 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-primary"></span>
        </button>

        <img 
          src="/profile_picture.png" 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
      </div>
    </header>
  );
};

export default Header;
