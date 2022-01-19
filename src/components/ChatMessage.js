import React from "react";
import { useAuthContext } from "../context/authStore";
import "./ChatMessage.css";

const ChatMessage = ({ message, time, sender }) => {
  const {currentUser} = useAuthContext();
  return (
    <div className="chat-message" style={{
      alignSelf: sender === currentUser.email ? "flex-end" : "flex-start" ,
      backgroundColor : sender === currentUser.email ? "#dcf8c6" : "#fff" 
    }} >
      <div className="chat-message-txt">
        <p>{message}</p>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
