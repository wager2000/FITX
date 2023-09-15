import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxsStM6NppjyFlCmrQtBv_nKq8X0F9gdM",
  authDomain: "fitx-385b9.firebaseapp.com",
  projectId: "fitx-385b9",
  storageBucket: "fitx-385b9.appspot.com",
  messagingSenderId: "48685057683",
  appId: "1:48685057683:web:c6bdb70274497eae5aef66",
  measurementId: "G-5Z5GH33Y6S"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
/*
try {
  const docRef = addDoc(collection(db, "users"), {
    Email: "Ada",
    Password: "Lovelace"
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
*/

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});




export { auth };
export { db };


