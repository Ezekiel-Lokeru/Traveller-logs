import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/${userId}`);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          password: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const updatedData = {
        username: formData.username,
        email: formData.email,
      };

      if (formData.password) {
        updatedData.password = formData.password;
      }

      const res = await api.put(`/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUser(res.data); // Update context
      alert("Profile updated!");
      setLoading(false);
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await api.post("/upload/avatar", formData, {
         headers: {
         "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${user.token}`,
        },
      });

    // Update context with new avatar
     setUser({ ...user, avatar: res.data.avatar });
     alert("Avatar updated!");
     } catch (error) {
       console.error("Avatar upload error:", error);
       alert("Failed to upload avatar");
     }
   };


  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <label className="block mb-2">Profile Photo</label>
          {user?.avatar && (
          <img
           src={user.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-2 object-cover"
          />
          )}
           <input
           type="file"
           accept="image/*"
           onChange={handleAvatarUpload}
           className="border p-2 rounded"
           />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
