import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCfb5T7PSbRGQuVmzOQYixPtni9QtaQS-0",
  authDomain: "discord-clone-c4bbc.firebaseapp.com",
  databaseURL: "https://discord-clone-c4bbc.firebaseio.com",
  projectId: "discord-clone-c4bbc",
  storageBucket: "discord-clone-c4bbc.appspot.com",
  messagingSenderId: "820818644373",
  appId: "1:820818644373:web:eadf15653457083e587a9c",
  measurementId: "G-7VDVK8CMDJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;
