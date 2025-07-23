import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import TripForm from "../components/TripForm";

const TripPage = () => {
  const [trips, setTrips] = useState([]);
  const [view, setView] = useState("public"); // 'public' or 'my'
  const [showModal, setShowModal] = useState(false);

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

        <div className="flex space-x-2">
          {view === "my" && (
            <button
              className="bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => setShowModal(true)}
            >
              + Add Trip
            </button>
          )}
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded"
            onClick={() => setView(view === "my" ? "public" : "my")}
          >
            {view === "my" ? "View Public Trips" : "View My Trips"}
          </button>
        </div>
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
         By {trip.user?.username || "Unknown"}
         </p>
        </Link>
        ))}

      </div>

      {/* Modal for Create Trip Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Trip</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <TripForm
              onSuccess={(newTrip) => {
                setTrips([newTrip, ...trips]);
              }}
              onClose={() => setShowModal(false)}
              redirectOnSuccess={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPage;
