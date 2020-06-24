import React from 'react'
import './appointmentsList.css'

const AppointmentList = () => {


    return (

        <ul className="headerRow tc">

            <li className="headerEntries" key="Date">Date </li>

            <li className="headerEntries" key="Time">Time</li>

            <li className="headerEntries" key="Location"> Hospital </li>


        </ul>
    )
}

export default AppointmentList
