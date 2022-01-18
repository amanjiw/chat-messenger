import React, { createContext, useContext, useReducer } from "react";
import db, { auth, googleProvider } from "../firebase";
const AuthStore = createContext({
  currentUser: null,
  signInUser: () => {},
  signOut: () => {},
});

const initialState = {
  currentUser: null,
};

//## Reducer
const authReducer = (state, action) => {
  if (action.type === "SIGNIN")
    return { ...state, currentUser: action.payload };

  if (action.type === "SIGN_OUT") return { ...state, currentUser: null };
};

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

  return (
    <AuthStore.Provider value={{ ...state, signInUser, signOut }}>
      {children}
    </AuthStore.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthStore);
};

export default AuthProvider;

const amanj = true;
