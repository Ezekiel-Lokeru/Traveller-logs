const Trip = require("../models/Trip");
const User = require("../models/User");


const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTrips = await Trip.countDocuments({ user: userId });
    const upcomingTrips = await Trip.countDocuments({
      user: userId,
      date: { $gte: new Date() }
    });

    res.json({ totalTrips, upcomingTrips });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Trip.find({ userId });

    const totalTrips = trips.length;
    const uniqueCountries = new Set(trips.map((trip) => trip.country)).size;

    res.json({ trips: totalTrips, countries: uniqueCountries });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};

const createTrip = async (req, res) => {
  try {
    const {
      title,
      description,
      country,
      destination,
      startDate,
      endDate,
      isPublic
    } = req.body;

    const newTrip = new Trip({
      user: req.user._id, 
      title,
      description,
      country,
      destination,
      startDate,
      endDate,
      isPublic,
      images: [], // Set this to [] or handle uploaded files via multer
      destinations: [],
      likes: [],
      comments: [],
    });

    await newTrip.save();

    res.status(201).json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.error("Create Trip Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ isPublic: true }).populate("userId", "username");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id }).populate("user", "username email");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};


const getSingleTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).populate("user", "username email");
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.tripId, req.body, { new: true });
    res.status(200).json({ message: "Trip updated successfully", trip: updatedTrip });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await trip.deleteOne();
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addDestination = async (req, res) => {
  try {
    const { locationName, coordinates, activities, notes, images } = req.body;
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const newDestination = {
      locationName,
      coordinates,
      activities,
      notes,
      images,
    };

    trip.destinations.push(newDestination);
    await trip.save();

    res.status(201).json({ message: "Destination added successfully", destination: newDestination });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const destination = trip.destinations.id(req.params.destinationId);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    Object.assign(destination, req.body);
    await trip.save();

    res.status(200).json({ message: "Destination updated successfully", destination });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    if (trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    trip.destinations.id(req.params.destinationId).remove();
    await trip.save();

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const likeTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (!trip.likes.includes(req.user.id)) {
      trip.likes.push(req.user.id);
      await trip.save();
      return res.status(200).json({ message: "Trip liked successfully", likesCount: trip.likes.length });
    } else {
      return res.status(400).json({ message: "Already liked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const unlikeTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.likes.includes(req.user.id)) {
      trip.likes.pull(req.user.id);
      await trip.save();
      return res.status(200).json({ message: "Trip unliked successfully", likesCount: trip.likes.length });
    } else {
      return res.status(400).json({ message: "You have not liked this trip" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const newComment = {
      userId: req.user.id,
      username: req.user.username,
      text,
    };

    trip.comments.push(newComment);
    await trip.save();

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const comment = trip.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.id && trip.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.remove();
    await trip.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getUserStats,
  createTrip,
  getAllTrips,
  getUserTrips,
  getSingleTrip,
  updateTrip,
  deleteTrip,
  addDestination,
  updateDestination,
  deleteDestination,
  likeTrip,
  unlikeTrip,
  addComment,
  deleteComment,
};
