// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
    apiKey: {TCL_2_API_KEY},
    authDomain: {TCL_2_AUTH_DOMAIN},
    databaseURL: {TCL_2_DATABASE_URL},
    projectId: {TCL_2_PROJECT_ID},
    storageBucket: {TCL_2_STORAGE_BUCKET},
    messagingSenderId: {TCL_2_SENDER_ID},
    appId: {TCL_2_APP_ID},
};

let fb = firebase.initializeApp(config);

export {fb};
