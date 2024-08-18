const Comment = require("../models/Comment");
const User = require("../models/User");

// Controller for creating a new comment
exports.createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id;

    const newComment = await Comment.create({
      comment,
      userId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
};

// Controller for fetching all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [User],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// Controller for liking a comment
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
