import React, { useState, useEffect, Fragment } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db, auth } from '../firebase/firebase'
import { Link, useHistory } from 'react-router-dom'
import Button from '../button'
import Popup from "reactjs-popup";
import BookTaxi from '../BookTaxi/BookTaxi'

function DashboardNoAppoin() {


  let [hospital, setHospital] = useState([])
  let [appointments, setAppointments] = useState([])
  let [chosenOption, setChosenOption] = useState({})
  let [checkUserAppointments, setCheckUserAppointments] = useState(false)
  let [userName, setUserName] = useState('')
  let [userAppointmentsDetails, setUserAppointmentsDetails] = useState([])

  function handleChange(e) {
    setChosenOption(e.target.value)
    localStorage.setItem('hospital', e.target.value);
  }



  function setlocalStorage(appointmentID) {
    localStorage.setItem('appointmentId', (appointmentID));
  }

  function deleteAppointment(e) {
    console.log(e.target.id)
    var appId = e.target.id;
    db.collection('Appointments').doc(appId).update({
      userID: null
    })


  }
  const history = useHistory();
  useEffect(() => {
    //redirect user to login screen if he is not logged in 
    if (!localStorage.getItem('userid'))
      history.push('/login')

    db.collection('Hospitals').get().then((hopsitals) => {
      const hospitalsNames = hopsitals.docs.map(hospitalDetails => {
        return hospitalDetails.data().hospitalName
      })
      setHospital(hospitalsNames)

    })
  }, [])

  useEffect(() => {

    const today = Date.now() / 1000

    const filteredQuery = db.collection('Appointments').where('userID', '==', null).where('hospitalName', '==', chosenOption)


    filteredQuery.get()
      .then(querySnapshot => {
        const Appointments = []
        querySnapshot.docs.forEach(hospitalAppointments => {
          let app = hospitalAppointments.data().timestamp.seconds
          if (app > today) {
            let currentID = hospitalAppointments.id
            let appObj = { ...hospitalAppointments.data(), ['id']: currentID }
            Appointments.push(appObj)
          }
        })
        Appointments.sort(function (b, a) {
          a = new Date(a.timestamp.seconds);
          b = new Date(b.timestamp.seconds);
          return a > b ? -1 : a < b ? 1 : 0;
        })
        console.log("APPS", Appointments)
        setAppointments(Appointments)
      })
      .catch(error => {
        // Catch errors
      });

  }, [chosenOption])

  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const userData = await db.collection('users').doc(user.uid).get()
        setUserName(userData.data().name)


        userData.data().gender ? localStorage.setItem('gender', userData.data().gender) : localStorage.setItem('gender', 'unkown');



        db.collection('Appointments').where('userID', '==', user.uid).onSnapshot(snapShot => {

          if (snapShot.empty) {
            console.log("User doesn't have any Appointment")
            setCheckUserAppointments(false);
          }
          else {
            setCheckUserAppointments(true)
            const userAppointmentsDetails = snapShot.docs.map(userAppointments => {
              return userAppointments
            })
            setUserAppointmentsDetails(userAppointmentsDetails)
          }
        })
      }

    })


  }, [userAppointmentsDetails])


  return (
    <div className="dashboardView">
      {checkUserAppointments ? (
        <Fragment>
          <span id="introSpan">Hello <b>{userName}</b>, So far you have donated X times.Wow ! That’s wonderful.</span>
          <div className="lineUnderSpan"></div>
          <div className="userEligibility">
            You are <b style={{ color: "green" }}> eligible </b> to donate.
      <br></br>
      Here is few details regarding your upcoming appointment
    </div>
          <table className="schedulesTables noAppointmentTable">
            <thead>
              <tr className="headerRow">
                <th className="headerEntries">Date</th>
                <th className="headerEntries">Time</th>
                <th className="headerEntries">Location</th>
              </tr>
            </thead>
            <tbody>
              {userAppointmentsDetails.map(appointment => (
                <tr className='rowContainer' id={appointment.id}>
                  <td className='rowClass' >{appointment.data().date}</td>
                  <td className='rowClass'>{appointment.data().time}</td>
                  <td className='rowClass'>{appointment.data().hospitalName}</td>
                  <button onClick={deleteAppointment} id={appointment.id} className="scheduleButton">Cancel</button>


                </tr>
              ))}
            </tbody>
          </table>
          <div className="bottomButtons">
            <Button type="button" text="Get Directions" width="150px"></Button>
            <Popup trigger={<Button type="button" text="I Need A Ride" color='#C71585' width="150px"></Button>} modal position="left top" closeOnDocumentClick>
              <div>
                <BookTaxi />
              </div>
            </Popup>
          </div>





        </Fragment>

        //no appointments
      ) : (

          <Fragment>

            <span id="introSpan">Hello <b>{userName}</b>, So far you have donated X times.Wow ! That’s wonderful.</span>

            <div className="lineUnderSpan"></div>

            <div className="userEligibility">
              You are <b style={{ color: "green" }}> eligible </b> to donate.
      <br></br>
      Please, schedule a new appointment:
    </div>

            <p className="hospitalsOptionsContainer">
              Nearest hospital is{" "}

              <select className="hospitalsOptionsList" onChange={handleChange}>

                <option value="Select" disabled selected>Select</option>

                {hospital.map(name => (

                  <option value={name}>

                    {name}

                  </option>

                ))}



              </select>
            </p>

            <table className="schedulesTables noAppointmentTable">
              <thead>
                <tr className="headerRow">
                  <th className="headerEntries">Date</th>
                  <th className="headerEntries">Time</th>
                  <th className="headerEntries">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (

                  <tr className='rowContainer' id={appointment.id}>
                    <td className='rowClass' >{appointment.date}</td>
                    <td className='rowClass'>{appointment.time}</td>
                    <Link to='/questions'>
                      <button onClick={() => setlocalStorage(appointment.id)} id={appointment.id} className="scheduleButton">Register</button>

                    </Link>
                  </tr>


                ))}

              </tbody>
            </table>

          </Fragment>

        )
      }

    </div >
  );
}


export default DashboardNoAppoin;
