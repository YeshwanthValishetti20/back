// middleware/authenticateAdmin.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || "your_default_secret_key";

const authenticateAdmin = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const admin = await Admin.findOne({ userId: decoded.userId });

    if (!admin) {
      return res.status(401).json({ error: "Unauthorized - Admin not found" });
    }

    // Attach the admin object to the request for later use
    req.admin = admin;

    next();
  } catch (error) {
    console.error("Error during admin authentication:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticateAdmin;
