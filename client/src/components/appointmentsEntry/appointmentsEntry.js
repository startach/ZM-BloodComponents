import React from 'react'
import './appointmentsEntry.css'
import Button from '../button'

const AppointmentsEntry = () => {

    return (
        
        <div>
            <ul className="rowContainer">
                <li id="date" className="rowEntry">17/6/2020</li>

                <li id="time" className="rowEntry">10:00</li>

                <li id="Location" className="rowEntry">Haifa</li>




            </ul>

            <Button text='Dashboard' />

        </div>
    )
}

export default AppointmentsEntry
