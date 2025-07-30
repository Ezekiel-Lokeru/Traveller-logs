require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

const seedDemoUsers = async () => {
  try {
    await connectDB();

    // Check if demo user already exists
    const exists = await User.findOne({ email: "user@travelog.com" });
    if (exists) {
      console.log("Demo user already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("password123", 10);
    const demoUser = new User({
      firstName: "Demo",
      lastName: "User",
      username:"User1",
      email: "user@travelog.com",
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await demoUser.save();
    console.log("✅ Demo user created");
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

seedDemoUsers();
