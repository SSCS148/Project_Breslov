import React, { useState } from 'react';
import '../stylesmain.css';

const PostsContainer = ({ posts }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (   
  <div className="posts-container">
  {posts.map(post => (
    <div key={post.id} className="post">
      <p>{post.content}</p>
      {post.photo && (
        <img
          src={'https://my-backend-v6iy.onrender.com/uploads/${post.photo}'}
          alt="Post"
          className="thumbnail"
          onClick={() => handleImageClick('https://my-backend-v6iy.onrender.com/uploads/${post.photo}')}
        />
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