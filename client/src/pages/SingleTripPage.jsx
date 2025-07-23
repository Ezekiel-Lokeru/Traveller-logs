import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const SingleTripPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (error) {
        console.error("Fetch trip error:", error);
      }
    };
    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await api.delete(`/trips/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/trips");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete trip");
    }
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{trip.title}</h2>
      <p className="mb-2">{trip.description}</p>
      <p>Destination: {trip.destination}</p>
      <p>Start: {trip.startDate?.substring(0, 10)}</p>
      <p>End: {trip.endDate?.substring(0, 10)}</p>
      <p className="text-sm text-gray-500">
        By {trip?.user?.username || "Unknown User"}
      </p>

      {user && trip?.user && user._id === trip.user._id && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => navigate(`/edit-trip/${trip._id}`)}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleTripPage;
