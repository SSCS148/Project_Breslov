import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentsSection from './CommentsSection';
import PostForm from './PostForm';
import PostsContainer from './PostsContainer';
import '../stylesmain.css';
import logo from '../assets/פסים-צבעוני-חדש.jpeg'; // Assurez-vous que le chemin est correct

import likouteyMoharanPdf from '../assets/likoutey-moharan.pdf';
import meshivatNefeshPdf from '../assets/meshivat-nefesh.pdf';
import sihotHaranPdf from '../assets/sihot-haran.pdf';
import likouteyEtsotPdf from '../assets/likoutey-etsot.pdf';
import seferHamidotPdf from '../assets/sefer-hamidot.pdf';
import sipoureiMaasiotPdf from '../assets/sipourei-maasiot.pdf';
import tikunHaklaliPdf from '../assets/tikun-haklali.pdf';
import hayeMoharanImg from '../assets/haye-moharan.jpeg'; // Nouvelle importation
import likouteyTefilotImg from '../assets/likoutey-tefilot.jpeg';
import yemeMoharanatImg from '../assets/yeme-moharanat.jpeg'; // Nouvelle importation

import likouteyMoharanImg from '../assets/likoutey-moharan.jpeg';
import meshivatNefeshImg from '../assets/meshivat-nefesh.jpeg';
import sihotHaranImg from '../assets/sihot-haran.jpeg';
import likouteyEtsotImg from '../assets/likoutey-etsot.jpeg';
import seferHamidotImg from '../assets/sefer-hamidot.jpeg';
import sipoureiMaasiotImg from '../assets/sipourei-maasiot.jpeg';
import tikunHaklaliImg from '../assets/tikun-haklali.jpeg';
import genericBookImg from '../assets/generic-book.jpeg';
import hayeMoharanPdf from '../assets/haye-moharan.pdf'; // Nouvelle importation
import likouteyTefilotPdf from '../assets/likoutey-tefilot.pdf';
import yemeMoharanatPdf from '../assets/yeme-moharanat.pdf'; // Nouvelle importation

const MainPage = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [showTeachings, setShowTeachings] = useState(false);
  const [showStories, setShowStories] = useState(false);

  const handleCommentPosted = (comment) => {
    setNewComment(comment);
  };

  const handlePostCreated = (post) => {
    setNewPost(post);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://my-backend-v6iy.onrender.com/api/comments');
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
        const response = await fetch('https://my-backend-v6iy.onrender.com/api/posts');
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

  const toggleTeachings = () => {
    setShowTeachings(!showTeachings);
  };

  const toggleStories = () => {
    setShowStories(!showStories);
  };

return (
    <Router>
      <div>
        <header>
          <h1>Rabbi Nahman and Breslev Hasidism</h1>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
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
          <Routes>
            <Route path="/" element={
              <>
                <section id="biography">
                  <h2>Biography of Rabbi Nahman</h2>
                  <p>Rabbi Nahman of Breslev was a great Hasidic master who lived from 1772 to 1810...</p>
                </section>
                <section id="teachings">
                  <h2 onClick={toggleTeachings} style={{ cursor: 'pointer' }}>Teachings of Rabbi Nahman</h2>
                  <div className={`book-container ${showTeachings ? 'expanded' : ''}`}>
                    <div className="book">
                      <a href={likouteyMoharanPdf} target="_blank" rel="noopener noreferrer">
                        <img src={likouteyMoharanImg} alt="Likoutey Moharan" />
                      </a>
                      <p>Likoutey Moharan</p>
                    </div>
                    <div className="book">
                      <a href={seferHamidotPdf} target="_blank" rel="noopener noreferrer">
                        <img src={seferHamidotImg} alt="Sefer Hamidot" />
                      </a>
                      <p>Sefer Hamidot</p>
                    </div>
                    <div className="book">
                      <a href={sihotHaranPdf} target="_blank" rel="noopener noreferrer">
                        <img src={sihotHaranImg} alt="Sihot Haran" />
                      </a>
                      <p>Sihot Haran</p>
                    </div>
                    <div className="book">
                      <a href={meshivatNefeshPdf} target="_blank" rel="noopener noreferrer">
                        <img src={meshivatNefeshImg} alt="Meshivat Nefesh" />
                      </a>
                      <p>Meshivat Nefesh</p>
                    </div>
                    <div className="book">
                      <a href={likouteyEtsotPdf} target="_blank" rel="noopener noreferrer">
                        <img src={likouteyEtsotImg} alt="Likoutey Etsot" />
                      </a>
                      <p>Likoutey Etsot</p>
                    </div>
                    <div className="book">
                      <a href={tikunHaklaliPdf} target="_blank" rel="noopener noreferrer">
                        <img src={tikunHaklaliImg} alt="Tikun Haklali" />
                      </a>
                      <p>Tikun Haklali</p>
                    </div>
                    <div className="book">
                      <a href={likouteyTefilotPdf} target="_blank" rel="noopener noreferrer">
                        <img src={likouteyTefilotImg} alt="Likoutey Tefilot" />
                      </a>
                      <p>Likoutey Tefilot</p>
                    </div>
                  </div>
                </section>
                <section id="stories">
                  <h2 onClick={toggleStories} style={{ cursor: 'pointer' }}>Stories and Legends</h2>
                  <div className={`book-container ${showStories ? 'expanded' : ''}`}>
                    <div className="book">
                      <a href={sipoureiMaasiotPdf} target="_blank" rel="noopener noreferrer">
                        <img src={sipoureiMaasiotImg} alt="Sipourei Maasiot" />
                      </a>
                      <p>Sipourei Maasiot</p>
                    </div>
                    <div className="book">
                      <a href={hayeMoharanPdf} target="_blank" rel="noopener noreferrer">
                        <img src={hayeMoharanImg} alt="Haye Moharan" />
                      </a>
                      <p>Haye Moharan</p>
                    </div>
                    <div className="book">
                      <a href={yemeMoharanatPdf} target="_blank" rel="noopener noreferrer">
                        <img src={yemeMoharanatImg} alt="Yeme Moharanat" />
                      </a>
                      <p>Yeme Moharanat</p>
                    </div>
                  </div>
                </section>
                <section id="principles">
                  <h2>Principles of Breslev Hasidism</h2>
                  <p>Breslev Hasidism focuses on simplicity, sincerity, and joy...</p>
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
                  <h2>Chat <div className="live">Live</div></h2>
                  <PostsContainer posts={posts} />
                </section>
              </>
            } />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Rabbi Nahman and Breslev Hasidism. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default MainPage;