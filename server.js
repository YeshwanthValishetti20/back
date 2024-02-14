const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const authRoutes = require("./api/routes/authRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "api/uploads")));

// Set up routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
