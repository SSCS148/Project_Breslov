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

// Controller for liking a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findByPk(postId);
    if (post) {
      post.likes += 1;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post', error });
  }
};

// Controller for deleting a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.destroy();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post', error });
  }
};
