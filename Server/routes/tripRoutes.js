const express = require("express");
const {
  getDashboardStats,
  getUserStats,
  createTrip,
  getAllTrips,
  getUserTrips,
  updateTrip,
  getSingleTrip,
  deleteTrip,
  addDestination,
  updateDestination,
  deleteDestination,
  likeTrip,
  unlikeTrip,
  addComment,
  deleteComment,
} = require("../controllers/tripController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Trip CRUD
router.get('/dashboard/stats', protect, getDashboardStats);
router.get("/stats", protect, getUserStats);
router.post("/", protect, createTrip);
router.get("/public", getAllTrips);
router.get("/my-trips", protect, getUserTrips);
router.get("/:tripId", protect, getSingleTrip);
router.put("/:tripId", protect, updateTrip);
router.delete("/:tripId", protect, deleteTrip);

// Destinations
router.post("/:tripId/destinations", protect, addDestination);
router.put("/:tripId/destinations/:destinationId", protect, updateDestination);
router.delete("/:tripId/destinations/:destinationId", protect, deleteDestination);

// Likes
router.post("/:tripId/like", protect, likeTrip);
router.post("/:tripId/unlike", protect, unlikeTrip);

// Comments
router.post("/:tripId/comments", protect, addComment);
router.delete("/:tripId/comments/:commentId", protect, deleteComment);

module.exports = router;
