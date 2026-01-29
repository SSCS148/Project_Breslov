import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import config from '../config';

const CommentsSection = ({ postId, newComment }) => {
    const [comments, setComments] = useState([]);
    const socketRef = useRef(null);

    const loadComments = async () => {
        try {
            const response = await fetch(`${config.endpoints.comments}?postId=${postId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        loadComments();

        const token = localStorage.getItem('token');
        socketRef.current = io(config.apiUrl, {
            auth: { token }
        });

        socketRef.current.on('new-comment', (comment) => {
            setComments(prevComments => [comment, ...prevComments]);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off('new-comment');
                socketRef.current.disconnect();
            }
        };
    }, [postId]);

    useEffect(() => {
        if (newComment) {
            setComments(prevComments => [newComment, ...prevComments]);
        }
    }, [newComment]);

    // Handle liking a comment
    const likeComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${config.endpoints.comments}/like`, {
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
            const response = await fetch(`${config.endpoints.comments}/unlike`, {
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
            const response = await fetch(`${config.endpoints.comments}/${commentId}`, {
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
