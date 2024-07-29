import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentPosted }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://my-backend-v6iy.onrender.com/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({ comment, postId : 96 }), // Assurez-vous d'avoir un postId valide
            });
    
            if (response.ok) {
                const data = await response.json();
                setComment('');
                onCommentPosted(data);
            } else {
                const errorData = await response.json();
                console.error('Error posting comment:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea placeholder="What do you think of our website ?" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
                </div>
                <button type="submit">Post Comment</button>
            </form>
        </div>
    );
};

export default CommentForm;