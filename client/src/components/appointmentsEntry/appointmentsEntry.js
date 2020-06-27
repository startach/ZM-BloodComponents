import React, {useEffect, useState} from 'react'
import './appointmentsEntry.css'
import Button from '../button'
import {Link, useHistory} from 'react-router-dom'
import { db, auth } from '../firebase/firebase'

const AppointmentsEntry = () => {
    const [prevAppointments, setPrevAppointments] = useState([])
    const history = useHistory();
    if (!localStorage.getItem('userid'))
        history.push('/login')

    useEffect(() => {  
        //retrieve all data based on userID
        const id= localStorage.getItem('userid')
        const today = Date.now() / 1000
        db.collection('Appointments').where('userID', '==', id).onSnapshot(snapShot => {
                const Appointments = []
                snapShot.docs.forEach(appointment => {
                  let app = appointment.data().timestamp.seconds
                 if (app < today) {
                    Appointments.push(appointment.data())
                  }
                })
                Appointments.sort( (b, a) => {
                  a = new Date(a.timestamp.seconds);
                  b = new Date(b.timestamp.seconds);
                  return a > b ? -1 : a < b ? 1 : 0;
                })
                setPrevAppointments(Appointments)
              })
    },[])
    
    return (
        <div>{
            prevAppointments.map( appointment => { 
                 return(
                <div key={appointment.id}>
                    <ul className="rowContainer pa3 tc" >
                    <li id="date" className="rowEntry">{appointment.date}</li>
                    <li id="time" className="rowEntry">{appointment.time}</li>
                    <li id="hospitalName" className="rowEntry">{appointment.hospitalName}</li>
                </ul>
                </div>
                 )
             })
            }
            
            <Link id = 'link' to ="/dashboard" className="ma3">
                <Button text = "Dashboard"/>
            </Link>

        </div>
    )
}

export default AppointmentsEntry
