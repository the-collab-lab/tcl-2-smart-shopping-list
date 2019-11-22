// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAmNT8nRQb3trnjngkynqnQ1H6VCALX5qs",
    authDomain: "tcl-2-smart-shopping-list.firebaseapp.com",
    databaseURL: "https://tcl-2-smart-shopping-list.firebaseio.com",
    projectId: "tcl-2-smart-shopping-list",
    storageBucket: "tcl-2-smart-shopping-list.appspot.com",
    messagingSenderId: "538706887514",
    appId: "1:538706887514:web:30b4235c1e8aa5fa19a963"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();

export {fb, db};
