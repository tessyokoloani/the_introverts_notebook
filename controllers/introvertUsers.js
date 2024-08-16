const express = require("express");
const IntrovertUsers = require("../models/introvertUsers");
const router = express.Router();
const bcrypt = require("bcryptjs");
const confirmCookie = require("../middleware/confirmLogin");
const introvertContent = require("../models/introvertContent");

// USERS

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await IntrovertUsers.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await IntrovertUsers.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

//login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await IntrovertUsers.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // const cookieData = { email: email, dateOfBirth: user.dateOfBirth };
    const cookieValue =
      process.env.COOKIESECRET + email + user.dateOfBirth.toDateString();
    res
      .cookie("email", email, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .send("Cookie worked. Logged in successfully");

    // res.cookie({
    //   name: email,
    //   val: cookieValue,
    //   options: { expires: new Date(Date.now() + 900000), httpOnly: true },
    // });
    // console.log();
    // res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//logout
router.get("/logout", confirmCookie, async (req, res) => {
  try {
    // const cookieString =
    // process.env.COOKIESECRET + email + user.dateOfBirth.toDateString();
    res.clearCookie(req.user.val);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create New User
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, displayName, email, password, dateOfBirth } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age < 18) {
      return res.status(400).json({ message: "You must be at least 18 years" });
    }
    const user = new IntrovertUsers({
      name: name,
      displayName: displayName,
      email: email,
      password: hashedPassword,
      dateOfBirth: dateOfBirth,
      age: age,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update User
router.patch("/:id", confirmCookie, async (req, res) => {
  try {
    if (req.body.email === req.user.name.cookieData.email) {
      await IntrovertUsers.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      return res.status(403).json({ message: "Permission Denied" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete User
router.delete("/delete", confirmCookie, async (req, res) => {
  try {
    const user = await IntrovertUsers.find({
      email: req.user.name.cookieData.email,
    });
    const content = await introvertContent.find({ title: req.body.title });

    if (content.author == user._id) {
      await IntrovertUsers.findByIdAndDelete(content._id);
      res.status(204).json({ message: "User deleted" });
    } else {
      res.status(403).json({ message: "Permission Denied" });
    }
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
