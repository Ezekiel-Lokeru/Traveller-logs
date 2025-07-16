import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 Use your backend URL and port
  withCredentials: true, // Optional if using cookies
});

export default api;
