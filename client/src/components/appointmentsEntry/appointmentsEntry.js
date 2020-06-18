import React from 'react'
import './appointmentsEntry.css'
import Button from '../button'
import {Link} from 'react-router-dom'

const AppointmentsEntry = () => {

    return (

        <div>
            <ul className="rowContainer">
                <li id="date" className="rowEntry">17/6/2020</li>

                <li id="time" className="rowEntry">10:00</li>

                <li id="Location" className="rowEntry">Haifa</li>
            </ul>

            <ul className="rowContainer">
                <li id="date" className="rowEntry">16/6/2020</li>

                <li id="time" className="rowEntry">9:00</li>

                <li id="Location" className="rowEntry">Tel Aviv</li>
            </ul>

            <ul className="rowContainer">
                <li id="date" className="rowEntry">15/6/2020</li>

                <li id="time" className="rowEntry">8:00</li>

                <li id="Location" className="rowEntry">Jerusalem</li>

            </ul>

            <Link id = 'link' to ="/dashboard">
                <Button text = "Dashboard"/>
                </Link>

        </div>
    )
}

export default AppointmentsEntry
