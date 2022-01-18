import React from "react";
import UserProfile from "./UserProfile";
import "./Sidebar.css";
import TollIcon from "@mui/icons-material/Toll";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import profilepic from "../assets/img/profile-icon-png-898.png";
import { useAuthContext } from "../context/authStore";
const SideBar = () => {
  const { currentUser, signOut } = useAuthContext();

  const signOutUser = () => {
    signOut();
  };
  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarHeaderImg" onClick={signOutUser}>
          <img src={currentUser.photoURL || profilepic} alt="profile img" />
        </div>
        <div className="sidebarHeaderBTN">
          <TollIcon />
          <InsertCommentIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebarSearch">
        <div className="sidebarSearchInput">
          <SearchIcon />
          <input type="text" placeholder="search..." />
        </div>
      </div>
      <div className="sidebarChatlist">
        <UserProfile name="amanj ghaderi" photoUrl={profilepic} />
        <UserProfile name="amanj ghaderi" photoUrl={profilepic} />
      </div>
    </div>
  );
};

export default SideBar;
