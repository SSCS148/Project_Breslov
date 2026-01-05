import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import '../styles.css';

// AuthPage component handles user authentication (login and registration)
const AuthPage = () => {
    // State variables to manage form inputs and UI state
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration mode
    const [name, setName] = useState(''); // Name input for registration
    const [email, setEmail] = useState(''); // Email input for login/registration
    const [password, setPassword] = useState(''); // Password input for login/registration
    const [age, setAge] = useState(''); // Age input for registration
    const [message, setMessage] = useState(''); // Message to display success/error
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const navigate = useNavigate(); // Hook for navigation

    // Toggle password visibility
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle form submission for login/registration
    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin
                ? config.endpoints.login
                : config.endpoints.register;
    
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
                    navigate('/main'); // Redirect to MainPage after successful login
                } else {
                    // Reset form for login after successful registration
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

    // Switch between login and registration modes
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
