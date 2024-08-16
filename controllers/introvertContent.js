const express = require("express");
const IntrovertContent = require("../models/introvertContent");
const IntrovertUsers = require("../models/introvertUsers");
const router = express.Router();

// CONTENT

// Get all content
router.get("/", async (req, res) => {
  try {
    const content = await IntrovertContent.find({ public: true });
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific content by ID
router.get("/:id", async (req, res) => {
  try {
    const content = await IntrovertContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all content belonging to specific user
router.get("/:author", async (req, res) => {
  try {
    const content = await IntrovertContent.find({
      author: req.params.author,
      public: true,
    });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all content belonging to you
router.get("/author", async (req, res) => {
  try {
    const { displayName } = req.body;
    const content = await IntrovertContent.find({
      author: displayName,
    });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new content
// confirm author is logged in
router.post("/", async (req, res) => {
  try {
    const { title, content, public, email } = req.body;

    const author = await IntrovertUsers.findOne({ email: email });
    if (!author) {
      return res
        .status(401)
        .json({ message: "You must be a registered member to post content" });
    }
    const newContent = new IntrovertContent({
      title,
      content,
      public,
      author: author.displayName,
    });
    await newContent.save();
    res.status(201).json({ content: newContent, user: author });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update content
router.patch("/update", async (req, res) => {
  try {
    const { title, email, content, public } = req.body;
    const user = await IntrovertUsers.findOne({ email: email });
    const contentToEdit = await IntrovertContent.findOne({
      author: user.displayName,
      title: title,
    });

    if (contentToEdit) {
      await IntrovertContent.findByIdAndUpdate(
        contentToEdit._id,
        { public, content },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ content: contentToEdit });
    } else {
      return res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Content
router.delete("/delete", async (req, res) => {
  try {
    const { title, email } = req.body;
    const author = await IntrovertUsers.findOne({ email: email });
    const content = await IntrovertContent.findOne({
      title: title,
      author: author.displayName,
    });
    if (content) {
      await IntrovertContent.findByIdAndDelete(content._id);
      res.status(204).json({ message: "Content deleted" });
    } else {
      return res.status(404).json({ message: "Content not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Content not found" });
  }
});

module.exports = router;
