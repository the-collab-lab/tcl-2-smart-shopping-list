// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var config = {
    apiKey: "{process.env.REACT_APP_TCL_2_API_KEY}",
    authDomain: "{process.env.REACT_APP_TCL_2_AUTH_DOMAIN}",
    databaseURL: "{process.env.REACT_APP_TCL_2_DATABASE_URL}",
    projectId: "{process.env.REACT_APP_TCL_2_PROJECT_ID}",
    storageBucket: "{process.env.REACT_APP_TCL_2_STORAGE_BUCKET}",
    messagingSenderId: "{process.env.REACT_APP_TCL_2_SENDER_ID}",
    appId: "{process.env.REACT_APP_TCL_2_APP_ID}",
};

let fb = firebase.initializeApp(config);

export {fb};
