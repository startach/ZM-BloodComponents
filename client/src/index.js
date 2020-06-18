import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons'
import 'bootstrap/dist/css/bootstrap.css'
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyC6EDL8gMkZc3GGzGveMqWe5zvAr5DNiL4",
  authDomain: "blood-components.firebaseapp.com",
  databaseURL: "https://blood-components.firebaseio.com",
  projectId: "blood-components",
  storageBucket: "blood-components.appspot.com",
  messagingSenderId: "388223113819",
  appId: "1:388223113819:web:1273570a12add0fedafd7e",
  measurementId: "G-K6NM078FWD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 
const auth = firebase.auth();
const functions = firebase.functions();

db.collection('users').add({

  fullname : 'AMIR'
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
