const Comment = require('../models/Comment');
const io = require('../server'); // Importer l'instance io

exports.createComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const userId = req.user.id;

    if (!comment || !postId) {
      return res.status(400).json({ error: "Comment and postId are required" });
    }

    const newComment = await Comment.create({
      comment,
      postId,
      userId,
    });

    io.emit('newComment', newComment); // Émettre l'événement de nouveau commentaire

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};


exports.likeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.likes += 1;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error liking comment" });
  }
};
