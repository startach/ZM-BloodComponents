import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firebase } from './components/firebase/firebase'
import {Redirect} from 'react-router-dom'


//let hasRendered = false; 
//const renderApp = () => {
  //if(!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'));

  //  hasRendered=true;
 // }
//}

//  firebase.auth().onAuthStateChanged( user => {
//    if(user){
//      //renderApp();
//        return <Redirect from="/login" to="/dashboard" />
//    }else{
//      //renderApp();
//      return <Redirect to="/" />
//   }
//  })
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
