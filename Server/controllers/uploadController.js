const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

// Make sure you've already configured cloudinary in your config
console.log("Cloudinary ENV:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "loaded" : "missing",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload user avatar
// @route   POST /api/upload/avatar
// @access  Private
const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.files.image;

  if (!file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "avatars",
  });

  // Update user avatar URL
  const user = await User.findById(req.user.id);
  user.avatar = result.secure_url;
  await user.save();

  res.json({ avatar: user.avatar });
});

module.exports = {
  uploadAvatar,
};
