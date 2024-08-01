import React, { useEffect, useState } from 'react';
import axios from 'axios';

// SecuredPage component for displaying secured content after user authentication
const SecuredPage = () => {
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch secured data
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://my-backend-v6iy.onrender.com/api/some-secured-route', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                setMessage(error.response.data.message || 'An error occurred');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Secured Page</h1>
            {message && <p>{message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default SecuredPage;
