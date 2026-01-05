// API configuration
// Use environment variable or fallback to default for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

const config = {
    apiUrl: API_BASE_URL,
    endpoints: {
        // User endpoints
        login: `${API_BASE_URL}/api/user/login`,
        register: `${API_BASE_URL}/api/user/register`,
        checkEmail: `${API_BASE_URL}/api/user/check-email`,
        refreshToken: `${API_BASE_URL}/api/user/refresh-token`,

        // Post endpoints
        posts: `${API_BASE_URL}/api/posts`,

        // Comment endpoints
        comments: `${API_BASE_URL}/api/comments`,

        // Upload endpoints
        uploads: `${API_BASE_URL}/uploads`,
    }
};

export default config;
