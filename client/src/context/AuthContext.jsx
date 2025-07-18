// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from cookie on initial load
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login method
  const login = (data) => {
    const { user: userData, token } = data;
    setUser(userData);
    Cookies.set("token", token); // for auth headers
    Cookies.set("user", JSON.stringify(userData));
  };

  // Logout method
  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
  };

  // Register method
  const register = async (formData) => {
  const res = await api.post("/auth/register", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);
  return { success: true, user: res.data.user }; 
};


  return (
    <AuthContext.Provider value={{ user,setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
