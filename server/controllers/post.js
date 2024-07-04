const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newPost = await Post.create({
      content,
      photo,
      userId,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post", error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};
