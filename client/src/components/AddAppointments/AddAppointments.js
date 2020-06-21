import React, { useState } from 'react'
import './AddAppointments.css'
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../button'
import { db, auth } from '../firebase/firebase'

export default function AddAppointments() {

    const [appList, setAppList] = useState([])

    const [appDate, setAppDate] = useState(new Date())

    const hosIDs = { "Rambam": 1, "Tal Hashomer": 2 }

    const [currentApp, setCurrentApp] = useState({
        userID: null,
        hospitalName: "Rambam",
        hospitalID: 1,
        date: null,
        time: null,
        slots: 1,
        appointmentType: "Thrombocytes",
    })

    //set state values for slots & hospital
    const handleChange = e => {
        setCurrentApp({ ...currentApp, [e.target.id]: e.target.value, ["hospitalID"]: hosIDs[currentApp.hospitalName] })
    }

    //set state values for date
    const handleChangeDate = date => {
        setAppDate(date)
        console.log(date)
        let fullDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`
        let minutes = date.getMinutes()
        if (minutes == 0) {
            minutes = "00"
        }
        let time = `${date.getHours()}:${minutes}`
        setCurrentApp({ ...currentApp, ["date"]: fullDate, ["time"]: time })
    }

    //add new Appointment to appoitnment list
    const handleAdd = () => {
        setAppList(appList.concat(currentApp))
    }

    //add free appointments to DB
    const handleSubmit = () => {
        appList.forEach((appointment) => {
            let loops = appointment.slots;

            //lopp though and add as many appointments for empty spots
            for (let i = 0; i < loops; i++) {
                db.collection('Appointments').add({ ...appointment, ["slots"]: null })
            }
            //reset list
            setAppList([])
        })
    }


    return (
        <div>
            <p className="text-center mt-5">
                Add Appointments for: {" "}
                <select className="dropdown" id="hospitalName" onChange={handleChange}>
                    <option value="Rambam" className="option">Rambam - Haifa </option>
                    <option value="Tal Hashomer" className="option">Tal Hashomer - Tel Aviv</option>
                </select>
            </p>

            <div className="inputContainer">
                <Datepicker
                    selected={appDate}
                    onChange={handleChangeDate}
                    showTimeSelect
                    dateFormat="Pp"
                />
                <input id="slots" className="slots" onChange={handleChange} placeholder="#slots"></input>
                <div className="addBtn text-center" onClick={handleAdd}>Add </div>
            </div>
            <hr />


            <div className="display my-5 mx-3">
                {appList.length === 0 ?
                    <div className="text-center">Currently No Appointments to Submit</div>
                    :
                    <div>
                        <div className="row heading">
                            <span className="col-4">Hospital </span>
                            <span className="col-4">Date</span>
                            <span className="col-2">Time</span>
                            <span className="col-2">Slots</span>
                        </div>
                        {appList.map((appointment) => (

                            <div className="row">
                                <span className="col-4">{appointment.hospitalName} </span>
                                <span className="col-4">{appointment.date}</span>
                                <span className="col-2">{appointment.time} </span>
                                <span className="col-1">{appointment.slots}</span>
                                <span className="col-1" style={{ color: "red", fontWeight: "1000" }}>x</span>
                            </div>


                        ))}
                    </div>}
            </div>
            <Button type="button" text="Submit" onClick={handleSubmit}></Button>
        </div>


    )
}
