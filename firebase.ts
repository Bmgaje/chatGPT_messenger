import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC61jK-OxmJOfVPqWSJ6lbEyg_mRrcqMy4",
  authDomain: "chatgpt-messenger-db60d.firebaseapp.com",
  projectId: "chatgpt-messenger-db60d",
  storageBucket: "chatgpt-messenger-db60d.appspot.com",
  messagingSenderId: "1957715596",
  appId: "1:1957715596:web:22efc069b20ef71bbaa5a9",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
