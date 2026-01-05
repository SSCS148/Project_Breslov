import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import config from '../config';
import PostForm from './PostForm';

// Initialize socket connection with authentication
const token = localStorage.getItem('token');
const socket = io(config.apiUrl, {
    auth: {
        token: token
    }
});

// PostsContainer component handles displaying posts and real-time updates
const PostsContainer = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState(null);
    const [newPost, setNewPost] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch posts from API
    const fetchPosts = async () => {
        try {
            const response = await fetch(config.endpoints.posts);
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

    // Load posts when component mounts
    useEffect(() => {
        fetchPosts();

        // Listen for new posts via socket
        socket.on('new-post', (post) => {
            setPosts(prevPosts => [post, ...prevPosts]);
        });

        // Cleanup socket connection
        return () => {
            socket.off('new-post');
        };
    }, [newPost]);

    // Callback to update state with new post
    const handlePostCreated = (post) => {
        setNewPost(post);
    };

    // Callback to update state with new comment
    const handleCommentPosted = (comment) => {
        setNewComment(comment);
    };

    // Handle image click to show in a modal
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    // Close the image modal
    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    // Function to like post
    const likePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.endpoints.posts}/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchPosts();
            } else {
                console.error('Failed to like post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to unlike post
    const unlikePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.endpoints.posts}/${postId}/unlike`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchPosts();
            } else {
                console.error('Failed to unlike post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.endpoints.posts}/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="posts-container">
            <PostForm onPostCreated={handlePostCreated} />
            <button onClick={fetchPosts}>Refresh Posts</button>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <p>{post.content}</p>
                    <p>Likes: {post.likesCount}</p>
                    {post.photo && (
                        <img
                            src={`${config.endpoints.uploads}/${post.photo}`}
                            alt="Post"
                            className="thumbnail"
                            onClick={() => handleImageClick(`${config.endpoints.uploads}/${post.photo}`)}
                        />
                    )}
                    <div className="button-container">
                        <button className="like-button" onClick={() => likePost(post.id)}>Like</button>
                        <button className="unlike-button" onClick={() => unlikePost(post.id)}>Unlike</button>
                        <button className="delete-button" onClick={() => deletePost(post.id)}>Supprimer</button>
                    </div>
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
