import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();

  if (user === undefined) return null;
  

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-3xl text-blue-600">
        TravellerLogs
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard/" className="text-xl font-bold hover:text-blue-600">Dashboard</Link>
            <Link to="/trips" className="text-xl font-bold hover:text-blue-600">Trips</Link>
            <Link to="/profile" className="text-xl font-bold hover:text-blue-600">Profile</Link>
            <Link to="/logout" className="text-xl font-bold hover:text-blue-600">Logout</Link>

          </>
        ) : (
          <>
            <Link to="/" className="not-only-of-type:text-xl font-bold hover:text-blue-600">Home</Link>
            <Link to="/register" className="text-xl font-bold hover:text-blue-600">Register</Link>
            <Link to="/login" className="text-xl font-bold hover:text-blue-600">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
