import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import "./forgotPassword.css";
import lockPic from "./password.svg";
import { Redirect, useHistory, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  //   const [resetEmailSent, setResetEmailSent] = useState("");
  const [resetPassView, setResetPassView] = useState("beforeSending");
  var history = useHistory();

  const handleChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePassReset = (e) => {
    auth
      .sendPasswordResetEmail(emailValue)
      .then(() => {
        // setResetEmailSent('resetEmailSent')
        setResetPassView("afterSending");
      })
      .catch((err) => {
        setErrorMsg("errorOccured");
      });

    e.preventDefault();
  };



  const handleRecaptchaChange = (value) => {
    console.log("Captch value: ", value);
    
  }

  return (
    <div className="divContainer">
      {resetPassView === "beforeSending" ? (
        <form className="forgotPassForm" onSubmit={handlePassReset}>
          <img alt="lock" src={lockPic} className="lockPic" />
          <p>
            Please enter your email address below and an email will with your
            information will be sent to it.
          </p>
          <div className="forgotPassContainer">
            <label htmlFor="emailFieldForgot">
              <input
                type="email"
                onChange={handleChange}
                className="emailFieldForgot"
                name="emailFieldForgot"
                placeholder="Email: "
              />
            </label>
            <ReCAPTCHA
            sitekey="6LcId6sZAAAAAHLSsYg306UCPeJhPUzscWOiumUF"
            onChange={handleRecaptchaChange}
            />
            <div className='btnContainer'>
            <input
              type="submit"
              className="btn btn-small btn-warning mt-2"
              value="Reset password"
            />
            <input
              type="submit"
              className="btn btn-small btn-secondary mt-2 ml-2"
              value="Back"
              onClick={history.goBack}
            />
            </div>
          </div>
        </form>
      ) : resetPassView == "afterSending" ? (
        <div>
          <span>An Email was send to the address you provided us with!</span>
          <img
            src={require("./mailSent.gif")}
            alt="mailSent"
            className="emailSentVideo"
          />
          <span>Please check your email and try to login again</span>
          <button > 
            <Link to="/login">Click to login</Link>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
