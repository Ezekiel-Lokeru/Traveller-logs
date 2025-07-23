// layout/DashboardLayout.jsx
import { useState } from 'react';
import Sidebar from '../components/sidebar';

const dashboardLayout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
            ☰
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default dashboardLayout;
