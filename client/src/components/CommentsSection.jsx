import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Initialize socket connection
const socket = io('https://my-backend-v6iy.onrender.com');

// CommentsSection component displays and handles interactions with comments
const CommentsSection = ({ postId, newComment }) => {
    const [comments, setComments] = useState([]);

    // Load comments for a specific post
    const loadComments = async () => {
        try {
            const response = await fetch(`https://my-backend-v6iy.onrender.com/api/comments?postId=${postId}`);
            if (response.ok) {
                const data = await response.json();
                // Sort comments by creation date
                setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } else {
                console.error('Error fetching comments:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Load comments when component mounts or postId changes
    useEffect(() => {
        loadComments();

        // Listen for new comments via socket
        socket.on('new-comment', (comment) => {
            setComments(prevComments => [comment, ...prevComments]);
        });

        // Cleanup socket connection
        return () => {
            socket.off('new-comment');
        };
    }, [postId]);

    // Add new comment to the state when it is received
    useEffect(() => {
        if (newComment) {
            setComments(prevComments => [newComment, ...prevComments]);
        }
    }, [newComment]);

    // Handle liking a comment
    const likeComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://my-backend-v6iy.onrender.com/api/comments/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ commentId }),
            });
            if (response.ok) {
                const updatedComment = await response.json();
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === updatedComment.id ? updatedComment : comment
                    )
                );
            } else {
                console.error('Error liking comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle unliking a comment
    const unlikeComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://my-backend-v6iy.onrender.com/api/comments/unlike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ commentId }),
            });
            if (response.ok) {
                const updatedComment = await response.json();
                setComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === updatedComment.id ? updatedComment : comment
                    )
                );
            } else {
                console.error('Error unliking comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle deleting a comment
    const deleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://my-backend-v6iy.onrender.com/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            });

            if (response.ok) {
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            } else {
                console.error('Error deleting comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <button onClick={loadComments}>Refresh the Comments</button>
            <div id="commentsSection">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-container">
                        <p>{comment.comment}</p>
                        <div className="like-container">
                            <p>
                                Likes: <span id={`likeCount-${comment.id}`}>{comment.likes}</span>
                            </p>
                            <button onClick={() => likeComment(comment.id)}>Like</button>
                            <button className="unlike-button" onClick={() => unlikeComment(comment.id)}>Unlike</button> {/* Ajout du bouton Unlike */}
                            <button className="delete-button" onClick={() => deleteComment(comment.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
