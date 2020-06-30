import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import "./forgotPassword.css";
import lockPic from "./password.svg";
import { Redirect } from "react-router-dom";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
//   const [resetEmailSent, setResetEmailSent] = useState("");
  const [resetPassView, setResetPassView] = useState("beforeSending")
  
 
  const handleChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePassReset = (e) => {
    auth
      .sendPasswordResetEmail(emailValue)
      .then(() => {
        // setResetEmailSent('resetEmailSent')
        setResetPassView('afterSending')
      })
      .catch((err) => {
        setErrorMsg("errorOccured");
      });

    e.preventDefault();
  };


  const handleRedirect = () => {
      
      return <Redirect to='/login' />
  }


  return (
      <div className="divContainer">
          
      {resetPassView === "beforeSending" ?
      <form className="forgotPassForm" onSubmit={handlePassReset}>
        <p>
          Please enter your email address below and an email will with your
          information will be sent to it.
        </p>
        <div className="forgotPassContainer">
        <img alt='lock' src={lockPic} style={{height:'10vh'}} />
          <label htmlFor="emailFieldForgot">
            <input
              type="email"
              onChange={handleChange}
              className="emailFieldForgot"
              name="emailFieldForgot"
              placeholder="Email: "
            />
          </label>
          <input
            type="submit"
            className="forgotPassBtn"
            value="Reset password"
          />
        </div>
      </form>
      : resetPassView == 'afterSending' ? 
      <div>
          <span>An Email was send to the address you provided us with!</span>
      <img src={require('./mailSent.gif')} alt="mailSent" className='emailSentVideo' />
          <span>Please check your email and try to login again</span>
          <button onClick={handleRedirect}>
            Login
          </button>
      </div>
      : <div></div>
}
    </div>
  );
};
