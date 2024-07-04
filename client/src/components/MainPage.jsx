import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentsSection from './CommentsSection';
import PostForm from './PostForm';
import PostsContainer from './PostsContainer';
import '../stylesmain.css';
import logo from '../assets/פסים-צבעוני-חדש.jpeg'; // Assurez-vous que le chemin est correct


const MainPage = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [newPost, setNewPost] = useState(null);

  const handleCommentPosted = (comment) => {
    setNewComment(comment);
  };

  const handlePostCreated = (post) => {
    setNewPost(post);
  };

  useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments`);
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

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`);
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

    fetchComments();
    fetchPosts();
}, []);

  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  }, [newComment]);

  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);

  return (
    <div>
      <header>
        <h1>Rabbi Nahman and Breslov Hasidism</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#biography">Biography</a></li>
          <li><a href="#teachings">Teachings</a></li>
          <li><a href="#stories">Stories</a></li>
          <li><a href="#principles">Principles</a></li>
          <li><a href="#celebrations">Celebrations</a></li>
          <li><a href="#communication">Community</a></li>
        </ul>
      </nav>
      <main>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
        <section id="biography">
          <h2>Biography of Rabbi Nahman</h2>
          <p>Rabbi Nahman of Breslov was a great Hasidic master who lived from 1772 to 1810...</p>
        </section>
        <section id="teachings">
          <h2>Teachings of Rabbi Nahman</h2>
          <p>Rabbi Nahman taught the importance of prayer, joy, and trust in God...</p>
        </section>
        <section id="stories">
          <h2>Stories and Legends</h2>
          <p>There are many stories and legends about the miracles performed by Rabbi Nahman...</p>
        </section>
        <section id="principles">
          <h2>Principles of Breslov Hasidism</h2>
          <p>Breslov Hasidism focuses on simplicity, sincerity, and joy...</p>
        </section>
        <section id="celebrations">
          <h2>Celebrations and Pilgrimages</h2>
          <p>Every year, thousands of people travel to Uman for Rosh Hashanah...</p>
        </section>
        <section id="comments">
          <CommentForm onCommentPosted={handleCommentPosted} />
          <CommentsSection newComment={newComment} comments={comments} setComments={setComments} />
        </section>
        <section id="communication">
          <h2>Chat <div className="live">Live</div> {/* Logo "Live" */}</h2>
          <PostForm onPostCreated={handlePostCreated} />
          <PostsContainer posts={posts} />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Rabbi Nahman and Breslov Hasidism. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;