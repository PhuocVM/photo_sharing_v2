import './App.css';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // If not logged in, show only LoginRegister
  if (!user) {
    return (
      <Router>
        <LoginRegister onLoginSuccess={handleLoginSuccess} />
      </Router>
    );
  }

  // If logged in, show full app
  return (
    <Router>
      <TopBar user={user} onLogout={handleLogout} />
      <div className="app-container">
        <div className="main-topbar-buffer" />
        <div className="app-content">
          <div className="sidebar">
            <UserList />
          </div>
          <div className="main-content">
            <Routes>
              <Route
                  path="/users/:userId"
                  element = {<UserDetail />}
              />
              <Route
                  path="/photos/:userId"
                  element = {<UserPhotos />}
              />
              <Route path="/users" element={<UserList />} />
              <Route path="/" element={<Navigate to="/users" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
