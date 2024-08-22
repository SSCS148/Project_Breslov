const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');

// Controller for creating a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const photo = req.file ? req.file.filename : null;
    const userId = req.user.id;

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

// Controller for fetching all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};

// Controller to delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Find the post
    const post = await Post.findOne({ where: { id: postId, userId } });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or you do not have permission to delete this post' });
    }

    // Check if the post has a photo
    if (post.photo) {
      // Define the path to the photo
      const photoPath = path.join(__dirname, '../uploads', post.photo);

      // Delete the photo file
      fs.unlink(photoPath, (err) => {
        if (err) {
          console.error('Error deleting photo:', err);
        }
      });
    }

    // Delete the post from the database
    await post.destroy();
    res.status(200).json({ message: 'Post and photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post', error });
  }
};
