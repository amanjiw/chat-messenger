import React, { createContext, useContext, useReducer } from "react";
import db, { auth, googleProvider } from "../firebase";
const AuthStore = createContext({
  currentUser: null,
  allUsers: [],
  getAllUsers: () => {},
  activeMenu: () => {},
  hideMenu: () => {},
  signInUser: () => {},
  signOut: () => {},
});

const initialState = {
  currentUser: null,
  menuActive: false,
  allUsers: [],
};

//## Reducer
const authReducer = (state, action) => {
  if (action.type === "ACTIVE_MENUE") return { ...state, menuActive: true };

  if (action.type === "HIDE_MENUE") return { ...state, menuActive: false };

  // # signin user
  if (action.type === "SIGNIN")
    return { ...state, currentUser: action.payload };

  // # signout user
  if (action.type === "SIGN_OUT") return { ...state, currentUser: null };

  // # get all users data
  if (action.type === "GET_ALL_USERS")
    return { ...state, allUsers: action.payload };
};

// ##### auth provider >>
const AuthProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(authReducer, initialState);

  //signIn with google
  const signInUser = (data) => {
    dispatchState({ type: "SIGNIN", payload: data });
  };

  const signOut = async () => {
    await auth.signOut();
    dispatchState({ type: "SIGN_OUT" });
    localStorage.removeItem("user");
  };

  const getAllUsers = (data) => {
    dispatchState({ type: "GET_ALL_USERS", payload: data });
  };

  const activeMenu = () => {
    dispatchState({ type: "ACTIVE_MENUE" });
  };

  const hideMenu = () => {
    dispatchState({ type: "HIDE_MENUE" });
  };

  return (
    <AuthStore.Provider
      value={{
        ...state,
        signInUser,
        signOut,
        getAllUsers,
        activeMenu,
        hideMenu,
      }}
    >
      {children}
    </AuthStore.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthStore);
};

export default AuthProvider;

const amanj = true;
