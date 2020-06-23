import React, { useState, useEffect, Fragment } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db, auth } from '../firebase/firebase'
import { Link, useHistory} from 'react-router-dom'
import Button from '../button'

function DashboardNoAppoin() {


  let [hospital, setHospital] = useState([])
  let [appointments, setAppointments] = useState([])
  let [chosenOption, setChosenOption] = useState({})
  let [checkUserAppointments, setCheckUserAppointments] = useState(false)
  let [userName, setUserName] = useState('')
  let [userAppointmentsDetails, setUserAppointmentsDetails] = useState([])

  function handleChange(e) {
    setChosenOption(e.target.value)
  }


  function run(e)
  {
    localStorage.setItem('appointmentId',( e.target.id));
    

    console.log(e.target.id);
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

    const filteredQuery = db.collection('Appointments').where('userID', '==', null).where('hospitalName', '==', chosenOption)
    filteredQuery.get()
      .then(querySnapshot => {
        const Appointments = querySnapshot.docs.map(hospitalAppointments => {

          return hospitalAppointments;

        })
        setAppointments(Appointments)

      })
      .catch(error => {
        // Catch errors
      });

  }, [chosenOption])



  useEffect(() => {

    auth.onAuthStateChanged(async user => {
      if (user) {
        const userData = await db.collection('users').doc(user.uid).get().then(userSnapShot => {
          return userSnapShot.data().name
        })
        setUserName(userData)


        db.collection('Appointments').where('userID', '==', user.uid).get()
          .then(snapShot => {

            if (snapShot.empty) {

              console.log("User doesn't have any Appointment")
            } else {
              setCheckUserAppointments(true)
              const userAppointmentsDetails = snapShot.docs.map(userAppointments => {

                return userAppointments
              })
              setUserAppointmentsDetails(userAppointmentsDetails)
            }

          })


      }
    })


  }, [])


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

                </tr>

              ))}



            </tbody>

          </table>

          <div className="bottomButtons">
            <Button type="button" text="Get Directions"></Button>
            <Button type="button" text="Open Gett" color='#C71585'></Button>
          </div>

        </Fragment>


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
                    <td className='rowClass' >{appointment.data().date}</td>
                    <td className='rowClass'>{appointment.data().time}</td>
                    <Link to='/questions'>
                      <button onClick={run} id={appointment.id} className="scheduleButton">Register</button>

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
