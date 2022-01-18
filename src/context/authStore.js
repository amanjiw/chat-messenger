import React, { createContext, useContext, useReducer } from "react";
import db, { auth, googleProvider } from "../firebase";
const AuthStore = createContext({
  currentUser: null,
  allUsers: [],
  getAllUsers: () => {},
  signInUser: () => {},
  signOut: () => {},
});

const initialState = {
  currentUser: null,
  allUsers: [],
};

//## Reducer
const authReducer = (state, action) => {
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

  return (
    <AuthStore.Provider value={{ ...state, signInUser, signOut, getAllUsers }}>
      {children}
    </AuthStore.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthStore);
};

export default AuthProvider;

const amanj = true;
