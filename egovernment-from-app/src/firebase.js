import { firebase } from "@firebase/app";
import "@firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBdRJfl68JdiHPKrYwYp76x9te3c2E3u08",
    authDomain: "egovernment-app.firebaseapp.com",
    databaseURL: "https://egovernment-app.firebaseio.com",
    projectId: "egovernment-app",
    storageBucket: "egovernment-app.appspot.com",
    messagingSenderId: "956640223099",
    appId: "1:956640223099:web:d3daad042a06d24c8ba7de"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

