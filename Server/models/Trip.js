const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    activities: [String],
    notes: String,
    images: [String],
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: String,
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    startDate: Date,
    endDate: Date,
    isPublic: {
      type: Boolean,
      default: true,
    },
    destination: String,
    images: [String],
    country: {
      type: String,
      required: true,
    },
    destinations: [DestinationSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
