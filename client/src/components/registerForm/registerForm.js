import React, { useState, Fragment } from "react";
import "./registerForm.css";
import { db, auth } from "../firebase/firebase";
import DatePicker from "react-date-picker";
import Popup from "reactjs-popup";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageSwitch from "../languageSwich/LanguageSwitch";
import Button from "../button";
import BackArrow from "../../components/BackArrow";

const RegisterForm = () => {
  const [date, setDate] = useState();
  const [phoneStarting, setPhoneStarting] = useState();
  const [phoneEnding, setPhoneEnding] = useState();
  const [error, setError] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [notificationsPopUp, setNotificationsPopUp] = useState(false);
  let refuseNotifications = false;
  const [isChecked, setIsChecked] = useState({
    SMS: false,
    Whatsapp: false,
    Phonecall: false,
    Email: false,
    inAppAlert: false,
  });
  const [notifications, setNotifications] = useState({});
  const logo = "/img/Logo.png";
  let [userInputs, setuserInputs] = useState();
  let [userPassword, setUserPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState([]);
  const { t } = useTranslation();

  // REMOVE THIS WHEN NOTIFICATIONS ARE INCLUDED IN APPLICATION
  const areNotificationsActiveInApp = false;

  //Prevent the user which is logged in to enter register again

  if (localStorage.getItem("userid")) window.location.href = "/dashboard";

  // Handle change of register form fields

  const handleChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.id]: e.target.value });
  };

  //handle change password

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  //handle change confirm password

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  //Handle change of notifications checkboxes

  const handleCheckbox = (e, checked) => {
    setIsChecked({ ...isChecked, [e.target.id]: !checked });
    setNotifications({ ...notifications, [e.target.id]: !checked });
  };

  const handlePhoneEnding = (e) => {
    setPhoneEnding(e.target.value);
  };

  const handlePhoneStarting = (e) => {
    setPhoneStarting(e.target.value);
  };
  //Handle Submit of register fields

  const handleSubmit = async (e) => {
    e.preventDefault();
    var hasNumber = /\d/;

    //password and confirm password validation
    if (userPassword != confirmPassword) {
      setCheckError(true);
      setPasswordError(true);
      setError("Password and confirm password do not match");

      // Full Name validation (No numbers or special characters)
    } else if (!userInputs.name.match(/^[a-z\u0590-\u05fe]/i)) {
      setCheckError(true);
      setNameError(true);
      setError("Full Name Should include any numbers or special characters");

      // Full Name Length (MAX 25 letters)
    } else if (userInputs.name.length > 25) {
      setCheckError(true);
      setNameError(true);
      setError("Full Name should not be more than 25 letters");

      //Phone length validation
    } else if (phoneEnding.length < 7) {
      setCheckError(true);
      setPhoneError(true);
      setError("Phone must has 7 numbers");

      //City validation
    } else if (hasNumber.test(userInputs.city)) {
      setCheckError(true);
      setCityError(true);
      setError("City Field should not contains any number");

      // Address validation
    } else if (userInputs.address.match(/^\d/)) {
      setCheckError(true);
      setAddressError(true);
      setError("Address Field should start with a letter");
    } else {
      //Check if the user did not choose any type of notifications
      if (Object.entries(notifications).length === 0 && areNotificationsActiveInApp) {
        setNotificationsPopUp(true);
      }
      // If the user refused to recieve any kind of notifications continue with the flow of the code
      if (Object.entries(notifications).length >= 1 || refuseNotifications) {
        //update state
        setuserInputs(userInputs);

        //merge phone number with phone starting

        userInputs.phone = phoneStarting.concat(phoneEnding);

        //Insert user into firestore
        try {
          const cred = await auth.createUserWithEmailAndPassword(
            userInputs.email,
            userPassword
          );
          //storing the logged in user's id into localStorage variable
          localStorage.setItem("userid", cred.user.uid);

          await db.collection("users").doc(cred.user.uid).set(userInputs);

          //Add casualNotifications to the database

          await db.collection("users").doc(cred.user.uid).update({
            casualNotifications: notifications,
          });

          // Remove password and confirm password from database

          // await db.collection("users").doc(cred.user.uid).update({
          //   password: db.FieldValue.delete(),
          //   confirmPassword: db.FieldValue.delete()
          // });

          //Redirect to Dashboard after registration
          window.location.href = "/dashboard";

          //Check if there is error with password weakness , etc
        } catch (err) {
          setCheckError(true);
          setError(err.message);
        }
      }
    }
  };

  //Handle DatePicker State

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

  return (
    <Fragment>
      <div className="registerIcons">
        <BackArrow size="3x" marginLeft="5px" />
        <LanguageSwitch marginRight="5px" />
      </div>
      <div className="imgContainer">
        <img src={logo} id="register-logo" />
      </div>

      <div className="registerHeader">
        <b id="header1">{t("registerForm.signUp")}</b>
        <b id="header2">{t("registerForm.becomeDonor")}</b>
      </div>

      <form
        className={
          localStorage.getItem("i18nextLng") === "en"
            ? "ltrFormClass"
            : "rtlFormClass"
        }
        onSubmit={handleSubmit}
      >
        <div className="nameSignupContainer">
          <input
            className="registerName"
            id="name"
            onChange={handleChange}
            type="text"
            name="name"
            placeholder={t("registerForm.fullName")}
            style={nameError ? { border: "1px solid red" } : { border: "none" }}
            required
          ></input>
        </div>
        <div className="emailSignupContainer">
          <input
            className="registerEmail"
            id="email"
            onChange={handleChange}
            type="email"
            name="email"
            placeholder={t("registerForm.email")}
            required
          ></input>
        </div>
        <div className="passwordSignupContainer">
          <input
            className="registerPassword"
            id="password"
            onChange={handleUserPassword}
            type="password"
            name="password"
            placeholder={t("registerForm.password")}
            style={
              passwordError ? { border: "1px solid red" } : { border: "none" }
            }
            required
          ></input>
        </div>
        <div className="confirmPasswordSignupContainer">
          <input
            className="registerConfirmPassword"
            id="confirmPassword"
            onChange={handleConfirmPassword}
            type="password"
            name="confirmPassword"
            placeholder={t("registerForm.confirmPassword")}
            required
            style={
              passwordError ? { border: "1px solid red" } : { border: "none" }
            }
          ></input>
        </div>
        <div className="birthDateContainer dib pa3 ">
          {t("registerForm.birthDate")}
          <DatePicker
            className="birthDate"
            value={date}
            onChange={onClickDayHandler}
            format="dd/MM/yy"
            minDate={new Date(1929, 12, 31)}
            maxDate={new Date(2002, 11, 31)}
            required
          />
        </div>
        <div className="genderContainer">
          <select
            id="genderType"
            className="registerGenderType"
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              {t("registerForm.selectGender")}
            </option>
            <option value="Male">{t("registerForm.male")}</option>
            <option value="Female">{t("registerForm.female")}</option>
          </select>
        </div>
        <div className="phoneSignupContainer">
          <select
            id="phoneStarting"
            className="registerPhoneStarting"
            onChange={handlePhoneStarting}
            required
          >
            <option value="" disabled selected>
              {t("general.select")}
            </option>
            <option value="050">050</option>
            <option value="051">051</option>
            <option value="052">052</option>
            <option value="053">053</option>
            <option value="054">054</option>
            <option value="055">055</option>
            <option value="056">056</option>
            <option value="057">057</option>
            <option value="058">058</option>
            <option value="059">059</option>
          </select>
          <input
            className="registerPhone"
            id="phone"
            onChange={handlePhoneEnding}
            type="phone"
            name="phoneEnding"
            placeholder={t("registerForm.contactNumber")}
            style={
              phoneError ? { border: "1px solid red" } : { border: "none" }
            }
            required
          ></input>
        </div>
        <div className="citySignupContainer">
          <input
            className="registerCity"
            id="city"
            onChange={handleChange}
            type="text"
            name="City"
            placeholder={t("registerForm.city")}
            style={cityError ? { border: "1px solid red" } : { border: "none" }}
            required
          ></input>
        </div>
        <div className="addressSignupContainer">
          <input
            className="registerAddress"
            id="address"
            onChange={handleChange}
            type="text"
            name="address"
            placeholder={t("registerForm.address")}
            style={
              addressError ? { border: "1px solid red" } : { border: "none" }
            }
            required
          ></input>
        </div>
        <div className="secondaryAddressSignupContainer">
          <input
            className="registerSecondaryAddress"
            id="secondaryAddress"
            onChange={handleChange}
            placeholder={t("registerForm.secondaryAddress")}
            type="text"
            name="secondaryAddress"
          ></input>
        </div>
        <div className="bloodTypesContainer">
          <select
            id="bloodType"
            className="registerBloodType"
            onChange={handleChange}
            required
          >
            <option value="" selected disabled>
              {t("registerForm.selectBloodType")}
            </option>
            <option value="dontKnow"> {t("registerForm.dontKnow")}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <div className="madaLabelContainer">
            <a href="tel:035300400">
              <label>{t("registerForm.callMadaPhrase")}</label>
            </a>
          </div>
        </div>
        <div className="organizationContainer">
          <input
            className="registerOrganization"
            id="organization"
            onChange={handleChange}
            type="text"
            placeholder={t("registerForm.organization")}
            name="organization"
          ></input>
        </div>
        {/* **********hide notification preference until further notice - also added margin bottom to organizationContainer************ */}
        {/* <div className="notificationsTitle">
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
        </ul> */}
        {checkError ? (
          <Fragment>
            <span id="errorSpan">{error}</span>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        <div className="mb-4">
          {notificationsPopUp ? (
            <Fragment>
              <Popup
                className="popup2"
                open={true}
                // trigger={<Button type="button" text={t("registerForm.signUp")} color='#C71585'></Button>}
                modal
                position="left top"
                closeOnDocumentClick
                contentStyle={{ width: "20px" }}
              >
                {(close) => (
                  <div className="container">
                    <a
                      className="close"
                      onClick={() => {
                        refuseNotifications = false;
                        setNotificationsPopUp(false);
                        close();
                      }}
                    >
                      {" "}
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
                          refuseNotifications = true;
                          handleSubmit(e);
                        }}
                      >
                        {t("general.Yes")}
                      </button>

                      <button
                        className="noButton"
                        onClick={() => {
                          refuseNotifications = false;
                          setNotificationsPopUp(false);
                          close();
                        }}
                      >
                        {t("general.No")}
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                type="submit"
                text={t("registerForm.signUp")}
                color="#C71585"
              ></Button>
            </Fragment>
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
