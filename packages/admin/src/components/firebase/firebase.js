import firebase from 'firebase'
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();

//google provider sign-in
const googleProvider = new firebase.auth.GoogleAuthProvider();



export { firebase, db, auth, functions, googleProvider }