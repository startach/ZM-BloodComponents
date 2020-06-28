import React from 'react'
import './appointmentsList.css'

const AppointmentList = () => {


    return (

        <ul className="appHeaderRow">

            <li className="appHeaderEntries" key="Date">Date </li>

            <li className="appHeaderEntries" key="Time">Time</li>

            <li className="appHeaderEntries" key="Location">Location </li>


        </ul>
    )
}

export default AppointmentList
