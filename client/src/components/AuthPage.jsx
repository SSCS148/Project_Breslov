import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Dans votre fichier AuthPage.jsx
    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin 
                ? `${process.env.REACT_APP_API_URL}/api/user/login`
                : `${process.env.REACT_APP_API_URL}/api/user/register`;
    
            const data = isLogin 
                ? { email, password }
                : { name, email, password, age };
    
            console.log('Sending request to:', url);
            console.log('Request data:', data);
    
            const response = await axios.post(url, data);
    
            console.log('API response:', response.data);
    
            setMessage(response.data.message);
    
            if (isLogin) {
                localStorage.setItem('token', response.data.data.tokens.accessToken);
                window.location.href = '/main'; // Rediriger vers MainPage après connexion
            } else {
                setIsLogin(true);
                setPassword('');
                setName('');
                setAge('');
                setMessage('Registration successful. Please log in.');
            }
        } catch (error) {
            console.error('Error:', error); // Log l'erreur complète
            if (error.response) {
                console.log('Error response data:', error.response.data); // Log les données de réponse d'erreur
                setMessage(error.response.data.message || 'An error occurred');
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };
    const handleSwitchMode = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    return (
        <div className="auth-page">
            <h1>Welcome to the Breslev Community Platform Project</h1>
            <div className="form-container">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleAuth}>
                    {!isLogin && (
                        <>
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group password-container">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={toggleShowPassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                </form>
                {message && <p id="message">{message}</p>}
                <button onClick={handleSwitchMode}>
                    {isLogin ? 'Switch to Register' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;