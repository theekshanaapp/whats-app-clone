import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdnMAL3GgFjSACC_2TJCdB4Fzl8xV3mO8",
    authDomain: "whatsappclone-6bf65.firebaseapp.com",
    projectId: "whatsappclone-6bf65",
    storageBucket: "whatsappclone-6bf65.appspot.com",
    messagingSenderId: "1021954290095",
    appId: "1:1021954290095:web:0870cc311f0e68d131ff5a",
    measurementId: "G-6W5DE3SSKH"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebaseApp.firestore();
export { db, firebase };