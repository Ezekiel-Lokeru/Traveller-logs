import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const TripForm = ({
  initialData = null,
  onSuccess,
  onClose,
  redirectOnSuccess = true,
  isEdit = false,
  customOnSubmit = null,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    country: "",
    destination: "",
    startDate: "",
    endDate: "",
    images: [],
  });

  const navigate = useNavigate();

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        country: initialData.country || "",
        destination: initialData.destination || "",
        startDate: initialData.startDate?.slice(0, 10) || "",
        endDate: initialData.endDate?.slice(0, 10) || "",
        images: initialData.images || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (customOnSubmit) {
    return customOnSubmit(form); // Use external handler if provided
  }

  try {
    const endpoint = isEdit
      ? `/trips/${initialData._id}` // <-- for PUT
      : "/trips"; // <-- matches POST /api/trips

    const method = isEdit ? "put" : "post";

    const res = await api[method](endpoint, form);

    if (onSuccess) onSuccess(res.data);
    if (redirectOnSuccess)
      navigate(`/trips/${res.data.trip?._id || res.data._id}`);
    if (onClose) onClose();
  } catch (error) {
    console.error("Trip submit error:", error);
    alert("Failed to submit trip");
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={form.destination}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        name="images"
        multiple
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {isEdit ? "Update Trip" : "Create Trip"}
      </button>
    </form>
  );
};

export default TripForm;
