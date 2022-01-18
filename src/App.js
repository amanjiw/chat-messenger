import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/home.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import SideBar from "./components/Sidebar";
import db from "./firebase";
import { useAuthContext } from "./context/authStore";
function App() {
  const { currentUser, signInUser, allUsers, getAllUsers } = useAuthContext();

  useEffect(() => {
    signInUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    (async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        if (currentUser) {
          let users;
          users = snapshot.docs
            .map((doc) => doc.data())
            .filter((doc) => {
              return doc.email !== currentUser.email;
            });
          getAllUsers(users);
        }
      });
    })();
  }, [currentUser]);

  return (
    <>
      {currentUser ? (
        <div className="home">
          <div className="home-container">
            <SideBar />
            <Routes>
              <Route path="/:emailId" element={<ChatPage />} />
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
