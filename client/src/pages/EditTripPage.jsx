import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TripForm from "../components/TripForm";
import api from "../api/api";

const EditTripPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (error) {
        console.error("Failed to load trip", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  if (loading) return <p>Loading trip...</p>;
  if (!trip) return <p>Trip not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Trip</h1>
      <TripForm initialData={trip} isEdit />
    </div>
  );
};

export default EditTripPage;
