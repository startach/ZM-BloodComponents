import React, { useState } from 'react';
import './loginForm.css';
// import Button from '../button';
import { logo, backArrow, facebookLogo, youtubeLogo, instagramLogo, websiteLogo } from '../../assets/';
import { useHistory, Link } from 'react-router-dom';

import { db, auth } from '../firebase/firebase';
// import { SignInWithGoogle } from '../../actions/googleAuth';
import GoogleButton from 'react-google-button';

///////
// import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
// import LanguageSwitch from '../languageSwich/LanguageSwitch';
//////
// import { useDispatch } from 'react-redux';
// import { setUserId } from '../../redux/actions';

const LoginForm = () => {
  const history = useHistory();
  const [userID, setUserId] = useState('');

  let [userData, setUserData] = useState([]);
  let [error, setError] = useState([]);

  // const dispatch = useDispatch();

  /////////
  // const { t } = useTranslation();
  //////////

  //Handle change of login form fields

  const handleChange = (e) => {
    userData = { ...userData, [e.target.id]: e.target.value };
  };


  const handleSubmit = (e) => {
    //update state
    setUserData(userData);

    //check auth from firebase
    auth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((cred) => {
        //storing the logged in user's id into localStorage variable
        localStorage.setItem('userid', cred.user.uid);
        setUserId(cred.user.uid);
        console.log(cred.user.uid);

        auth.onAuthStateChanged(function (user) {
          if (user) {
            user.getIdTokenResult().then(function (data) {
              localStorage.setItem(
                'userLevel',
                !data.claims.userLevel ? 'none' : data.claims.userLevel
              );
              console.log(localStorage.getItem('userLevel'));
              //Redirect to Dashboard after login if the user exists
              history.push('/dashboard')
            });
          }
        });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        setError(errorMessage);
      });
    e.preventDefault();
  };

  return (
    <div className="loginPage">
      {/* <LanguageSwitch /> */}
      <div className="imgContainer">
        <img src={logo} id="login-logo" />
      </div>


      <div className="loginHeader">
        {/* <b id="header1"> {t('loginForm.bloodComponents')}</b> */}
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
            placeholder={'Email'}
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
            placeholder={'Password'}
            required
          ></input>
        </div>
        <h2 className={'login_error'}>{error}</h2>

        <div className="loginButtonContainer">
          <button className="loginButton" type="submit">
            {'Login'}
          </button>
        </div>
      </form>


      <div className="registerFooter">
        <GoogleButton
          className="ma3"
        // onClick={SignInWithGoogle()}
        />
        <div className="forgotPassword">
          <Link to="/passwordreset" style={{ textDecoration: 'none' }}>
            <p>{'Forgot Password'}</p>
          </Link>
        </div>
        <div className="registerFooter">
          <p >{'Sign Up'}</p>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <div className="comeSaveLivesButton">
              <img src={backArrow} id="backArrowLogin" />
              <span id="comeSaveLivesSpan">{'Come Save Lives'}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="socialMediaIconsContainer">
        <a target="_blank" href="http://facebook.com/zichronmenachem">
          {' '}
          <img src={facebookLogo} ></img>{' '}
        </a>
        <a target="_blank" href="http://youtube.com/user/zichronmenachem">
          <img src={youtubeLogo} ></img>{' '}
        </a>
        <a target="_blank" href="http://instagram.com/zichronmenachem">
          <img id="instagramLogo" src={instagramLogo} ></img>{' '}
        </a>
        <a target="_blank" href="http://zichron.org">
          <img src={websiteLogo} ></img>{' '}
        </a>
      </div>

    </div>
  );
};

export default LoginForm;


// <div className="socialMediaIconsContainer">
//         <a target="_blank" href="http://facebook.com/zichronmenachem">
//           {' '}
//           <img src={facebookLogo} style={{
//             position: 'absolute',
//             top: '70vh',
//             left: '35vw'
//           }}></img>{' '}
//         </a>
//         <a target="_blank" href="http://youtube.com/user/zichronmenachem">
//           <img src={youtubeLogo} style={{
//             position: 'absolute',
//             top: '80vh',
//             left: '45vw'
//           }}></img>{' '}
//         </a>
//         <a target="_blank" href="http://instagram.com/zichronmenachem">
//           <img id="instagramLogo" src={instagramLogo} style={{
//             position: 'absolute',
//             top: '80vh',
//             left: '55vw'
//           }}></img>{' '}
//         </a>
//         <a target="_blank" href="http://zichron.org">
//           <img src={websiteLogo} style={{
//             position: 'absolute',
//             top: '70vh',
//             left: '65vw'
//           }}></img>{' '}
//         </a>
//       </div>