import React, { useEffect, useState, Fragment } from 'react'
import './deleteAppointments.css'
import { db } from '../firebase/firebase'
import Datepicker from "react-datepicker";
import Popup from "reactjs-popup";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


function DeleteAppointments() {

    const { t } = useTranslation();

    const [appDate, setAppDate] = useState(new Date())
    const [hospitals, setHospitals] = useState([])
    const [hospitalAppointments, setHospitalAppointments] = useState({

        hospitalName: "",
        date: "",
        appointmentType: "",

    })

    const [selectedInputs, setSelectedInputs] = useState([])


    //state for if data feild is currently editable or not
    const [editable, setEditable] = useState({})



    const [editedInputs, setEditedInputs] = useState({})

    useEffect(() => {

        selectedInputs.map(SingleInput => {

            setEditedInputs(SingleInput.data())
        })

    }, [selectedInputs])



    const [saveEdit, setSaveEdit] = useState(true)
    const handleEdit = (e) => {
        if (saveEdit) {
            e.target.textContent = "Save"
            e.target.style.backgroundColor = "red"
            setEditable({ id: e.target.id, date: true },
                { id: e.target.id, time: true },
                { id: e.target.id, appointmentType: true },
                { id: e.target.id, hospitalName: true })
            setSaveEdit(false)

        } else {
            e.target.textContent = "Edit"
            e.target.style.backgroundColor = "#DEB675"
            setEditable({ id: e.target.id, date: false },
                { id: e.target.id, time: false },
                { id: e.target.id, appointmentType: false },
                { id: e.target.id, hospitalName: false })

            db.collection('Appointments').doc(e.target.id).update(

                editedInputs

            )

            setSaveEdit(true)

        }




    }

    const handleEditChange = (e) => {

        setEditedInputs({ ...editedInputs, [e.target.id]: e.target.value })

        console.log(editedInputs)

    }



    const handleDateChange = date => {
        setAppDate(date)
        let fullDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        setHospitalAppointments({ ...hospitalAppointments, ['date']: fullDate })

    }


    const handleChange = e => {

        setHospitalAppointments({ ...hospitalAppointments, [e.target.id]: e.target.value });
    }


    useEffect(() => {

        db.collection('Hospitals').get().then((hopsitals) => {
            const hospitalsNames = hopsitals.docs.map(hospitalDetails => {
                return hospitalDetails.data().hospitalName
            })
            setHospitals(hospitalsNames)

        })
    }, [])


    const deleteAppointment = (e) => {

        db.collection('Appointments').doc(e.target.id).delete()

    }



    useEffect(() => {

        if (hospitalAppointments.appointmentType == "Both") {

            console.log('loooop')
            db.collection('Appointments').where('hospitalName', '==', hospitalAppointments.hospitalName)
                .where('date', '==', hospitalAppointments.date)
                .onSnapshot(Appointments => {
                    const hospitalApp = Appointments.docs.map(appointmentsDetails => {
                        return appointmentsDetails
                    })
                    setSelectedInputs(hospitalApp)

                })

        } else {
            console.log('loooop')
            db.collection('Appointments').where('hospitalName', '==', hospitalAppointments.hospitalName)
                .where('date', '==', hospitalAppointments.date)
                .where('appointmentType', '==', hospitalAppointments.appointmentType)
                .onSnapshot(Appointments => {
                    const hospitalApp = Appointments.docs.map(appointmentsDetails => {
                        return appointmentsDetails
                    })
                    setSelectedInputs(hospitalApp)

                })


        }

    }, [hospitalAppointments])


    return (
        <Fragment>
            <div className="deleteEditAppContainer">

                <div className="selectHospitalContainer">
                    <p className="text-center mt-5">
                        {t('addAppointments.selectHospital')} : {" "}
                        <select id="hospitalName" className="hospitalsList" onChange={handleChange}>
                            <option value="Select" selected disabled>{t('general.select')} </option>
                            {hospitals.map(hospital =>


                                <option>

                                    {hospital}

                                </option>

                            )}

                        </select>
                    </p>

                </div>

                <div className="dateContainer">
                    <p className="text-center mt-5">
                    {t('general.select')} {t('general.date')}: {" "}
                        <Datepicker
                            selected={appDate}
                            onChange={handleDateChange}
                        />
                    </p>

                </div>


                <div className="selectAppointmentTypeContainer">
                    <p className="text-center mt-5">
                    {t('addAppointments.selectAppointmentType')}: {" "}
                        <select id="appointmentType" className="appointmentTypeList" onChange={handleChange}>

                            <option value="Select" selected disabled>{t('general.select')} </option>
                            <option value="Thrombocytes" >{t('general.Thrombocytes')}</option>
                            <option value="Granulocytes">{t('general.Granulocytes')}</option>
                            <option value="Both"> Both </option>

                        </select>
                    </p>
                </div>







            </div>

            <ul className="deleteTableHeader">
                <li className="deleteTableEntries">Date</li>
                <li className="deleteTableEntries">Time</li>
                <li className="deleteTableEntries">Type</li>
                <li className="deleteTableEntries">Hospital</li>
                <li className="deleteTableEntries"></li>
            </ul>

            {selectedInputs.map((Details, id) => (
                <ul className='deleteRowContainer' id={Details.id}>

                    {editable.date && editable.id == Details.id ? (

                        <Fragment>
                            <input className='editableInputsDB'
                                id="date"
                                type="text"
                                defaultValue={Details.data().date}
                                onChange={handleEditChange}>
                            </input>


                            <input className='editableInputsDB'
                                id="time"
                                type="text"
                                defaultValue={Details.data().time}
                                onChange={handleEditChange}>
                            </input>


                            <select id="appointmentType" className='editableInputsDB' onChange={handleEditChange}
                                defaultValue={Details.data().appointmentType}>

                                <option value="Thrombocytes" >Thrombocytes</option>
                                <option value="Granulocytes">Granulocytes</option>

                            </select>

                            <input className='editableInputsDB'
                                id="hospitalName"
                                type="text"
                                defaultValue={Details.data().hospitalName}
                                onChange={handleEditChange}>
                            </input>


                        </Fragment>

                    ) : (
                            <Fragment>
                                <li className='deleteAppRow deleteRowDate' id="date">
                                    {Details.data().date}</li>

                                <li className='deleteAppRow deleteRowTime' id="time">
                                    {Details.data().time}</li>

                                <li className='deleteAppRow deleteRowAppointmentType' id="appointmentType">
                                    {Details.data().appointmentType}</li>

                                <li className='deleteAppRow deleteRowHospitalName ' id="hospitalName">
                                    {Details.data().hospitalName}</li>
                            </Fragment>
                        )

                    }

                    <div className='ButtonsContainer ButtonsContainerRow '>


                        <Popup className="popup2" trigger={<button id={Details.id} className="DeleteButton">Delete</button>}
                            modal position="left top" closeOnDocumentClick
                            contentStyle={{ width: "20px" }}
                        >
                            {close => (
                                <div className="container">
                                    <a className="close" onClick={close}>
                                        X
                                </a>


                                    <div className="content">

                                        Are you sure that you want to delete the appointment ?

                                     </div>

                                    <div className="actions">

                                        <button
                                            id={Details.id}
                                            className="yesButton"
                                            onClick={(e) => {
                                                deleteAppointment(e)
                                                close();
                                            }}>
                                            Yes
                                        </button>

                                        <button
                                            className="noButton"
                                            onClick={() => {
                                                close();
                                            }}>
                                            No
                                        </button>

                                    </div>



                                </div>
                            )}

                        </Popup>



                        <button
                            id={Details.id}
                            className="SaveButton" onClick={handleEdit}>

                            Edit</button>

                    </div>

                </ul>
            ))}


        </Fragment>
    )
}

export default DeleteAppointments