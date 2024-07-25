const Post = require('../models/Post');
const io = require('../server'); // Importer l'instance io

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const userId = req.user.id;

    const newPost = await Post.create({
      content,
      photo,
      userId,
    });

    io.emit('newPost', newPost); // Émettre l'événement de nouveau post

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};
