import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', content);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://my-backend-v6iy.onrender.com/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            onPostCreated(response.data);
            setContent('');
            setPhoto(null);
        } catch (error) {
            console.error('Error posting message:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                />
            </div>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </div>
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;