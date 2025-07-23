import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TripForm from "../components/TripForm";
import api from "../api/api";

const EditTripPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setInitialData(res.data.trip);
      } catch (err) {
        console.error("Failed to fetch trip:", err);
      }
    };
    fetchTrip();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Trip</h2>
      {initialData ? (
        <TripForm
          isEdit
          initialData={initialData}
          redirectOnSuccess={true}
        />
      ) : (
        <p>Loading trip details...</p>
      )}
    </div>
  );
};

export default EditTripPage;
