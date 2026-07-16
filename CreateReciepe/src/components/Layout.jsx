import React from 'react';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar />
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
};

export default Layout;
