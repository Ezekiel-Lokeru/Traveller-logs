// Sidebar.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, MapPinned, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "My Trips", path: "/trips", icon: <MapPinned size={18} /> },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-md dark:bg-gray-900 dark:text-white flex flex-col justify-between">
      <div>
        <div className="px-6 py-5 text-xl font-bold border-b dark:border-gray-700">✈️ TravelLog</div>
        <nav className="flex flex-col gap-1 mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition 
                ${isActive ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition mb-4"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
