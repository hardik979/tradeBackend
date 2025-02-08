import express from "express";
import FormData from "../models/formData.js";

const router = express.Router();

// Public form submission route
router.post("/", async (req, res) => {
  try {
    const { name, email, number, hasDematAccount, fund } = req.body;
    const newFormData = new FormData({
      name,
      email,
      number,
      hasDematAccount,
      fund,
    });

    await newFormData.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error submitting form data" });
  }
});

export default router;
