import React from "react";
import { useNavigate } from "react-router-dom";
import "./usrProfile.css";
import { useAuthContext } from "../context/authStore";

const UserProfile = ({ name, photoUrl, email, lastMessage }) => {
  const { hideMenu } = useAuthContext();
  const navigate = useNavigate();
  const goToUserChatPage = (emailId) => {
    if (emailId) navigate(`/${emailId}`);
  };

  return (
    <div
      className="user-profile"
      onClick={() => {
        goToUserChatPage(email);
        hideMenu();
      }}
    >
      <div className="user-image">
        <img src={photoUrl} alt="user profile" />
      </div>
      <div className="usr-info">
        <p className="user-name">{name}</p>
        {lastMessage && <p className="user-last-message">{lastMessage}</p>}
      </div>
    </div>
  );
};

export default UserProfile;
