const mongoose = require("mongoose");
const Admin = require("../models/adminModel");
require("dotenv").config();

const jwt = require("jsonwebtoken");

JWT_SECRET='yeshmodel';

const adminLogin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const admin = await Admin.findOne({ userId });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (password === admin.password) {
      // Create a JWT token
      const token = jwt.sign(
        {
          userId: admin.userId,
          role: admin.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" } // Set the expiration time
      );

      res.json({
        message: "Admin login successful",
        role: admin.role,
        isAdmin: true, // Include isAdmin status in the response
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  adminLogin,
};
