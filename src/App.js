import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/home.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import SideBar from "./components/Sidebar";
import { useAuthContext } from "./context/authStore";
function App() {
  const { currentUser, signInUser } = useAuthContext();

  useEffect(() => {
    signInUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      {currentUser ? (
        <div className="home">
          <div className="home-container">
            <SideBar />
            <Routes>
              <Route path="/chat-page" element={<ChatPage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
