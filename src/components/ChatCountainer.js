import React, { useState } from "react";
import "./ChatCountainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/authStore";

//#=>
const ChatCountainer = () => {
  const { allUsers } = useAuthContext();
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(true);
  const {emailId} = useParams();
  console.log(emailId)

  const selectedUser  = allUsers.find(user => user.email === emailId );


  return (
    <div className="chat-countainer">
      <div className="chat-container-herader">
        <div className="user-info">
          <div className="chat-user-img">
            <img src={selectedUser?.potoURL} alt="" />
          </div>
          <p>{selectedUser?.fullName}</p>
        </div>

        <div className="chat-container-btn">
          <MoreVertIcon />
        </div>
      </div>
      <div className="chat-display-container">
        <ChatMessage />
      </div>
      <div className="chat-input">
        <div className="mn">
          {openEmojiBox && (
            <Picker
              onEmojiClick={(event, emojiObject) => {
                setMessage(message + emojiObject.emoji);
              }}
            />
          )}
        </div>
        <div className="chat-input-btn">
          <InsertEmoticon
            onClick={() => {
              setOpenEmojiBox(!openEmojiBox);
            }}
          />
          <AttachFileIcon />
        </div>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="chat-input-send-btn">
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatCountainer;
