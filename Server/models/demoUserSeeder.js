// demoUsersSeeder.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path

const demoUsers = [
  {
    firstName: 'Demo',
    lastName: 'User1',
    email: 'user1@travelog.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    firstName: 'Demo',
    lastName: 'User2',
    email: 'user2@travelog.com',
    password: bcrypt.hashSync('password123', 10),
  },
];

const seedDemoUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({ email: /demo/ }); // Optional: clean up old demos
    await User.insertMany(demoUsers);
    console.log('Demo users added');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDemoUsers();
