import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin 
                ? 'https://my-backend-v6iy.onrender.com/api/user/login'
                : 'https://my-backend-v6iy.onrender.com/api/user/register';
    
            const data = isLogin 
                ? { email, password }
                : { name, email, password, age };
    
            console.log('Sending request to:', url);
            console.log('Request data:', data);
    
            const response = await axios.post(url, data);
    
            if (response && response.data) {
                console.log('Response:', response.data);
                setMessage(response.data.message);
    
                if (isLogin) {
                    localStorage.setItem('token', response.data.tokens.accessToken);
                    navigate('/main'); // Rediriger vers MainPage après connexion
                    setSuccessMessage('Successfully Login !'); // Afficher le message de succès
                    setTimeout(() => {
                        navigate('/main'); // Rediriger vers MainPage après un délai
                    }, 2000); // Attendre 2 secondes avant la redirection
                } else {
                    // Rediriger vers la page de connexion après enregistrement
                    setIsLogin(true);
                    setPassword('');
                    setName('');
                    setAge('');
                    setMessage('Registration successful. Please log in.');
                }
            } else {
                setMessage('Unexpected response format');
            }
        } catch (error) {
            console.log('Error response:', error.response);
            setMessage(error.response?.data?.message || 'An error occurred');
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