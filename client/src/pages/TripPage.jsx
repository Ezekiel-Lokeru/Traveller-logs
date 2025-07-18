import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [view, setView] = useState("public"); // 'public' or 'my'

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get(`/trips/${view === "my" ? "my-trips" : "public"}`);
        setTrips(res.data);
      } catch (error) {
        console.error("Fetch trips error:", error);
      }
    };
    fetchTrips();
  }, [view]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {view === "my" ? "My Trips" : "Explore Trips"}
        </h2>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={() => setView(view === "my" ? "public" : "my")}
        >
          {view === "my" ? "View Public Trips" : "View My Trips"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((trip) => (
          <Link
            key={trip._id}
            to={`/trips/${trip._id}`}
            className="border p-4 rounded shadow hover:bg-gray-50"
          >
            <h3 className="text-xl font-semibold">{trip.title}</h3>
            <p>{trip.destination}</p>
            <p className="text-gray-500 text-sm">
              By {trip.userId?.username}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TripsPage;
