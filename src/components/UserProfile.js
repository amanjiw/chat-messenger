import React from "react";
import { useNavigate } from "react-router-dom";
import "./usrProfile.css";
import userProfile from "../assets/img/profile-icon-png-898.png";

const UserProfile = ({ name, photoUrl, email }) => {
  const navigate = useNavigate();

  const goToUserChatPage = (emailId) => {
    if (emailId) navigate(`/${emailId}`);
  };

  return (
    <div className="user-profile" onClick={() => goToUserChatPage(email)}>
      <div className="user-image">
        <img src={photoUrl} alt="user profile" />
      </div>
      <div className="usr-info">
        <p className="user-name">{name}</p>
      </div>
    </div>
  );
};

export default UserProfile;
