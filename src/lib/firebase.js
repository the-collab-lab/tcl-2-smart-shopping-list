// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';
// Initalize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyCnjvTlV9erWXzZY1mTSzjrKvF7iAqVVxw',
  authDomain: 'tcl2project.firebaseapp.com',
  projectId: 'tcl2project',
  storageBucket: 'tcl2project.appspot.com',
  messagingSenderId: '683364107172',
  appId: '1:683364107172:web:182e3ff6a6fbf515ebf731',
  timestampsinSnapshots: true,
};

const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore();
export { fb, db };
