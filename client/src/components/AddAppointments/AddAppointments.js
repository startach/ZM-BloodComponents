import React, { useState, useRef } from 'react'
import './AddAppointments.css'
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../button'
import { db, auth } from '../firebase/firebase'

export default function AddAppointments() {

    const [appList, setAppList] = useState([])

    const [appDate, setAppDate] = useState(new Date())

    const hosIDs = { "Rambam": 1, "Tal Hashomer": 2 }

    const displayNode = useRef(null)


    const [currentApp, setCurrentApp] = useState({
        userID: null,
        hospitalName: "Rambam",
        hospitalID: 1,
        date: null,
        time: null,
        slots: 1,
        appointmentType: "Thrombocytes",
    })

    //for counted appointments added
    let count = 0;

    //set state values for slots & hospital
    const handleChange = e => {
        //FIXME: bug in setting hospital ID
        setCurrentApp({ ...currentApp, [e.target.id]: e.target.value, ["hospitalID"]: hosIDs[currentApp.hospitalName] })
        console.log(currentApp)
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
        if (!currentApp.date || !currentApp.time || !currentApp.slots || !currentApp.hospitalName) return

        setAppList(appList.concat(currentApp))
        displayNode.current.textContent = ""
    }

    //add free appointments to DB
    const handleSubmit = () => {
        appList.forEach((appointment) => {
            let loops = appointment.slots;

            //lopp though and add as many appointments for empty spots
            for (let i = 0; i < loops; i++) {
                db.collection('Appointments').add({ ...appointment, ["slots"]: null })
                count++
            }
            //reset list
            setAppList([])
            //FIXME: fixed messgae when successfully uploaded
            displayNode.current.textContent = `${count} Appointments Successfully Uploaded`

        })
    }


    const handleDelete = (index) => {

        setAppList(appList.filter((item, count) => count !== index));

    }


    return (
        <div className="addAppContainer">

            <div className="donationsPage" >

                <div className="title">Add Appointments</div>
                <div className="line1"></div>
            </div>


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
                <input id="slots" className="slots ml-3" onChange={handleChange} placeholder="#slots"></input>
                <div className="addBtn text-center mx-3" onClick={handleAdd}>Add </div>
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
                        {appList.map((appointment, index) => (

                            <div key={index} id={index} className="row">
                                <span className="col-4">{appointment.hospitalName} </span>
                                <span className="col-4">{appointment.date}</span>
                                <span className="col-2">{appointment.time} </span>
                                <span className="col-1">{appointment.slots}</span>
                                <span className="col-1" style={{ color: "red", fontWeight: "1000" }} onClick={() => handleDelete(index)}>x</span>
                            </div>


                        ))}
                    </div>}
            </div>

            <div className="subBtn">

                <Button type="button" text="Submit" onClick={handleSubmit}></Button>
                <div ref={displayNode} className="text-center mt-3 msg" style={{ color: "green", fontWeight: "800" }}></div>
            </div>
        </div >


    )
}
