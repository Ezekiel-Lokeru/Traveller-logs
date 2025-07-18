import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const EditTripPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Fetch trip error:", error);
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/trips/${id}`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate(`/trips/${id}`);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update trip");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate?.substring(0, 10)}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate?.substring(0, 10)}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Update Trip
        </button>
      </form>
    </div>
  );
};

export default EditTripPage;
