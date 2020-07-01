import React, { useState, useRef, useEffect } from 'react'
import './AddAppointments.css'
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../button'
import { db, auth } from '../firebase/firebase'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function AddAppointments() {

    const { t } = useTranslation();

    const [hospitalsDetails, setHospitalsDetails] = useState([])
    useEffect(()=>{
        //TODO: add authentication check / credentials

        //load hospitals into hospitalsList
        const hospitals = []
        db.collection('Hospitals').get()
            .then(snapshot => {
                snapshot.docs.forEach(hospital => {
                    let currentID = hospital.id
                    let appObj = { ...hospital.data(), ['id']: currentID }
                    hospitals.push(appObj)
            })
            setHospitalsDetails(hospitals)
            console.log(hospitalsDetails)
        })
    },[])

    const [appList, setAppList] = useState([])
    const [appDate, setAppDate] = useState(new Date())
    const displayNode = useRef(null)
    const [currentApp, setCurrentApp] = useState({
        userID: null,
        hospitalName: null, 
        hospitalID: null,
        date: null,
        time: null,
        timestamp: null,
        slots: 1,
        appointmentType: null
    })

    //for counted appointments added
    let count = 0;

    //set state values for slots & hospital
    const handleChange = (e) => {
        setCurrentApp({ ...currentApp, [e.target.id]: e.target.value})
        console.log(currentApp)
    }

    const handleChangeHospital = (e) => {
        //setting hospital ID vs Passing it as props from options
        const hospital = hospitalsDetails.filter(obj => obj.hospitalName === e.target.value)
        setCurrentApp({ ...currentApp, [e.target.id]: e.target.value, ['hospitalID'] : hospital[0].id})  
    }

    //set state values for date
    const handleChangeDate = date => {
        setAppDate(date)
        console.log(date)
        let fullDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        let minutes = date.getMinutes()
        if (minutes == 0) {
            minutes = "00"
        }
        let time = `${date.getHours()}:${minutes}`


        let timestamp = new Date(`${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}, ${time}`);

        setCurrentApp({ ...currentApp, ["date"]: fullDate, ["time"]: time, ["timestamp"]: timestamp })
    }

    //add new Appointment to appoitnment list
    const handleAdd = () => {
        if (!currentApp.date || !currentApp.time || !currentApp.slots || !currentApp.hospitalName) return  
        setAppList(appList.concat(currentApp))
        displayNode.current.textContent = ""
        console.log(appList)
    }

    //add free appointments to DB
    const handleSubmit = () => {
        appList.forEach((appointment) => {
            //fixme: slots does not need to be in the database or state instead use reference 
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
        <div className="addAppContainer tc">
            <p className="text-center mt-5">
            {t('addAppointments.addAppointmentTitle')}: {" "}
                <select className="dropdown" id="hospitalName" onChange={handleChangeHospital} style={{width:'300px'}}>
                <option selected disabled >{t('addAppointments.selectHospital')}</option>
                    {
                    hospitalsDetails.map( hospital => {
                        return <option 
                            value={hospital.hospitalName} 
                            className="option">
                            {hospital.hospitalName} 
                            </option>
                    })  
                    }
                </select>
            </p>

            <div className="inputContainer vcenter pa2 ma3">
                <Datepicker
                    required
                    selected={appDate}
                    onChange={handleChangeDate}
                    showTimeSelect
                    dateFormat="Pp"
                    className="ml-3 pa2"
                />
                <input 
                id="slots" 
                type="number"
                min="1"
                caption="slots"
                className="slots ml-3 pa2" 
                onChange={handleChange} 
                placeholder="#slots">
                </input>
                 <select 
                 className="dropdown ml-3 pa2" 
                 id="appointmentType" 
                 onChange={handleChange} 
                 style={{width:'220px'}}>
                    <option selected disabled>{t('addAppointments.selectAppointmentType')}</option>
                    <option id="AppointmentType" value="Thrombocytes" className="option"> {t('general.Thrombocytes')} </option>
                    <option id="AppointmentType" value="Granulocytes" className="option"> {t('general.Granulocytes')}</option>
                 </select>
                <button 
                className="addBtn text-center mx-3" 
                onClick={handleAdd}>Add 
                </button>
            </div>
            <hr/>
            <div className="display my-5 mx-3">
                {appList.length === 0 ?
                    <div className="text-center">{t('addAppointments.noAppsToSubmit')}</div>
                    :
                    <div>
                        <div className="row heading">
                            <span className="col-4">{t('general.hospital')} </span>
                            <span className="col-4">{t('general.date')}</span>
                            <span className="col-2">{t('general.Time')}</span>
                            {/* <span className="col-4">Type</span> */}
                            <span className="col-2">Slots</span>
                        </div>
                        {appList.map((appointment, index) => (

                            <div key={index} id={index} className="row">
                                <span className="col-4">{appointment.hospitalName} </span>
                                <span className="col-4">{appointment.date}</span>
                                <span className="col-2">{appointment.time} </span>
                                {/* <span className="col-4">{appointment.appointmentType}</span> */}
                                <span className="col-1">{appointment.slots}</span>
                                <span className="col-1 pointer" style={{ color: "red", fontWeight: "1000" }} onClick={() => handleDelete(index)}>x</span>
                            </div>


                        ))}
                    </div>}
            </div>
            <div className="subBtn">
                <Button type="button" text="Submit" onClick={handleSubmit}></Button>
                <div ref={displayNode} className="text-center mt-3 msg" style={{ color: "green", fontWeight: "800" }}></div>
            </div>
        </div>


    )
}
