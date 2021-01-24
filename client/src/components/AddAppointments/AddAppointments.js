import React, {useEffect, useRef, useState} from "react";
import "./AddAppointments.css";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../button";
import {MDBIcon} from "mdbreact";
import moment from 'moment';
import {useTranslation} from "react-i18next";
import TextField from "@material-ui/core/TextField";
import {addAppointment} from "../../services/appointmentService";
import {getUserClaims, getUsersByBloodType} from "../../services/userService";
import {getHospitalLangName, hospitals} from '../../utils/enums/hospitals';
import {db, functions} from "../firebase/firebase";

//TODO: disable past dates, minor modifications to css, SMS

export default function AddAppointments() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const displayNode = useRef(null);
  const thrombocytes = "Thrombocytes";
  const [appointment, setAppointment] = useState({
    appointmentType: thrombocytes,
    confirmArrival: false,
    datetime: null,
    hasDonated: null,
    hospitalID: null,
    slots: 1,
    userID: null 
  });

  const hospitalsDetails = hospitals;;
  let appointmentTime = null; 

  // initialize Granulocytes state
  const [appointmentTypeDetails, setAppointmentTypeDetails] = useState({
    Granulocytes: {
      bloodType: null,
      message: `${t("addAppointments.defaultMessage")}`,
    },
  });
  const [userClaims, setUserClaims] = useState({ userLevel: "", hospital: "" })

  useEffect(() => {

    // initialize chosen date date
    handleChangeDate(new Date())

    //load hospitals into hospitalsList
    let hospitals = [];
    const getHospitalDetails = async () => {

      const snapshot = await db.collection("Hospitals").get()
      snapshot.docs.forEach((hospital) => {
        let currentID = hospital.id;
        let appObj = { ...hospital.data(), "id": currentID };
        hospitals.push(appObj);
      });
      setHospitalDetails(hospitals);
    }
    
    let userClaims = {}
    // get access level
    const getUserLevel = async () => {
      userClaims = await getUserClaims()
      setUserClaims(userClaims)
    }

    Promise.all([getHospitalDetails(), getUserLevel()]).then(()=>{
      if (userClaims.userLevel === "hospitalCord") {
        const userHospital = hospitals.find(hospital => {
          return hospital.hospitalName.replace(" ", "").toLowerCase() === userClaims.hospital.toLowerCase()
        })
        setAppointment({...appointment, hospitalID: userHospital?.id, hospitalName: userHospital?.hospitalName})
      }
    })
    
  }, []);

  //for counted appointments added
  let count = 0;

  //set state values for slots & hospital
  const changeGranulocytesSlots = (e) => {
    let value = parseInt(e.target.value);
    const max = parseInt(e.target.max);
    if (value > max) value = 500;

    setAppointment({ ...appointment, [e.target.id]: value });
    console.log(appointment);
  };

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.id]: e.target.value });
    console.log(appointment);
  };

  const handleATChange = (e) => {
    //Hide/show appointment type
    //HINT if Thrombocytes is selected then it will be added to the state
    //if Granulocytes is selected a new component will show and handle the change
    if (e.target.value === thrombocytes) {
      setVisible(false);
      setAppointmentList([]);
      setAppointment({
        ...appointment,
        [e.target.id]: e.target.value,

        slots: "",
      });
      setMatches(null);
    } else {
      setVisible(true);
      setAppointmentList([]);
      setAppointment({ ...appointment, [e.target.id]: null });
    }
  };

  const handleGranChange = (e) => {
    //handle Granulocytes appointments
    setAppointmentTypeDetails({
      ...appointmentTypeDetails,
      Granulocytes: {
        ...appointmentTypeDetails.Granulocytes,
        [e.target.id]: e.target.value,
      },
    });
    //add Granulocytes details to appointment state
    setAppointment({
      ...appointment,
      appointmentType: appointmentTypeDetails,
    });
  };

  const handleChangeHospital = (e) => {
    //setting hospital ID vs Passing it as props from options
    const hospitalID = hospitalsDetails.filter(hospital => hospital.id === e.target.value)[0].id;
    
    setAppointment({
      ...appointment,
      ["hospitalID"]: hospitalID,
    });
  };

  //set state values for date
  const handleChangeDate = (date) => {
    setAppointmentDate(date);
    console.log(date);
    let fullDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    let minutes = date.getMinutes();
    if (minutes === 0) {
      minutes = "00";
    }
    let time = `${date.getHours()}:${minutes}`;

    let timestamp = new Date(
      `${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}, ${time}`
    );

    setAppointment({
      ...appointment,
      ["datetime"]: timestamp,
    });
  };

  //add new Appointment to appoitnment list
  const handleAdd = () => {
    if (
      !appointment.datetime ||
      !appointment.slots ||
      !appointment.hospitalID ||
      !appointment.appointmentType
    )
      return alert("Make sure you filled out all data fields");

    //BloodType and message validation
    if (appointment.appointmentType !== thrombocytes) {
      getMatchList();
      setAppointmentList([appointment]);

      if (
        !appointmentTypeDetails.Granulocytes.bloodType ||
        !appointmentTypeDetails.Granulocytes.message
      )
        return alert("Make sure you filled out all data fields");
    } else {
      setAppointmentList(appointmentList.concat(appointment));
    }

    displayNode.current.textContent = "";
    console.log("appointmentList added", appointmentList);
  };

  //add free appointments to DB
  const handleSubmit = () => {
    appointmentList.forEach((appointment) => {
      let loops = appointment.slots;
      //loop though and add as many appointments for empty spots
      for (let i = 0; i < loops; i++) {
        addAppointment({ ...appointment, ["slots"]: null });
        count++;
      }
      //reset list
      setAppointmentList([]);

      displayNode.current.textContent = `${count} Appointments Successfully Uploaded`;
    });
  };

  const handleDelete = (index) => {
    setAppointmentList(appointmentList.filter((item, count) => count !== index));
  };

  ////////////////////////////////////////////EMAIL & SMS///////////////////////////////////////////////

  const [contact, setContact] = useState("Email");

  const [matches, setMatches] = useState(null);

  const [message, setMessage] = useState(null);

  //TRANSLATE
  const emailMessage = `
                    
    ${t("addAppointments.emergencyDonationInEmail")} ${
      appointment.hospitalID && getHospitalLangName(appointment.hospitalID)
  }, ${t("addAppointments.contactCoordEmail")}.<br/>`;

  //TRANSLATE
  const smsMessage = `
                    
    ${t("addAppointments.emergencyDonationInSMS")} ${
      appointment.hospitalID && getHospitalLangName(appointment.hospitalID)
  }, ${t("addAppointments.contactCoordSMS")}.`;

  //get all people in DB with blood type
  const getMatchList = async () => {
    let contactList = [];

    let buildList = getUsersByBloodType(appointmentTypeDetails.Granulocytes.bloodType).then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        contactList.push({
          name: doc.data().name,
          phone: doc.data().phone,
          email: doc.data().email,
        });
      });
    });
    console.log("matches", contactList);
    setMatches(contactList.length);

    return contactList;
  };

  //send SMS to matched people
  const handleSendSMS = async () => {
    try {
      let data = await getMatchList();

      //redirect to my account for testing
      data = [
        {
          name: "Jake",
          email: "jakepowis@gmail.com",
          phone: "+447894547932",
        },
      ];

      //create SMS messages

      data = data.map((person) => {
        //TRANSLATE
        if (
          appointmentTypeDetails.Granulocytes.message !==
          `${t("addAppointments.defaultMessage")}`
        ) {
          return {
            ...person,
            msg: `${t("addAppointments.dear")} ${person.name}, 

                    ${appointmentTypeDetails.Granulocytes.message}

                    ${t("addAppointments.thanksForSupport")}`,
          };
        } // return default message if no message entered
        else {
          return {
            ...person,
            msg: `${t("addAppointments.dear")} ${person.name}, 

                        ${smsMessage}
            
                        ${t("addAppointments.thanksForSupport")}`,
          };
        }
      });

      const sendSMS = functions.httpsCallable("sendSMS");

      sendSMS({ list: data }).then((result) => {
        console.log("data", result.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = async () => {
    try {
      console.log("contact method", contact);

      let data = await getMatchList();

      //redirect to my account for testing

      data = [
        {
          name: "Jake",
          email: "jakepowis@gmail.com",
          phone: "+447894547932",
        },
      ];

      // data = [{ ["name"]: "Jake", ["email"]: "jakepowis@gmail.com", ["phone"]: '+447894547932' }, { ["name"]: "Morad", ["email"]: "morad890@gmail.com", ["phone"]: '+447894547932' }, { ["name"]: "Hashem", ["email"]: "hashemab@post.bgu.ac.il", ["phone"]: '+447894547932' }]

      //create Email messages
      data = data.map((person) => {
        //TRANSLATE
        if (
          appointmentTypeDetails.Granulocytes.message !==
          `${t("addAppointments.defaultMessage")}`
        ) {
          return {
            ...person,
            msg: `<p> ${t("addAppointments.dear")} <b> ${person.name
              } </b>,</p>

                        ${appointmentTypeDetails.Granulocytes.message}

                    <p><b>${t("addAppointments.thanksForSupport")}</b></p><br />

                        <img src="https://i.ibb.co/WG83Vxd/logoZM.png" />`,
          };
        } // return default message if no message entered - TRANSLATE
        else {
          //TRANSLATE
          return {
            ...person,
            msg: `<p> ${t("addAppointments.dear")} <b> ${person.name
              }</b >,</p >

                        ${emailMessage}

                    <p><b>${t("addAppointments.thanksForSupport")}</b></p><br />

                        <img src="https://i.ibb.co/WG83Vxd/logoZM.png" />`,
          };
        }
      });

      console.log("sending", data);

      //pass list of names & numers, plus the message into the function

      const sendEmail = functions.httpsCallable("sendEmail");

      sendEmail({ list: data }).then((result) => {
        displayNode.current.textContent = result.data.message;
      });

      //return to fonrim that the messages have been sent out by the backend
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////

  let normalizedHospitalName = appointment?.hospitalName?.replace(" ", "").toLowerCase()

  return (
    <div className="addAppContainer" style={{ width: "100%" }}>
      <div ClassName="addInputs">
        <div className="hospitalDate">
          <Datepicker
            required
            selected={appointmentDate}
            onChange={handleChangeDate}
            showTimeSelect
            dateFormat="Pp"
            className="Datepicker pa2"
            minDate={new Date()}
            placeholderText="Select a date"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: "0px, 0px",
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: "scrollParent",
              },
            }}
          />
          <select
            className="dropdownAdd ml-3 pa2"
            id="hospitalName"
            onChange={handleChangeHospital}
            disabled={userClaims.userLevel === "hospitalCord"}
            value={appointment.hospitalName}
          >
            <option selected disabled>
              {t("addAppointments.selectHospital")}
            </option>
            {hospitalsDetails.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                  {getHospitalLangName(hospital.id)}
              </option>
            ))}
          </select>
        </div>
        <div className="typeSlots">
          {!visible ? (
            <select
              className="dropdown ml-3 pa2"
              id="slots"
              onChange={handleChange}
            >
              <option selected disabled>
                {t("addAppointments.slots")}
              </option>
              <option value="1" className="option">
                1
              </option>
              <option value="2" className="option">
                2
              </option>
              <option value="3" className="option">
                3
              </option>
              <option value="4" className="option">
                4
              </option>
              <option value="5" className="option">
                5
              </option>
              <option value="6" className="option">
                6
              </option>
              <option value="7" className="option">
                7
              </option>
              <option value="8" className="option">
                8
              </option>
              <option value="9" className="option">
                9
              </option>
              <option value="10" className="option">
                10
              </option>
            </select>
          ) : null}

          {visible ? (
            <TextField
              value={appointment.slots}
              type="number"
              id="slots"
              InputProps={{ inputProps: { min: 1, max: 500 } }}
              className="TextField pa2"
              fullWidth={true}
              onChange={changeGranulocytesSlots}
              label="number of slots"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : null}
          <select
            className="dropdownAdd ml-3 pa2"
            id="appointmentType"
            onChange={handleATChange}
            value={appointment.appointmentType}
          >
            <option
              id="AppointmentType"
              value={thrombocytes}
              className="option"
            >
              {" "}
              {t("general.Thrombocytes")}{" "}
            </option>
            <option
              id="AppointmentType"
              value="Granulocytes"
              className="option"
            >
              {" "}
              {t("general.Granulocytes")}
            </option>
          </select>
        </div>

        {visible ? (
          <div className="Gran">
            <TextField
              id="message"
              type="text"
              defaultValue={appointmentTypeDetails.Granulocytes.message}
              className="TextField pa2 w-80"
              onChange={handleGranChange}
              label="Message"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <select
              id="bloodType"
              className="dropdownAdd ml-3 pa2 w-20"
              onChange={handleGranChange}
              required
            >
              <option value="N/A" disabled selected>
                {t("addAppointments.selectBloodType")}:
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
          </div>
        ) : null}

        <div className="add">
          <Button
            color="yellowgreen"
            className="addBtn text-center mx-3"
            onClick={handleAdd}
            text={
              !matches ? t("addAppointment.add") : t("addAppointments.update")
            }
          ></Button>
        </div>
      </div>
      <hr />
      <div className="display ma0">
        {appointmentList.length === 0 ? (
          <div className="text-center">
            {t("addAppointments.noAppsToSubmit")}
          </div>
        ) : appointment.appointmentType === thrombocytes ? (
          <div>
            <table className="schedulesTables" style={{ overflowX: "unset" }}>
              <thead>
                <tr className="headerRow" style={{ height: "40px" }}>
                  <th className="headerEntries">{t("general.hospital")}</th>
                  <th className="headerEntries">{t("dashboard.date")}</th>
                  <th className="headerEntries">{t("dashboard.Time")}</th>
                  <th className="headerEntries">{t("addAppointments.type")}</th>
                  <th className="headerEntries">
                    {t("addAppointments.slots")}
                  </th>
                  <th className="headerEntries"></th>
                </tr>
              </thead>
              <tbody>
                {appointmentList.map((appointment, index) => {
                  appointmentDate = moment(appointment.datetime.getTime()).format('DD/MM/YY');
                  appointmentTime = moment(appointment.datetime.getTime()).format('HH:mm');
                  
                  return (
                  <tr
                    className="rowContainer"
                    key={index}
                    id={index}
                    style={{ height: "60px" }}
                  >
                    <td className="rowClass">{getHospitalLangName(appointment.hospitalID)}</td>
                    <td className="rowClass">{appointmentDate}</td>
                    <td className="rowClass">{appointmentTime}</td>
                    <td className="rowClass"> {appointment.appointmentType}</td>
                    <td className="rowClass">{appointment.slots}</td>
                    <td className="rowClass">
                      <MDBIcon
                        icon="trash"
                        size="2x"
                        className="deleteBtn"
                        onClick={() => handleDelete(index)}
                      />
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>

            <Button
              className="mt-4"
              type="button"
              text={t("addAppointment.submit")}
              onClick={handleSubmit}
            ></Button>
          </div>
        ) : (
          <div>
            <table className="schedulesTables" style={{ overflowX: "unset" }}>
              <thead>
                <tr className="headerRow" style={{ height: "40px" }}>
                  <th className="headerEntries">{t("general.hospital")}</th>
                  <th className="headerEntries">
                    {t("addAppointments.blood")}
                  </th>
                  <th className="headerEntries">
                    {t("addAppointments.slots")}
                  </th>
                  <th className="headerEntries">
                    {t("addAppointments.message")}
                  </th>
                  <th className="headerEntries"></th>
                </tr>
              </thead>
              <tbody>
                {appointmentList.map((appointment, index) => (
                  <tr
                    className="rowContainer"
                    key={index}
                    id={index}
                    style={{ height: "60px" }}
                  >
                    <td className="rowClass">{getHospitalLangName(appointment.hospitalID)}</td>
                    <td className="rowClass red">
                      {appointment.appointmentType.Granulocytes.bloodType}
                    </td>
                    <td className="rowClass">{appointment.slots}</td>
                    <td className="rowClass">
                      {" "}
                      {appointment.appointmentType.Granulocytes.message}
                    </td>
                    <td className="rowClass">
                      <MDBIcon
                        icon="trash"
                        size="2x"
                        className="deleteBtn"
                        onClick={() => handleDelete(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mr-4 ml-2">
              <b>{t("addAppointments.messagePreview")}:</b>
            </div>
            <div className="text-right mt-3 mr-4 ml-2">
              {appointmentTypeDetails.Granulocytes.message ===
              `${t("addAppointments.defaultMessage")}`
                ? smsMessage
                : appointmentTypeDetails.Granulocytes.message}
            </div>

            <div className="text-center mt-3">
              <b>{t("addAppointments.matchesFound")}:</b> {matches}
            </div>

            <div className="text-center my-3">
              {t("addAppointments.contactMethod")}:
              <select
                onChange={(e) => setContact(e.target.value)}
                className="ml-1"
              >
                <option value="Email">{t("loginForm.email")}</option>
                <option value="SMS">{t("notificationOptions.SMS")}</option>
              </select>
            </div>

            <Button
              className="mt-4"
              type="button"
              text={t("addAppointments.sendRequest")}
              onClick={contact === "Email" ? handleSendEmail : handleSendSMS}
            ></Button>
          </div>
        )}
      </div>

      <div
        ref={displayNode}
        className="text-center mt-3 msg"
        style={{ color: "green", fontWeight: "800" }}
      ></div>

      <div style={{ height: "100px" }}></div>
    </div>
  );
}
