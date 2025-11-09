


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyB1g6kXadIeAwOzh0bthhIbtQq88Xdof_U",
  authDomain: "assignment-10-74677.firebaseapp.com",
  projectId: "assignment-10-74677",
  storageBucket: "assignment-10-74677.firebasestorage.app",
  messagingSenderId: "296549330781",
  appId: "1:296549330781:web:ac3f076d717db7a65482b4"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;