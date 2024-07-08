// controllers/post.js
const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const photo = req.file ? req.file.filename : null;
    const userId = req.user.id;

    // Log the received data for debugging
    console.log('Received content:', content);
    console.log('Received photo:', photo);
    console.log('Received userId:', userId);

    const newPost = await Post.create({
      content,
      photo,
      userId,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};