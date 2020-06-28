import React, { useState } from "react";
import "./loginForm.css";
import Button from '../button'
import { useHistory,Link } from 'react-router-dom'
import { db, auth } from '../firebase/firebase'
const LoginForm = () => {
 
  const history = useHistory();
  const logo = "/img/Logo.png";
  let [userData, setUserData] = useState([])
  let [error,setError]=useState([])

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
      //Redirect to Dashboard after login if the user exists
      history.push('/dashboard')
    }).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      setError(errorMessage);
      
    });
    e.preventDefault()
  }

  return (
    <div className="loginPage">
      <div className="imgContainer">
        <img src={logo} id="login-logo" />
      </div>
      <div className="loginHeader">
        <b id="header1"> Blood Components</b>
        <b id="header2"> Donations</b>
      </div>
      <form class="login-form" onSubmit={handleSubmit}>
        <div className="emailContainer">
          <label> Email
            <input
              id="email"
              onChange={handleChange}
              type="email"
              name="email"
              required
            ></input>
          </label>

        </div>
        <div className="passwordContainer">
          <label> Password
          <input
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              required
            ></input>
          </label>
        </div>
        <h2 className={"login_error"}>{error}</h2>

        <Button type="submit" text="Login" color='#C71585'></Button>
      </form>
      <div className='forgotPassword'>
        <Link to = '/passwordreset' style={{textDecoration:'none'}}>
        <p>
          Forgot your password?
        </p>
        </Link>
      </div>
      <div class="registerFooter">
        <p id="footertext">Not signed up as donor yet?</p>


        <Link to = '/register' style={{textDecoration : 'none'}}>

          <Button type="button" text="Come Save Lives"></Button>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm

