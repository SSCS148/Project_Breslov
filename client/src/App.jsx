import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import MainPage from "./components/MainPage";

// App component sets up routing for the application
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
            </Routes>
        </Router>
    );
};

export default App;
