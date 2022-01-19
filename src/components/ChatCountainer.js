import React, { useState, useEffect, useRef } from "react";
import "./ChatCountainer.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from "@mui/icons-material/Send";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/authStore";
import firebase from "firebase";
import db from "../firebase";

//#=>
const ChatCountainer = () => {
  const [chatData, setChatData] = useState([]);
  const { allUsers, currentUser, activeMenu } = useAuthContext();
  const [message, setMessage] = useState("");
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const { emailId } = useParams();
  const chatBox = useRef(null);
  const selectedUser = allUsers.find((user) => user.email === emailId);

  useEffect(() => {
    (async () => {
      const data = db
        .collection("chats")
        .doc(emailId)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());
          let filteredMessages = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailId) ||
              message.reciverEmail === (currentUser.email || emailId)
          );

          setChatData(filteredMessages);
        });
    })();
  }, []);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      console.log(target);
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatData]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (emailId && message !== "") {
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        reciverEmail: emailId,
        timeStamp: firebase.firestore.Timestamp.now(),
      };

      // # Sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(payload);

      // # Reciver
      db.collection("chats").doc(emailId).collection("messages").add(payload);

      //update friends list
      db.collection("friendlist")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailId)
        .set({
          ...selectedUser,
          lastMessage: message,
        });

      db.collection("friendlist")
        .doc(emailId)
        .collection("list")
        .doc(currentUser.email)
        .set({
          ...selectedUser,
          lastMessage: message,
        });

      //////////////////////
      setMessage("");
    }
  };

  return (
    <div className="chat-countainer">
      <div className="chat-container-herader">
        <div className="menu" onClick={activeMenu}>
          <MenuIcon/>
        </div>
        <div className="user-info">
          <div className="chat-user-img">
            <img src={selectedUser?.photoURL} alt="" />
          </div>
          <p>{selectedUser?.fullName}</p>
        </div>

        <div className="chat-container-btn">
          <MoreVertIcon />
        </div>
      </div>
      <div className="chat-display-container" ref={chatBox}>
        {chatData.length > 0 &&
          chatData.map((message, i) => {
            return (
              <ChatMessage
                key={i}
                message={message.text}
                time={message.timeStamp}
                sender={message.senderEmail}
              />
            );
          })}
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
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="chat-input-send-btn" onClick={sendMessage}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatCountainer;
