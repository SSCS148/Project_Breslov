import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://my-backend-v6iy.onrender.com');

const CommentsSection = ({ postId, newComment }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await fetch(`https://my-backend-v6iy.onrender.com/api/comments?postId=${postId}`);
                if (response.ok) {
                    const data = await response.json();
                    setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                } else {
                    console.error('Error fetching comments:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        loadComments();

        socket.on('new-comment', (comment) => {
            if (Object.keys(comment).length > 0) {
                setComments(prevComments => [comment, ...prevComments]);
            } else {
                loadComments(); // Charger les commentaires si le message est vide
            }
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
    return (
        <div>
            <h2>Comments</h2>
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
