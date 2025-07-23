import TripForm from "../components/TripForm";

const CreateTripPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create New Trip</h1>
      <TripForm />
    </div>
  );
};

export default CreateTripPage;
