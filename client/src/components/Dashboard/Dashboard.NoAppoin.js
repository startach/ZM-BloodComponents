import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "../appointmentsEntry/appointmentsEntry.css";
import { db } from '../firebase/firebase'
import { useHistory } from 'react-router-dom'


function DashboardNoAppoin() {
  let history = useHistory()
  let [state, setstate] = useState({})
  function handlechange(e) {
    let table = document.querySelector('.schedulesTables')
    table.innerHTML = "";
    state = { ...state, [e.target.id]: e.target.value }
    availableAppoitmentsspecific(state.selectoption)



  }


  useEffect(() => {


    db.collection('Hospitals').get().then((hopsitals) => {

      hopsitals.docs.forEach(hospitalDetails => {

        renderOption(hospitalDetails)
      })
    })

  }, [])


  //getting available appoitments for specific hospital by name
  async function availableAppoitmentsspecific(hospitalName) {

    const filteredQuery = db.collection('Appointments').where('userID', '==', null).where('hospitalName', '==', hospitalName)
    filteredQuery.get()
      .then(querySnapshot => {
        console.log(querySnapshot)
        querySnapshot.docs.forEach(hospitalAppoitments => {
          console.log(hospitalAppoitments.data());
          renderAppointments(hospitalAppoitments.data())

        })

      })
      .catch(error => {
        // Catch errors
      });
  }




  const renderOption = (hospitalData) => {

    let optionsList = document.querySelector('.hospitalsOptionsList')

    let option = document.createElement('OPTION')

    option.setAttribute("id", hospitalData.id)

    option.textContent = hospitalData.data().hospitalName

    optionsList.appendChild(option)

  }

  const renderAppointments = (appointments) => {


    let table = document.querySelector('.schedulesTables')
    let rowContainer = document.createElement('tr')

    rowContainer.setAttribute('class', 'rowContainer')
    let tdDate = document.createElement('td')
    let tdTime = document.createElement('td')
    let tBody = document.createElement('tbody')
    tdDate.setAttribute('class', 'rowClass')
    tdTime.setAttribute('class', 'rowClass')


    let butt = document.createElement('button')
    butt.setAttribute('class', 'scheduleButton');

    butt.onclick = function () {
      history.push('/questions')

    }
    tdDate.textContent = appointments.date;
    tdTime.textContent = appointments.time;
    butt.textContent = "Register";


    rowContainer.appendChild(tdDate);
    rowContainer.appendChild(tdTime);
    tdTime.appendChild(butt);
    tBody.appendChild(rowContainer)
    table.appendChild(tBody);



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

        <select className="hospitalsOptionsList" id="selectoption" onChange={handlechange}>


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

        </tbody>
      </table>
    </div>
  );
}


export default DashboardNoAppoin;
