import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { Plane, Globe, Calendar } from "lucide-react";
import { Card, CardContent } from "../components/card";
import TripCard from "../components/tripCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ trips: 0, countries: 0 });
  const [recentTrips, setRecentTrips] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await api.get("/trips/stats");
        setStats(statsRes.data);

        const tripsRes = await api.get("/trips/my-trips");
        setRecentTrips(tripsRes.data.slice(0, 3)); // Last 3 trips

        const upcoming = tripsRes.data.filter((trip) => {
          return new Date(trip.startDate) > new Date();
        });
        setUpcomingTrips(upcoming);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    if (user) fetchData();
  }, [user]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome back, {user.firstName}!
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Trips" value={stats.trips} icon={<Plane size={28} />} />
        <StatCard title="Countries Visited" value={stats.countries} icon={<Globe size={28} />} />
        <StatCard title="Upcoming Trips" value={upcomingTrips.length} icon={<Calendar size={28} />} />
      </div>

      {/* Recent Trips Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Trips</h2>
          <button
            onClick={() => navigate("/trips/my-trips")}
            className="text-blue-600 hover:underline text-sm"
          >
            View all
          </button>
        </div>

        {recentTrips.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTrips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent trips to show.</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Card className="rounded-2xl shadow-md bg-white p-5 flex items-center gap-4">
    <div className="text-blue-600">{icon}</div>
    <div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </Card>
);

export default Dashboard;
