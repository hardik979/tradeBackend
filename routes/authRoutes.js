import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"; // Ensure bcrypt is installed: npm i bcrypt
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register Admin (for initial setup)
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingAdmin = await Admin.findOne({ username });
//     if (existingAdmin) {
//       return res.status(400).json({ error: "Admin already exists" });
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newAdmin = new Admin({ username, password: hashedPassword });
//     await newAdmin.save();

//     res.status(201).json({ message: "Admin registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error registering admin" });
//   }
// });

// Login Admin
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
