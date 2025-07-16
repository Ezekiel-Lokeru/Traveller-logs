import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold">Traveller Logs</div>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to={user?._id ? `/profile/${user._id}` : "#"}>Profile</Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
