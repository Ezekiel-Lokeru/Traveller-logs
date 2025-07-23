const tripPreview = ({ trip }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="font-semibold text-lg">{trip.destination}</h3>
      <p className="text-sm text-gray-500">{new Date(trip.date).toLocaleDateString()}</p>
      <p className="text-sm mt-2">{trip.notes?.slice(0, 100)}...</p>
    </div>
  );
};

export default tripPreview;
