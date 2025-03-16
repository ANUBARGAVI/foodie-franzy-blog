
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.static("public")); 

mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

const postSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  image: String,
});

const Post = mongoose.model("Post", postSchema);


const addInitialPost = async () => {
  const count = await Post.countDocuments();
  if (count === 0) {
    await Post.create({
      title: "Welcome to Foodie Frenzy!",
      excerpt: "Discover delicious recipes and food stories.",
      content: "This is your first post. Start exploring and sharing your food experiences!",
      image: "/images/summer.jpeg", 
    });
    console.log("Initial post added.");
  }
};
addInitialPost();


app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post." });
  }
});


app.put("/api/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post." });
  }
});


app.delete("/api/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
