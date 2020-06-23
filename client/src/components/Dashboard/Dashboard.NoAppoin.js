import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db } from '../firebase/firebase'
import { Link } from 'react-router-dom'

function DashboardNoAppoin() {
  let [hospital, setHospital] = useState([])
  let [appointments, setAppointments] = useState([])
  let [chosenOption, setChosenOption] = useState({})
 // let [selectApp,setApp]=useState([])

  function handleChange(e) {
    setChosenOption(e.target.value)
  }


  function run(id)
  {
    console.log(id);
  }
  useEffect(() => {


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
          //console.log(hospitalAppointments.data())

          return hospitalAppointments;

        })
        setAppointments(Appointments)

      })
      .catch(error => {
        // Catch errors
      });

  }, [chosenOption])



  return (
    <div className="dashboardView noAppointmentViewContainer">
      <div className="userEligibility">
        you are <b style={{ color: "green" }}> eligible </b> to donate.
        <br></br>
        Please, schedule a new appointment:
      </div>


      <p className="hospitalsOptionsContainer">
        Nearest hospital is{" "}

        <select className="hospitalsOptionsList" id="selectedOption" onChange={handleChange}>

          {hospital.map(name => (

            <option value={name}>

              {name}

            </option>

          ))}



        </select>
      </p>
      {/* table area::::: */}

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
                <td className='rowClass'><button onClick={run(appointment.id)}  className="scheduleButton">Register</button>
                </td>
              </Link>
            </tr>


          ))}

        </tbody>
      </table>
    </div >
  );
}


export default DashboardNoAppoin;
