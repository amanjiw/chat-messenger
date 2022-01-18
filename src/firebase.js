// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAoifTGu3aWwj6hvQ0poqqnU3HssHN4diw",
  authDomain: "whatsapp-d371f.firebaseapp.com",
  projectId: "whatsapp-d371f",
  storageBucket: "whatsapp-d371f.appspot.com",
  messagingSenderId: "1093221676842",
  appId: "1:1093221676842:web:7925017a5f726e9d63d053",
  measurementId: "G-NN4WKBYR70",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { auth, googleProvider };
export default db;
