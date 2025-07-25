import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Map, Menu } from "lucide-react";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden p-4 bg-white shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">🌍 TripLog</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-md transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-8 hidden md:block">
            🌍 TripLog
          </h2>

          <nav className="space-y-4">
            <Link
              to="/dashboard/trips"
              className="flex items-center gap-3 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Map className="w-5 h-5" />
              My Trips
            </Link>

            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-5 h-5" />
              Profile
            </Link>

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 text-gray-700 hover:text-red-600 font-medium w-full"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Backdrop on mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
