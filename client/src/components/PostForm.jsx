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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, formData, {
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
      <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="content">Message</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
      </div>
      <div className="input-group">
        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" />
      </div>
      <button type="submit">Post</button>
    </form>
  );
};


export default PostForm;