import React, { useState } from "react";
import "./loginForm.css";
import Button from '../button'
import { useHistory, Link } from 'react-router-dom'
import { db, auth } from '../firebase/firebase'
import { SignInWithGoogle } from '../../actions/googleAuth';
import GoogleButton from 'react-google-button';

///////
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LanguageSwitch from "../languageSwich/LanguageSwitch";
//////

const LoginForm = () => {
  const backArrow = "/img/back-button-white.svg"
  const history = useHistory();
  const logo = "/img/Logo.png";
  let [userData, setUserData] = useState([])
  let [error, setError] = useState([])


/////////
const { t } = useTranslation();
//////////

  //Handle change of login form fields 

  const handleChange = (e) => {
    userData = ({ ...userData, [e.target.id]: e.target.value });
  }


  const handleSubmit = (e) => {
    //update state
    setUserData(userData)

    //check auth from firebase
    auth.signInWithEmailAndPassword(userData.email, userData.password).then((cred) => {
      //storing the logged in user's id into localStorage variable
      localStorage.setItem('userid', cred.user.uid)

      auth.onAuthStateChanged(function (user) {
        if (user) {
          user.getIdTokenResult().then(function (data) {
            localStorage.setItem('userLevel', !data.claims.userLevel ? "none" : data.claims.userLevel)
            console.log(localStorage.getItem('userLevel'))
          });
        }
      });
      
      //Redirect to Dashboard after login if the user exists
      window.location.href= '/dashboard';
    }).catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      setError(errorMessage);

    });
    e.preventDefault()
  }

  return (
    <div className="loginPage">
      <LanguageSwitch />
      <div className="imgContainer">
        <img src={logo} id="login-logo" />

      </div>
      <div className="loginHeader">
        <b id="header1"> {t('loginForm.bloodComponents')}</b>
        {/* <b id="header2"> {t('loginForm.bloodComponentsDonation')}</b> */}
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="emailContainer">
          <input
            className="emailLogin"
            id="email"
            onChange={handleChange}
            type="email"
            name="email"
            placeholder={t('loginForm.email')}
            required
          ></input>

        </div>
        <div className="passwordContainer">
          <input
            className="passwordLogin"
            id="password"
            onChange={handleChange}
            type="password"
            name="password"
            placeholder={t('loginForm.password')}
            required
          ></input>
        </div>
        <h2 className={"login_error"}>{error}</h2>

        <div className="loginButtonContainer">

          <button className="loginButton" type="submit" >{t('loginForm.login')}</button>
        </div>
      </form>
      <div className="registerFooter">
        {/* google log in button 
        <GoogleButton 
        className="ma3"
        onClick={SignInWithGoogle()} /> */}

        <div className='forgotPassword'>
          <Link to='/passwordreset' style={{ textDecoration: 'none' }}>
            <p>
              {t('loginForm.forgotPassword')}
        </p>
          </Link>
        </div>
        <div class="registerFooter">
          <p id="footertext">{t('loginForm.notSignedUp')}</p>


            <Link  to='/register' style={{ textDecoration: 'none' }}>
          <div className="comeSaveLivesButton">
            <img src={backArrow} id ="backArrowLogin"/>
            <span id ="comeSaveLivesSpan">{t('loginForm.comeSaveLives')}</span>
          </div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

