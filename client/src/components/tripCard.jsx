import { Card, CardContent } from "../components/card";
import { Calendar, MapPin, Pencil } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip, showEdit = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trips/${trip._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // prevent card click
    navigate(`/trips/${trip._id}/edit`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative"
    >
      {/* Edit button in top-right corner */}
      {showEdit && (
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 bg-white text-blue-600 p-1 rounded-full shadow hover:bg-blue-50"
          title="Edit Trip"
        >
          <Pencil className="w-4 h-4" />
        </button>
      )}

      {trip.images?.length > 0 ? (
        <img
          src={trip.images[0]}
          alt={trip.title}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-500">
          No image
        </div>
      )}

      <CardContent className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{trip.title}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {trip.destination}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {format(new Date(trip.startDate), "MMM d, yyyy")} –{" "}
          {format(new Date(trip.endDate), "MMM d, yyyy")}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
