import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // or your deployed backend URL
  withCredentials: true, // optional: for cookie-based auth
});

// Attach token to every request (if using Bearer token auth)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
