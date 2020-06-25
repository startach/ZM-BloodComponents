import React, { useState, Fragment } from "react";
import "./registerForm.css"
import Button from '../button'
import { useHistory } from 'react-router-dom'
import { db, auth } from '../firebase/firebase'
import DatePicker from 'react-date-picker'


const RegisterForm = () => {
  const [date, setDate] = useState()
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [checkError, setCheckError] = useState(false)
  const [isChecked, setIsChecked] = useState({
    SMS: false,
    Whatsapp: false,
    Phonecall: false,
    Email: false,
    inAppAlert: false
  })
  const [notifications, setNotifications] = useState({})
  const history = useHistory();
  const logo = "/img/Logo.png";
  let [userInputs, setuserInputs] = useState([])

  if (localStorage.getItem('userid'))
    history.push("/dashboard")


  const handleChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.id]: e.target.value });


    console.log(userInputs)
  }


  const handleCheckbox = (e, checked) => {

    setIsChecked({ ...isChecked, [e.target.id]: !checked })
    setNotifications({ ...notifications, [e.target.id]: !checked })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //check password and confirm password

    if (userInputs.password != userInputs.confirmPassword) {

      setCheckError(true)
      setPasswordError(true)
      setError('Password and confirm password do not match')

      // if password and confirm password are matching
    } else {

      //update state
      setuserInputs(userInputs)

      //Insert user into firestore
      try {
        const cred = await auth.createUserWithEmailAndPassword(userInputs.email, userInputs.password)

        //storing the logged in user's id into localStorage variable
        localStorage.setItem('userid', cred.user.uid)
        await db.collection('users').doc(cred.user.uid).set(
          userInputs

        )

        //Add casualNotifications to the database

        await db.collection('users').doc(cred.user.uid).update({
          casualNotifications: notifications
        }
        )

        //Redirect to Dashboard after registration
        history.push('/dashboard')



        //Check if there is error with password weakness , etc
      } catch (err) {

        setCheckError(true)
        setError(err.message)

      }


    }

  }

  const onClickDayHandler = (e) => {

    if (e != null) {


      let str = e.toString();
      let parts = str.split(" ");
      let months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      };
      let finalDate = parts[2] + "/" + months[parts[1]] + "/" + parts[3];

      setDate(e)

      setuserInputs({ ...userInputs, ['birthDate']: finalDate });
    }
    setDate(e)


  }



  return (

    <Fragment>
      <div className="imgContainer">
        <img src={logo} id="register-logo" />
      </div>

      <div className="registerHeader">
        <b id="header1"> Signup</b>
        <b id="header2"> Become A Donor</b>
      </div>

      <form class="register-form" onSubmit={handleSubmit}>
        <div className="nameSignupContainer">
          <label> * Full Name
            <input
              id="name"
              onChange={handleChange}
              type="text"
              name="name"
              required
            ></input>
          </label>

        </div>

        <div className="emailSignupContainer">
          <label> * Email
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

          <label> * Password

          <input
              id="password"
              onChange={handleChange}
              type="password"
              name="password"
              style={passwordError ? { border: '1px solid red' } : { border: 'none' }}
              required
            ></input>
          </label>

        </div>


        <div className="confirmPasswordSignupContainer">

          <label> * Confirm Password

          <input
              id="confirmPassword"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              required
              style={passwordError ? { border: '1px solid red' } : { border: 'none' }}
            ></input>
          </label>

        </div>



        <div className="birthDateContainer">
          <label id="labelBirth"> * Birth Date
            <br></br>
            <DatePicker
              className="birthDate"
              value={date}
              onChange={onClickDayHandler}
              format="dd/MM/yy"
              required
            />
          </label>



        </div>


        <div className="genderContainer">
          <label> * Gender
          <select id="genderType" onChange={handleChange} required>

              <option value="Select" disabled selected>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>

            </select>
          </label>

        </div>


        <div className="phoneSignupContainer">
          <label> * Contact Number
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

          <label> * City

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

          <label> * Address

          <input
              id="address"
              onChange={handleChange}
              type="text"
              name="address"
              required
            ></input>
          </label>

        </div>


        <div className="secondaryAddressSignupContainer">

          <label> Secondary Address

          <input
              id="secondaryAddress"
              onChange={handleChange}
              type="text"
              name="secondaryAddress"
            ></input>
          </label>

        </div>

        <div className="bloodTypesContainer">
          <label> Blood Type
          <select id="bloodType" onChange={handleChange} required>
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
        <div className="madaLabelContainer">

          <label >Don’t know? Call Mada 03-5300400</label>
        </div>

        <div className="organizationContainer">

          <label> Organization

          <input
              id="organization"
              onChange={handleChange}
              type="text"
              name="organization"
            ></input>
          </label>

        </div>


        <div className="notificationsTitle">Notification Preferences</div>
        <span id="notificationsSpan"> Please select all methods you are happy to be contacted by : </span>
        <ul className="optionsContainer ">
          <li >
            <input
              type="checkbox"
              name="SMS"
              id="SMS"
              value="SMS"
              onChange={(e) => handleCheckbox(e, isChecked.SMS)}
              checked={isChecked.SMS}
            />
            <label for="SMS"> SMS </label>
          </li>

          <li>

            <input
              name="Whatsapp"
              type="checkbox"
              id="Whatsapp"
              value="Whatsapp"
              onChange={(e) => handleCheckbox(e, isChecked.Whatsapp)}
              checked={isChecked.Whatsapp}
            />
            <label for="Whatsapp"> Whatsapp </label>
          </li>


          <li>

            <input
              type="checkbox"
              name="Phonecall"
              id="Phonecall"
              value="Phonecall"
              onChange={(e) => handleCheckbox(e, isChecked.Phonecall)}
              checked={isChecked.Phonecall}
            />
            <label for="Phonecall"> Phonecall </label>
          </li>



          <li>

            <input
              type="checkbox"
              id="Email"
              value="Email"
              onChange={(e) => handleCheckbox(e, isChecked.Email)}
              checked={isChecked.Email}


            />
            <label for="Email"> Email </label>
          </li>



          <li>

            <input
              name="inAppAlert"
              type="checkbox"
              id="inAppAlert"
              value="inAppAlert"
              onChange={(e) => handleCheckbox(e, isChecked.inAppAlert)}
              checked={isChecked.inAppAlert}
            />
            <label for="Email"> In-App alert </label>
          </li>

        </ul>




        {checkError ? (

          <Fragment>

            <span style={{ color: 'red', fontSize: '16px', marginTop: '5px' }}>{error}</span>

          </Fragment>

        ) : (


            <Fragment>

            </Fragment>
          )

        }
        <div className="mb-4">
          <Button type="submit" text="Signup" color='#C71585' marginTop='14px'></Button>
        </div>




      </form>

    </Fragment >


  )
}

export default RegisterForm

