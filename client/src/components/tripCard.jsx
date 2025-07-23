import { Card, CardContent } from "../components/card";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trips/${trip._id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden"
    >
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
