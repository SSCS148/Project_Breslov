import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';
import CommentsSection from './CommentsSection';

const PostsContainer = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState(null);
    const [newPost, setNewPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://my-backend-v6iy.onrender.com/api/posts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                } else {
                    console.error('Error fetching posts:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPosts();
    }, [newPost]);

    const handlePostCreated = (post) => {
        setNewPost(post);
    };

    const handleCommentPosted = (comment) => {
        setNewComment(comment);
    };

    return (
        <div className="posts-container">
            <PostForm onPostCreated={handlePostCreated} />
            {posts.map(post => (
                <div key={post.id} className="post">
                    <p>{post.content}</p>
                    {post.photo && (
                        <img
                            src={`https://my-backend-v6iy.onrender.com/uploads/${post.photo}`}
                            alt="Post"
                            className="thumbnail"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostsContainer;