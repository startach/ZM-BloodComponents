import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db } from '../firebase/firebase'

function DashboardNoAppoin() {

  useEffect(() => {


    db.collection('Hospitals').get().then((hopsitals) => {

      hopsitals.docs.forEach(hospitalDetails => {

        renderOption(hospitalDetails)


      })

    })

  }, [])


  const renderOption = (hospitalData) => {

    let optionsList = document.querySelector('.hospitalsOptionsList')

    let option = document.createElement('OPTION')

    option.setAttribute("id", hospitalData.id)

    option.textContent = hospitalData.data().hospitalName

    optionsList.appendChild(option)

  }


  return (
    <div className="dashboardView noAppointmentViewContainer">
      <div className="userEligibility">
        you are <b style={{ color: "green" }}> eligible </b> to donate.
        <br></br>
        Please, schedule a new appointment:
      </div>


      <p className="hospitalsOptionsContainer">
        Nearest hospital is{" "}

        <select className="hospitalsOptionsList">


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
          <tr className='rowContainer'>
            <td className='rowClass' >01/08/2020</td>
            <td className='rowClass'>12:30</td>
            <td className='rowClass'><button className="scheduleButton">Register</button>
            </td>
          </tr>
          <tr className='rowContainer'>
            <td className="rowClass">31/06/2020</td>
            <td className="rowClass">14:30</td>
            <td className="rowClass"><button className="scheduleButton">Register</button>
            </td>
          </tr>
          <tr className='rowContainer'>
            <td className="rowClass scheduleTableRow">08/07/2020</td>
            <td className="rowClass">09:00</td>
            <td className="rowClass"><button className="scheduleButton">Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DashboardNoAppoin;
