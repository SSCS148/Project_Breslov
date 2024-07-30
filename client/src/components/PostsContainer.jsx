import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import PostForm from './PostForm';

const socket = io('https://my-backend-v6iy.onrender.com');

const PostsContainer = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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

    useEffect(() => {
        fetchPosts();

        socket.on('new-post', (post) => {
            setPosts(prevPosts => [post, ...prevPosts]);
        });

        return () => {
            socket.off('new-post');
        };
    }, [newPost]);

    const handlePostCreated = (post) => {
        setNewPost(post);
    };

    const handleCommentPosted = (comment) => {
        setNewComment(comment);
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="posts-container">
            <PostForm onPostCreated={handlePostCreated} />
            <button onClick={fetchPosts}>Refresh Posts</button>
            {posts.length === 0 && <p>Please refresh the chat to see new posts.</p>}
            {posts.map(post => (
                <div key={post.id} className="post">
                    <p>{post.content}</p>
                    {post.photo && (
                        <div>
                            <img
                                src={`https://my-backend-v6iy.onrender.com/uploads/${post.photo}`}
                                alt="Post"
                                className="thumbnail"
                                onClick={() => handleImageClick(`https://my-backend-v6iy.onrender.com/uploads/${post.photo}`)}
                            />
                            <p>{`https://my-backend-v6iy.onrender.com/uploads/${post.photo}`}</p> {/* Log URL for debugging */}
                        </div>
                    )}
                </div>
            ))}
            {selectedImage && (
                <div className="modal" onClick={handleCloseModal}>
                    <span className="close">&times;</span>
                    <img className="modal-content" src={selectedImage} alt="Enlarged" />
                </div>
            )}
        </div>
    );
};

export default PostsContainer;
