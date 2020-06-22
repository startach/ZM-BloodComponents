import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db } from '../firebase/firebase'
import { Link } from 'react-router-dom'

function DashboardNoAppoin() {
  let [hospital, setHospital] = useState([])
  let [appointments, setAppointments] = useState([])
  let [chosenOption, setChosenOption] = useState({})

  function handleChange(e) {
    setChosenOption(e.target.value)
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
          return hospitalAppointments.data();

        })
        setAppointments(Appointments)

      })
      .catch(error => {
        // Catch errors
      });

  }, [chosenOption])

<<<<<<< HEAD
=======
    let table = document.querySelector('.schedulesTables')


    let rowContainer = document.createElement('tr')
    
    rowContainer.setAttribute('class','rowContainer')
    let tdDate=document.createElement('td')
    let tdTime=document.createElement('td')
    
    tdDate.setAttribute('class','rowClass')
    tdTime.setAttribute('class','rowClass')


    let butt=document.createElement('button')
    butt.setAttribute('class','scheduleButton');

    butt.onclick=function(){
      history.push('/questions')

    }
    tdDate.textContent=appointments.date;
    tdTime.textContent=appointments.time;
    butt.textContent="Register";
   


    let butt = document.createElement('button')
    butt.setAttribute('class', 'scheduleButton');
    tdDate.textContent = appointments.date;
    tdTime.textContent = appointments.time;
    butt.textContent = "Register";
    rowContainer.appendChild(tdDate);
    rowContainer.appendChild(tdTime);
    
    tdTime.appendChild(butt);
    tBody.appendChild(rowContainer)
    table.appendChild(tBody);

  }
>>>>>>> 1440e1f9a107810c33decfac79ab1adeb946a972


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

            <tr className='rowContainer'>
              <td className='rowClass' >{appointment.date}</td>
              <td className='rowClass'>{appointment.time}</td>
              <Link to='/questions'>
                <td className='rowClass'><button className="scheduleButton">Register</button>
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
