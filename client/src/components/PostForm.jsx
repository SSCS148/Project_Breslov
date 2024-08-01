import React, { useState } from 'react';

// PostForm component allows users to create new posts with optional photo
const PostForm = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);

    // Handle form submission to create a new post
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', content);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://my-backend-v6iy.onrender.com/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setContent('');
                setPhoto(null);
                onPostCreated(data); // Callback to update parent component with new post
            } else {
                console.error('Error posting message:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </div>
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;
