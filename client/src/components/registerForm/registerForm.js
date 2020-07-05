import React, { useState, Fragment } from "react";
import "./registerForm.css";
import Button from "../button";
import { useHistory } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import DatePicker from "react-date-picker";
import Popup from "reactjs-popup";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageSwitch from "../languageSwich/LanguageSwitch";

const RegisterForm = () => {
  const [date, setDate] = useState();
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [popUp, setPop] = useState(false);
  const [isChecked, setIsChecked] = useState({
    SMS: false,
    Whatsapp: false,
    Phonecall: false,
    Email: false,
    inAppAlert: false,
  });
  const [notifications, setNotifications] = useState({});
  const history = useHistory();
  const logo = "/img/Logo.png";
  let [userInputs, setuserInputs] = useState([]);
  let [flag, setFlag] = useState(false);
  const [passValid, setPassValid] = useState();

  const { t } = useTranslation();

  //Prevent the user which is logged in to enter register again

  if (localStorage.getItem("userid")) history.push("/dashboard");

  // Handle change of register form fields

  const handleChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.id]: e.target.value });
    
  };


  //Handle change of notifications checkboxes

  const handleCheckbox = (e, checked) => {
    setIsChecked({ ...isChecked, [e.target.id]: !checked });
    setNotifications({ ...notifications, [e.target.id]: !checked });
  };

  //Handle Submit of register fields

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInputs.password != userInputs.confirmPassword) {
      setCheckError(true);
      setPasswordError(true);
      setError("Password and confirm password do not match");

      // if password and confirm password are matching
    } else {
      //update state
      if (Object.entries(notifications).length < 1) {
        //check password and confirm password
        console.log(Object.entries(notifications).length);
        setPop(true);
      }

      setuserInputs(userInputs);

      //Insert user into firestore
      try {
        const cred = await auth.createUserWithEmailAndPassword(
          userInputs.email,
          userInputs.password
        );
        //storing the logged in user's id into localStorage variable
        localStorage.setItem("userid", cred.user.uid);
        //localStorage.setItem('userLevel', cred.user.userLevel)

        await db.collection("users").doc(cred.user.uid).set(userInputs);

        //Add casualNotifications to the database

        await db.collection("users").doc(cred.user.uid).update({
          casualNotifications: notifications,
        });

        //Redirect to Dashboard after registration
        history.push("/dashboard");

        //Check if there is error with password weakness , etc
      } catch (err) {
        setCheckError(true);
        setError(err.message);
      }
    }
  };

  //Hadle DatePicker State

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
        Dec: "12",
      };
      let finalDate = parts[2] + "/" + months[parts[1]] + "/" + parts[3];

      setDate(e);

      setuserInputs({ ...userInputs, ["birthDate"]: finalDate });
    }
    setDate(e);
  };

  const titleObj =
    "Password must contain at least 6 characters, 1 upper case and 1 digit";

  return (
    <Fragment>
      <LanguageSwitch />
      <div className="imgContainer">
        <img src={logo} id="register-logo" />
      </div>

      <div className="registerHeader">
        <b id="header1">{t("registerForm.signUp")}</b>
        <b id="header2">{t("registerForm.becomeDonor")}</b>
      </div>

      <form class="register-form" onSubmit={handleSubmit}>
        <div className="nameSignupContainer">
          <label>
            {" "}
            * {t("registerForm.fullName")}
            <input
              className="registerName"
              id="name"
              onChange={handleChange}
              type="text"
              name="name"
              required></input>
          </label>
        </div>

        <div className="emailSignupContainer">
          <label>
            {" "}
            * {t("registerForm.email")}
            <input
              className="registerEmail"
              id="email"
              onChange={handleChange}
              type="email"
              name="email"
              required></input>
          </label>
        </div>
        <div className="passwordsContainer">
          <div className="passwordSignupContainer">
            <label>
              {/* <img title={titleObj} className="passInfo infoIcon" /> *{" "} */}
              {t("registerForm.password")}
              <input
                className="registerPassword"
                id="password"
                onChange={handleChange}
                type="password"
                name="password"
                style={
                  passwordError
                    ? { border: "1px solid red" }
                    : { border: "none" }
                }
                required></input>
            </label>
          </div>

          <div className="confirmPasswordSignupContainer">
            <label>
              {" "}
              * {t("registerForm.confirmPassword")}
              <input
                className="registerConfirmPassword"
                id="confirmPassword"
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                required
                style={
                  passwordError
                    ? { border: "1px solid red" }
                    : { border: "none" }
                }></input>
            </label>
          </div>
          {/* <span
            className="hiddenError"
            id="hiddenError"
            style={{ color: "red", textAlign: "center" }}>
            Passwords do not match
          </span> */}
        </div>
        <div className="birthDateContainer">
          <label id="labelBirth">
            {" "}
            * {t("registerForm.birthDate")}
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
          <label>
            {" "}
            * {t("registerForm.gender")}
            <select
              id="genderType"
              className="registerGenderType"
              onChange={handleChange}
              required>
              <option value="Select" disabled selected>
                {t("general.select")}
              </option>
              <option value="Male">{t("registerForm.male")}</option>
              <option value="Female">{t("registerForm.female")}</option>
            </select>
          </label>
        </div>

        <div className="phoneSignupContainer">
          <label>
            {" "}
            * {t("registerForm.contactNumber")}
            <input
              className="registerPhone"
              id="phone"
              onChange={handleChange}
              type="phone"
              name="phone"
              required></input>
          </label>
        </div>
        <div className="citySignupContainer">
          <label>
            {" "}
            * {t("registerForm.city")}
            <input
              className="registerCity"
              id="city"
              onChange={handleChange}
              type="text"
              name="City"
              required></input>
          </label>
        </div>

        <div className="addressSignupContainer">
          <label>
            {" "}
            * {t("registerForm.address")}
            <input
              className="registerAddress"
              id="address"
              onChange={handleChange}
              type="text"
              name="address"
              required></input>
          </label>
        </div>

        <div className="secondaryAddressSignupContainer">
          <label>
            {" "}
            {t("registerForm.secondaryAddress")}
            <input
              className="registerSecondaryAddress"
              id="secondaryAddress"
              onChange={handleChange}
              type="text"
              name="secondaryAddress"></input>
          </label>
        </div>

        <div className="bloodTypesContainer">
          <label>
            {" "}
            {t("registerForm.bloodType")}
            <select
              id="bloodType"
              className="registerBloodType"
              onChange={handleChange}
              required>
              <option value="N/A" selected disabled>
                N/A
              </option>
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
          <label>{t("registerForm.callMadaPhrase")}</label>
        </div>

        <div className="organizationContainer">
          <label>
            {" "}
            {t("registerForm.organization")}
            <input
              className="registerOrganization"
              id="organization"
              onChange={handleChange}
              type="text"
              name="organization"></input>
          </label>
        </div>

        <div className="notificationsTitle">
          {t(t("userProfile.notificationPrefence"))}
        </div>
        <span id="notificationsSpan">
          {" "}
          {t("notificationOptions.contactPreferencesPhrase")} :{" "}
        </span>
        <ul className="optionsContainer ">
          <li>
            <input
              type="checkbox"
              name="SMS"
              id="SMS"
              value="SMS"
              onChange={(e) => handleCheckbox(e, isChecked.SMS)}
              checked={isChecked.SMS}
            />
            <label for="SMS"> {t("notificationOptions.SMS")} </label>
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
            <label for="Whatsapp"> {t("notificationOptions.Whatsapp")} </label>
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
            <label for="Phonecall">
              {" "}
              {t("notificationOptions.Phonecall")}{" "}
            </label>
          </li>

          <li>
            <input
              type="checkbox"
              id="Email"
              value="Email"
              onChange={(e) => handleCheckbox(e, isChecked.Email)}
              checked={isChecked.Email}
            />
            <label for="Email"> {t("notificationOptions.Email")} </label>
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
            <label for="Email"> {t("notificationOptions.inAppAlert")} </label>
          </li>
        </ul>

        {checkError ? (
          <Fragment>
            <span style={{ color: "red", fontSize: "16px", marginTop: "5px" }}>
              {error}
            </span>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        <div className="mb-4">
          {popUp ? (
            <Fragment>
              <Popup
                className="popup2"
                trigger={
                  <div className="signUpButtonContainer">
                    <button className="signUpButton" type="button">
                      Signup
                    </button>
                  </div>
                }
                modal
                position="left top"
                closeOnDocumentClick
                contentStyle={{ width: "20px" }}>
                {(close) => (
                  <div className="container">
                    <a className="close" onClick={close}>
                      X
                    </a>

                    <div className="content">
                      {t("registerForm.contactingPhrase")}
                    </div>

                    <div className="actions">
                      <button
                        type="button"
                        className="yesButton"
                        onClick={(e) => {
                          handleSubmit(e);

                          close();
                        }}>
                        {t("general.Yes")}
                      </button>

                      <button
                        className="noButton"
                        onClick={() => {
                          close();
                        }}>
                        {t("general.No")}
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </Fragment>
          ) : (
            <Fragment>
              {passValid ? (
                <div className="signUpButtonContainer">
                  <button className="signUpButton" type="submit">
                    {t("registerForm.signUp")}
                  </button>
                </div>
              ) : (
                <div className="signUpButtonContainer">
                  <button disabled className="signUpButton" type="submit">
                    {t("registerForm.signUp")}
                  </button>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
