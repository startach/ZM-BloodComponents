import React, { useState } from "react";
import "./registerForm.css"
import Button from '../button'
import { useHistory } from 'react-router-dom'
import { db, auth } from '../firebase/firebase'
import Notifications from '../Notifications/Notifications'

const RegisterForm = () => {

  const history = useHistory();
  const logo = "/img/Logo.png";
  let [userInputs, setuserInputs] = useState([])

  const handleChange = (e) => {
    userInputs = ({ ...userInputs, [e.target.id]: e.target.value });
    console.log(userInputs['name'])


  }

  const handleSubmit = (e) => {

    setuserInputs(userInputs)

    //Insert user into firestore
    auth.createUserWithEmailAndPassword(userInputs.email, userInputs.password).then(cred => {
      //storing the logged in user's id into localStorage variable
      localStorage.setItem('userid', cred.user.uid)
      return db.collection('users').doc(cred.user.uid).set(
        userInputs
      )
    }).then(() => {
      //Redirect to Dashboard after registration
      history.push('/dashboard')
    })
    e.preventDefault()
  }

  return (
    <div>

      <div className="imgContainer">
        <img src={logo} id="register-logo" />
      </div>

      <div className="registerHeader">
        <b id="header1"> Signup</b>
        <b id="header2"> Become A Donor</b>
      </div>

      <form class="register-form" onSubmit={handleSubmit}>
        <div className="nameSignupContainer">
          <label> Full Name
            <input
              id="name"
              onChange={handleChange}
              type="text"
              name="email"
              required
            ></input>
          </label>

        </div>

        <div className="emailSignupContainer">
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


        <div className="passwordSignupContainer">

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


        <div className="phoneSignupContainer">
          <label> Phone
            <input
              id="phone"
              onChange={handleChange}
              type="phone"
              name="phone"
              required
            ></input>
          </label>

        </div>
        <div className="citySignupContainer">

          <label> City

          <input
              id="city"
              onChange={handleChange}
              type="text"
              name="City"
              required
            ></input>
          </label>

        </div>


        <div className="addressSignupContainer">

          <label> Address

          <input
              id="address"
              onChange={handleChange}
              type="text"
              name="address"
              required
            ></input>
          </label>

        </div>

        <div className="bloodTypesContainer">
          <label> Blood Type
          <select id="bloodType" onChange={handleChange}>
              <option value="N/A" selected disabled>N/A</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </label>

        </div>
        <div className="mx-4">
          <Notifications />
        </div>

        <div className="mb-4">
          <Button type="submit" text="Signup" color='#C71585' marginTop='14px'></Button>
        </div>
      </form>



    </div>
  )
}

export default RegisterForm

