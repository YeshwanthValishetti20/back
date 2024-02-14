const mongoose = require("mongoose");
require("dotenv").config();

MONGODB_URL='mongodb+srv://vikranthpadidam:iYF0p9er7ithjX5y@cluster0.i7qbox7.mongodb.net/playtime?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
