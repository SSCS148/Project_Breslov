const Post = require('../models/Post');

exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.likesCount += 1;
        await post.save();

        res.status(200).json({ message: 'Post liked', likesCount: post.likesCount });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Failed to like post', error });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likesCount > 0) {
            post.likesCount -= 1;
            await post.save();
        }

        res.status(200).json({ message: 'Post unliked', likesCount: post.likesCount });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: 'Failed to unlike post', error });
    }
};
