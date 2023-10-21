// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRfRnNvWYCUfXTOC9eZ-FtkLPzfPOIaEM",
    authDomain: "email-password-auth-8f75a.firebaseapp.com",
    projectId: "email-password-auth-8f75a",
    storageBucket: "email-password-auth-8f75a.appspot.com",
    messagingSenderId: "246882027579",
    appId: "1:246882027579:web:86c51ba39a69010efaf41e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;