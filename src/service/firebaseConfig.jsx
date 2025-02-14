// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkvFiq8yxa3sQBJei78wS0VcjJSSZ10GI",
    authDomain: "react-617cc.firebaseapp.com",
    databaseURL:
        "https://react-617cc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-617cc",
    storageBucket: "react-617cc.firebasestorage.app",
    messagingSenderId: "75576973226",
    appId: "1:75576973226:web:acecadb6223ce9d09cbdd3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
