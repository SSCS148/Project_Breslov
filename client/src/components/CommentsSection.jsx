import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://my-backend-v6iy.onrender.com');

const CommentsSection = ({ postId, newComment }) => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');

    const loadComments = async () => {
        try {
            const response = await fetch(`https://my-backend-v6iy.onrender.com/api/comments?postId=${postId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                setMessage(''); // Clear the message after refresh
            } else {
                console.error('Error fetching comments:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        loadComments();

        socket.on('new-comment', (comment) => {
            setComments(prevComments => [comment, ...prevComments]);
            setMessage('New comments available. Please refresh the chat.'); // Set the message when a new comment is received
        });

        return () => {
            socket.off('new-comment');
        };
    }, [postId]);

    useEffect(() => {
        if (newComment) {
            setComments(prevComments => [newComment, ...prevComments]);
        }
    }, [newComment]);

    return (
        <div>
            <h2>Comments</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display the message */}
            <button onClick={loadComments}>Refresh comments</button>
            <div id="commentsSection">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-container">
                        <p>{comment.comment}</p>
                        <div className="like-container">
                            <p>
                                Likes: <span id={`likeCount-${comment.id}`}>{comment.likes}</span>
                            </p>
                            <button onClick={() => likeComment(comment.id)}>Like</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
