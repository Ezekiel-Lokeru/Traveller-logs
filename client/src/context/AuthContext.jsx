/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ New

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ⬅️ Done loading whether or not there's a user
  }, []);

  const login = (data) => {
    const { user: userData, token } = data;
    setUser(userData);
    Cookies.set("token", token);
    Cookies.set("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
  };

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
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
