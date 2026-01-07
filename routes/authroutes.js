const express = require("express");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* VIEW ALL USERS */
router.get("/profile", async (req, res) => {
  try {
    const users = await User.find(); // get all users
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGOUT - Dummy example */
router.post("/logout", (req, res) => {
  // Frontend should remove any stored login info
  res.json({ message: "Logout successful" });
});


module.exports = router;
