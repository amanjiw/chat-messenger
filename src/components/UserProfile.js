import React from "react";
import "./usrProfile.css";
import userProfile from "../assets/img/profile-icon-png-898.png"
const UserProfile = ({name , photoUrl}) => {
  return <div className="user-profile">
      <div className="user-image">
          <img src={photoUrl} alt="user profile" />
      </div>
      <div className="usr-info">
          <p className="user-name">{name}</p>
      </div>
  </div>;
};

export default UserProfile;
