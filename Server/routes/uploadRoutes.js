const express = require("express");
const { uploadAvatar } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const fileUpload = require("express-fileupload");

const router = express.Router();

// Use fileUpload middleware
router.use(fileUpload({ useTempFiles: true }));

router.post("/avatar", protect, uploadAvatar);

module.exports = router;
