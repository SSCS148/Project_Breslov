import React, { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentsSection from './CommentsSection';
import PostForm from './PostForm';
import PostsContainer from './PostsContainer';
import '../stylesmain.css';
import logo from '../assets/פסים-צבעוני-חדש.jpeg';

import likouteyMoharanPdf from '../assets/likoutey-moharan.pdf';
import meshivatNefeshPdf from '../assets/meshivat-nefesh.pdf';
import sihotHaranPdf from '../assets/sihot-haran.pdf';
import likouteyEtsotPdf from '../assets/likoutey-etsot.pdf';
import seferHamidotPdf from '../assets/sefer-hamidot.pdf';
import sipoureiMaasiotPdf from '../assets/sipourei-maasiot.pdf';
import tikunHaklaliPdf from '../assets/tikun-haklali.pdf';
import hayeMoharanImg from '../assets/haye-moharan.jpeg'; 
import likouteyTefilotImg from '../assets/likoutey-tefilot.jpeg';
import yemeMoharanatImg from '../assets/yeme-moharanat.jpeg'; 

import likouteyMoharanImg from '../assets/likoutey-moharan.jpeg';
import meshivatNefeshImg from '../assets/meshivat-nefesh.jpeg';
import sihotHaranImg from '../assets/sihot-haran.jpeg';
import likouteyEtsotImg from '../assets/likoutey-etsot.jpeg';
import seferHamidotImg from '../assets/sefer-hamidot.jpeg';
import sipoureiMaasiotImg from '../assets/sipourei-maasiot.jpeg';
import tikunHaklaliImg from '../assets/tikun-haklali.jpeg';
import genericBookImg from '../assets/generic-book.jpeg';
import hayeMoharanPdf from '../assets/haye-moharan.pdf'; 
import likouteyTefilotPdf from '../assets/likoutey-tefilot.pdf';
import yemeMoharanatPdf from '../assets/yeme-moharanat.pdf';

// MainPage component handles displaying various sections and user interactions
const MainPage = () => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [showBiography, setShowBiography] = useState(false); // Toggle Biography section
  const [showTeachings, setShowTeachings] = useState(false); // Toggle Teachings section
  const [showStories, setShowStories] = useState(false); // Toggle Stories section
  const [showComments, setShowComments] = useState(false); // Toggle Comments section
  const [showPrinciples, setShowPrinciples] = useState(false);  // Toggle Principles section
  const [showCelebrations, setShowCelebrations] = useState(false); // Toggle Celebrations section

  // Callback to update state with new comment
  const handleCommentPosted = (comment) => {
    setNewComment(comment);
  };
  // Callback to update state with new post
  const handlePostCreated = (post) => {
    setNewPost(post);
  };
  // Fetch comments from API
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

  // Update comments state when a new comment is received
  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  }, [newComment]);

  // Update posts state when a new post is received
  useEffect(() => {
    if (newPost) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  }, [newPost]);
  
   // Toggle various sections visibility
  const toggleBiography = () => {
    setShowBiography(!showBiography);
  };

  const toggleTeachings = () => {
    setShowTeachings(!showTeachings);
  };

  const toggleStories = () => {
    setShowStories(!showStories);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const togglePrinciples = () => {
    setShowPrinciples(!showPrinciples);
  };

  const toggleCelebrations = () => {
    setShowCelebrations(!showCelebrations);
  };

  return (
    <div>
      <header>
        <h1>Rabbi Nahman and Breslev Hasidism</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#biography" onClick={toggleBiography}>Biography</a></li>
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
          <h2 onClick={toggleBiography} style={{ cursor: 'pointer' }}>Biography of Rabbi Nahman</h2>
          <p>Rabbi Nahman of Breslev was a great Hasidic master who lived from 1772 to 1810...</p>
          <div className={`content-container ${showBiography ? 'expanded' : ''}`}>
          <p><strong>Birth:</strong> Rabbi Nahman was born on April 4, 1772 (18 Nissan 5532) in Medzhybizh, Ukraine, into a family of spiritual nobility. He is the great-grandson of the Baal Shem Tov, the founder of the Hasidic movement.</p>
          <p><strong>Parents:</strong> His father, Simcha, was the son of Rabbi Nachman Horodenker, a close disciple of the Baal Shem Tov. His mother, Feiga, was the daughter of Adil, the daughter of the Baal Shem Tov.</p>
          <p>From a young age, Rabbi Nahman displayed intense piety and spiritual aspiration. He spent hours in prayer and meditation, often in nature, and began practicing forms of austere and intense devotion.</p>
          <h3>Adulthood and Marriage</h3>
          <p><strong>Marriage:</strong> At the age of 13, Rabbi Nahman married Sashia, the daughter of Rabbi Ephraim of Ossatin. The couple settled in the town of Medvedevka.</p>
          <p>Rabbi Nahman spent the early years of his marriage teaching and spreading his ideas. His teachings were distinguished by their mystical depth and practical approach to spirituality.</p>
          <h3>Pilgrimage and Return</h3>
          <p><strong>Journeys:</strong> In 1798, Rabbi Nahman embarked on a journey to the Holy Land, seeking deeper spiritual inspiration. He traveled through Moldova, Turkey, and finally arrived in Israel. This journey strengthened his mystical ideas and spiritual commitment.</p>
          <p><strong>Return to Ukraine:</strong> Upon his return, he settled in Zlatopol, then in Breslov, where he gained many disciples.</p>
          <h3>Teachings and Works</h3>
          <p>Rabbi Nahman is famous for his teachings, which focus on several key themes:</p>
          <ul>
            <li><strong>Faith and Simplicity:</strong> He emphasized the importance of simple and pure faith in God.</li>
            <li><strong>Joy:</strong> He taught that joy is essential in spiritual practice and that despair must be avoided at all costs.</li>
            <li><strong>Hitbodedut:</strong> He advocated a unique form of personal prayer and meditation called hitbodedut, where one speaks to God in private and in one's own terms.</li>
          </ul>
          <p><strong>Main Works:</strong></p>
          <ul>
            <li><strong>Likutei Moharan:</strong> A collection of his teachings.</li>
            <li><strong>Sippurei Maasiot:</strong> A collection of mystical and allegorical tales.</li>
          </ul>
          <h3>Principal Disciples</h3>
          <p>Rabbi Nahman had several devoted disciples who played a crucial role in spreading his teachings:</p>
          <ul>
            <li><strong>Rabbi Nathan of Breslov (1780-1844):</strong> His closest disciple, often considered his spiritual successor. Rabbi Nathan compiled and published Rabbi Nahman's teachings, as well as his own works, including Likutei Halachot.</li>
            <li><strong>Rabbi Aaron Lipkiner:</strong> Known for his dedication and piety.</li>
            <li><strong>Rabbi Naftali of Nemirov:</strong> Another important disciple, known for his profound knowledge of the Torah and commitment to Rabbi Nahman's teachings.</li>
          </ul>
          <h3>Final Years and Death</h3>
          <p><strong>Uman:</strong> In 1810, Rabbi Nahman moved to Uman, where he spent the last months of his life. He chose Uman as the place of his burial, saying that those who came to pray at his grave and recited the ten Psalms of the Tikkun HaKlali would receive his spiritual assistance.</p>
          <p><strong>Death:</strong> Rabbi Nahman passed away on October 16, 1810 (18 Tishri 5571). His tomb in Uman has become an important pilgrimage site, especially during Rosh Hashanah, attracting thousands of devotees each year.</p>
          <h3>Legacy and Influence</h3>
          <p>Since his death, Rabbi Nahman's influence has continued to grow. His teachings continue to inspire many people worldwide. The Breslov community is now one of the most dynamic branches of Hasidic Judaism.</p>
          <ul>
            <li><strong>Modernity:</strong> Rabbi Nahman's teachings are available in many languages, and several institutions, synagogues, and study centers are dedicated to his memory and the dissemination of his ideas.</li>
            <li><strong>Technology and Media:</strong> Websites, mobile apps, and social media platforms daily share his teachings and prayers, allowing millions of people to connect with Breslov spirituality.</li>
            <li><strong>Pilgrimage:</strong> The annual pilgrimage to Uman remains one of the largest Jewish gatherings in the world, drawing devotees from all backgrounds and walks of life.</li>
          </ul>
          <p>Rabbi Nahman of Breslov left a profound and enduring spiritual legacy, offering teachings of faith, joy, and personal connection with God that continue to resonate with people worldwide.</p>
          </div>
        </section>
        <section id="teachings">
          <h2 onClick={toggleTeachings} style={{ cursor: 'pointer' }}>Teachings of Rabbi Nahman</h2>
          <p>Rabbi Nahman taught the importance of prayer, joy, and trust in God...</p>
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
                  <p>Likoutey Tefilot</p>
                </a>
              </div>
          </div>
        </section>
        <section id="principles">
          <h2 onClick={togglePrinciples} style={{ cursor: 'pointer' }}>Principles of Breslev Hasidism</h2>
            <p>Breslev Hasidism focuses on simplicity, sincerity, and joy...</p>
          <div className={`content-container ${showPrinciples ? 'expanded' : ''}`}>
          <p>Breslev Hasidism, founded by Rabbi Nachman of Breslev (1772-1810), is a distinct branch within the Hasidic movement, emphasizing certain unique spiritual practices and philosophies. Rabbi Nachman, the great-grandson of the Baal Shem Tov (the founder of Hasidism), brought a fresh and dynamic approach to the spiritual life of the Jewish people. Here are the core principles that define Breslev Hasidism:</p>
          <h3>Joy and Happiness (Simcha)</h3>
          <p>One of the central tenets of Breslev is the importance of joy and happiness. Rabbi Nachman taught that serving God with joy is essential and that sadness and depression can hinder spiritual growth. His famous saying, "It is a great mitzvah to be always happy," underscores this belief. Followers are encouraged to find joy in their daily lives, regardless of the challenges they face, and to use happiness as a tool to connect with the divine.</p>
          <h3>Prayer and Personal Connection with God (Hitbodedut)</h3>
          <p>Hitbodedut, or personal, secluded prayer, is another cornerstone of Breslev practice. Rabbi Nachman advocated for spending time alone in conversation with God, speaking freely and openly as one would with a close friend. This practice is typically done in natural settings, such as forests or fields, and is meant to foster a deep, personal relationship with the Creator.</p>
          <h3>Simplicity and Sincerity (Temimut and Peshitut)</h3>
          <p>Rabbi Nachman emphasized the value of simplicity and sincerity in one's service to God. He taught that God appreciates the simple and sincere prayers and deeds of individuals, even more than complex and learned rituals. This principle encourages followers to be genuine and straightforward in their spiritual practices, focusing on the heart and intention behind their actions.</p>
          <h3>Faith and Trust in God (Emunah and Bitachon)</h3>
          <p>Faith (Emunah) and trust (Bitachon) in God are fundamental in Breslev teachings. Rabbi Nachman stressed the importance of believing in God's providence and maintaining trust in Him, especially during difficult times. This unwavering faith is seen as a source of strength and comfort, helping followers navigate life's challenges with confidence and hope.</p>
          <h3>The Power of Torah Study</h3>
          <p>Torah study is highly valued in Breslev Hasidism. Rabbi Nachman encouraged his followers to engage deeply with Jewish texts, believing that Torah study not only enlightens the mind but also purifies the soul. His own works, such as Likutei Moharan, are studied extensively and are considered key texts within the movement.</p>
          <h3>The Concept of Tikkun (Rectification)</h3>
          <p>The idea of Tikkun, or spiritual rectification, is a significant aspect of Breslev thought. Rabbi Nachman taught that every individual has the potential to correct and elevate their soul through good deeds, prayer, and repentance. This concept extends to the belief that one can influence and rectify the spiritual realms, contributing to the overall redemption of the world.</p>
          <h3>The Role of the Tzaddik (Righteous Leader)</h3>
          <p>Rabbi Nachman placed great importance on the role of the Tzaddik, a righteous spiritual leader. He saw the Tzaddik as a guide and intercessor who could help followers achieve spiritual growth and draw closer to God. Even after his passing, Breslev Hasidim continue to seek inspiration and guidance from Rabbi Nachman's teachings and legacy.</p>
          <h3>The Importance of Gratitude (Hakarat Hatov)</h3>
          <p>Gratitude is another essential principle in Breslev philosophy. Rabbi Nachman encouraged his followers to constantly express thanks for the blessings in their lives, both big and small. This attitude of gratitude helps cultivate a positive outlook and reinforces the joy that is so central to Breslev practice.</p>
          <h3>The Significance of the Rosh Hashanah Gathering in Uman</h3>
          <p>One of the unique customs in Breslev Hasidism is the annual pilgrimage to Rabbi Nachman's grave in Uman, Ukraine, for Rosh Hashanah. Rabbi Nachman promised great spiritual benefits to those who visit his grave and pray there during the Jewish New Year. This gathering has become a cornerstone event for Breslev Hasidim worldwide.</p>
          <h3>Conclusion</h3>
          <p>The principles of Breslev Hasidism, as taught by Rabbi Nachman of Breslev, offer a path to spiritual growth through joy, prayer, simplicity, faith, and continuous learning. These teachings emphasize a personal, heartfelt relationship with God, the power of gratitude, and the role of the Tzaddik in guiding followers. Through these principles, Breslev Hasidim seek to elevate their souls and contribute to the rectification and redemption of the world.</p>
          </div>
        </section>
        <section id="stories">
          <h2 onClick={toggleStories} style={{ cursor: 'pointer' }}>Stories and Legends</h2>
          <p>There are many stories and legends about the miracles performed by Rabbi Nahman...</p>
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
                  <p>Haye Moharan</p>
                </a>
              </div>
              <div className="book">
                <a href={yemeMoharanatPdf} target="_blank" rel="noopener noreferrer">
                  <img src={yemeMoharanatImg} alt="Yeme Moharanat" />
                  <p>Yeme Moharanat</p>
                </a>
                <CommentForm onCommentPosted={handleCommentPosted} />
            <CommentsSection newComment={newComment} comments={comments} setComments={setComments} />
              </div>
          </div>
        </section>
        <section id="celebrations">
          <h2 onClick={toggleCelebrations} style={{ cursor: 'pointer' }}>Celebrations and Pilgrimages</h2>
            <p>Every year, thousands of people travel to Uman for Rosh Hashanah...</p>
          <div className={`content-container ${showCelebrations ? 'expanded' : ''}`}>
          <p>Breslev Hasidism, founded by Rabbi Nachman of Breslev (1772-1810), places significant emphasis on joy, prayer, and spiritual rectification. Central to this movement are the celebrations and pilgrimages that serve as spiritual high points for followers. These events, particularly the annual pilgrimage to Uman for Rosh Hashanah, have become deeply ingrained traditions that continue to attract thousands of participants each year. Here is a detailed account of these celebrations and pilgrimages, tracing their origins to the present day.</p>
          <h3>The Rosh Hashanah Pilgrimage to Uman</h3>
          <p>One of the most notable and unique customs in Breslev Hasidism is the annual pilgrimage to the grave of Rabbi Nachman in Uman, Ukraine, for Rosh Hashanah (the Jewish New Year). Rabbi Nachman emphasized the importance of being with him in Uman for Rosh Hashanah, promising great spiritual benefits to those who join him in prayer during this time.</p>
          <h3>Historical Background</h3>
          <p>Rabbi Nachman moved to Uman in 1810, shortly before his death, and chose to be buried there. He saw Uman as a fitting place for his burial due to the massacre of thousands of Jewish martyrs in the city decades earlier. He believed that his burial there would help rectify the souls of those who had perished.</p>
          <h3>Development of the Pilgrimage Tradition</h3>
          <p>After Rabbi Nachman's death, his followers began the tradition of visiting his grave in Uman for Rosh Hashanah. Despite periods of severe restrictions, particularly during Soviet rule, the pilgrimage persisted covertly. After the fall of the Soviet Union, the pilgrimage saw a resurgence, with increasing numbers of followers able to travel to Uman openly.</p>
          <h3>Current Practices</h3>
          <p>Today, the pilgrimage to Uman for Rosh Hashanah attracts tens of thousands of people from around the world. The event is marked by intense prayer, singing, and dancing. Pilgrims believe that the spiritual energy in Uman during Rosh Hashanah is exceptionally potent, and many report profound spiritual experiences.</p>
          <h3>Logistics and Organization</h3>
          <p>The logistics of accommodating such large numbers in Uman have become increasingly sophisticated. Temporary infrastructures, including accommodations, food services, and medical facilities, are set up to cater to the needs of the pilgrims. The Ukrainian authorities, recognizing the pilgrimage's economic and cultural significance, cooperate to ensure the event's smooth operation.</p>
          <h3>Security and Challenges</h3>
          <p>The pilgrimage has faced various challenges, including political tensions, safety concerns, and the COVID-19 pandemic. Despite these challenges, the event has continued to grow, reflecting the deep commitment of Breslev followers to Rabbi Nachman's teachings and their determination to fulfill his wishes.</p>
          <h3>Other Pilgrimages and Celebrations</h3>
          <p>While the Uman pilgrimage is the most prominent, Breslev Hasidism includes other significant events and celebrations:</p>
          <h3>Rabbi Nachman's Birthday</h3>
          <p>Followers of Breslev Hasidism celebrate Rabbi Nachman's birthday on the 1st of Nissan. This day is marked by special prayers, learning sessions, and joyous gatherings.</p>
          <h3>Lag BaOmer at Meron</h3>
          <p>Many Breslev Hasidim join the larger Jewish community in celebrating Lag BaOmer at the tomb of Rabbi Shimon Bar Yochai in Meron, Israel. This event is characterized by bonfires, music, and dancing, celebrating the teachings of the mystical tradition within Judaism.</p>
          <h3>Pilgrimages to Other Tzaddikim's Graves</h3>
          <p>Breslev Hasidim also visit the graves of other significant Hasidic leaders and Tzaddikim (righteous individuals) throughout the year. These visits are seen as opportunities for spiritual reflection and connection.</p>
          <h3>Shabbat Hanukkah</h3>
          <p>Shabbat Hanukkah is a special celebration within Breslev Hasidism, where the Shabbat that falls during the Hanukkah festival is observed with particular joy and festivity. This includes lighting the Hanukkah candles, singing traditional songs, and sharing inspiring teachings about the miracles of Hanukkah and the spiritual insights of Rabbi Nachman.</p>
          <h3>Shavuot</h3>
          <p>Shavuot, the festival celebrating the giving of the Torah at Mount Sinai, is another significant occasion for Breslev Hasidim. The community gathers for all-night study sessions, focusing on Rabbi Nachman's teachings and other sacred texts. The day is marked by joyous prayers, communal meals, and the reading of the Book of Ruth, emphasizing themes of kindness, conversion, and divine providence.</p>
          <h3>Modern Developments</h3>
          <p>In recent years, technology and social media have played a significant role in organizing and sharing these events. Live streaming of prayers and celebrations allows those who cannot physically attend to participate virtually. Additionally, the global Breslev community has seen growth, with new centers and communities established worldwide, fostering a sense of connection and shared purpose among followers.</p>
          <p>In conclusion, the celebrations and pilgrimages of Breslev Hasidism, especially the annual Rosh Hashanah pilgrimage to Uman, are integral to the spiritual life of its followers. These events provide opportunities for profound spiritual experiences, communal bonding, and the perpetuation of Rabbi Nachman's legacy. Despite challenges, the commitment to these traditions remains strong, continually adapting to ensure their relevance and accessibility to future generations.</p>
            <CommentForm onCommentPosted={handleCommentPosted} />
            <CommentsSection newComment={newComment} comments={comments} setComments={setComments} />
          </div>
        </section>
        <section id="comments">
          <h2 onClick={toggleComments} style={{ cursor: 'pointer' }}>Comments</h2>
          <div className={`content-container ${showComments ? 'expanded' : ''}`}>
            <CommentForm onCommentPosted={handleCommentPosted} />
            <CommentsSection newComment={newComment} comments={comments} setComments={setComments} />
          </div>
        </section>
        <section id="communication">
          <h2><div className="live">Chat Live</div></h2>
          <PostsContainer posts={posts} />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Rabbi Nahman and Breslev Hasidism. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/240px-X_logo_2023.svg.png" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;