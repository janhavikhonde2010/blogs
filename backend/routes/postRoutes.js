const express = require("express");
const Post = require("../models/PostModel"); // Ensure this model exists

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newPost = new Post({ title, description, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Could not create post" });
  }
});

module.exports = router;
