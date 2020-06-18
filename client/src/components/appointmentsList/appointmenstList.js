import React from 'react'
import './appointmentsList.css'

const AppointmentList = () => {


    return (

        <ul className="headerRow">

            <li className="headerEntries" key="Date">Date </li>

            <li className="headerEntries" key="Time">Time</li>

            <li className="headerEntries" key="Location">Location </li>


        </ul>
    )
}

export default AppointmentList
