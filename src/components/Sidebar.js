import React, { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import "./Sidebar.css";
import TollIcon from "@mui/icons-material/Toll";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import profilepic from "../assets/img/profile-icon-png-898.png";
import { useAuthContext } from "../context/authStore";
import db from "../firebase";

const SideBar = () => {
  const { currentUser, signOut, allUsers } = useAuthContext();
  const [searchedInput, setSearchInput] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const signOutUser = () => {
    signOut();
  };

  const searchedUser = allUsers?.filter((user) => {
    if (searchedInput) {
      return user.fullName.toLowerCase().includes(searchedInput.toLowerCase());
    }
  });

  const searchItem = searchedUser.map((user, ind) => {
    return (
      <UserProfile
        key={ind}
        name={user.fullName}
        photoUrl={user.photoURL}
        email={user.email}
      />
    );
  });

  useEffect(() => {
    (async () => {
      const data = db
        .collection("friendlist")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setFriendsList(snapshot.docs);
        });
    })();
  }, []);

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
          <input
            type="text"
            placeholder="search..."
            value={searchedInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="sidebarChatlist">
        {searchItem.length > 0
          ? searchItem
          : friendsList &&
            friendsList.map((friend, i) => {
              return <UserProfile
                key={i}
                name={friend.data().fullName}
                photoUrl={friend.data().photoURL}
                email={friend.data().email}
                lastMessage={friend.data().lastMessage}
              />;
            })}
      </div>
    </div>
  );
};

export default SideBar;
