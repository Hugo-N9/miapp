// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlJc_SFTwRHD2b3FhAC_bq6sWRl0ZdJ7Q",
  authDomain: "miapp-modular.firebaseapp.com",
  projectId: "miapp-modular",
  storageBucket: "miapp-modular.firebasestorage.app",
  messagingSenderId: "881699932157",
  appId: "1:881699932157:web:dc6e411eb84393a19ffb94",
  measurementId: "G-FQDHC0BMBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);