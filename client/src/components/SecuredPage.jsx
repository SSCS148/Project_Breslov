// src/components/SecuredPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SecuredPage = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/some-secured-route`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setMessage(error.response.data.message || "An error occurred");
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
