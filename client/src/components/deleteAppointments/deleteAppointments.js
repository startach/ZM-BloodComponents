import React, { useEffect, useState, Fragment } from 'react'
import './deleteAppointments.css'
import { db } from '../firebase/firebase'
import Datepicker from "react-datepicker";
import Popup from "reactjs-popup";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


function DeleteAppointments() {

    const { t } = useTranslation();

    let status = "Not yet reserved"

    const [appDate, setAppDate] = useState(new Date())
    const [hospitals, setHospitals] = useState([])
    const [hospitalAppointments, setHospitalAppointments] = useState({

        hospitalName: "",
        date: "",
        appointmentType: "",

    })

    const [selectedInputs, setSelectedInputs] = useState([])

    const [getAll, setGetAll] = useState(true)


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
        setGetAll(false)
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

            if (getAll) {
                db.collection('Appointments').where('hospitalName', '==', hospitalAppointments.hospitalName)
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
                    .onSnapshot(Appointments => {
                        const hospitalApp = Appointments.docs.map(appointmentsDetails => {
                            return appointmentsDetails
                        })
                        setSelectedInputs(hospitalApp)

                    })
            }

        } else {

            if (getAll) {

                db.collection('Appointments').where('hospitalName', '==', hospitalAppointments.hospitalName)
                    .where('appointmentType', '==', hospitalAppointments.appointmentType)
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

        }

    }, [hospitalAppointments, getAll])

    const handleAll = () => {

        setGetAll(true)
        console.log(getAll)
    }




    return (
        <Fragment>
            <div className="deleteEditAppContainer">
                <div className="selectContainer">
                    <div className="selectHospitalContainer mt-5">

                        {t('addAppointments.selectHospital')} : {" "}
                        <select id="hospitalName" className="hospitalsList" onChange={handleChange}>
                            <option value="Select" selected disabled>{t('general.select')} </option>
                            {hospitals.map(hospital =>


                                <option>

                                    {hospital}

                                </option>

                            )}

                        </select>


                    </div>



                    <div className="selectAppointmentTypeContainer mt-3">

                        {t('addAppointments.selectAppointmentType')}: {" "}
                        <select id="appointmentType" className="appointmentTypeList" onChange={handleChange}>

                            <option value="Select" selected disabled>{t('general.select')} </option>
                            <option value="Thrombocytes" >{t('general.Thrombocytes')}</option>
                            <option value="Granulocytes">{t('general.Granulocytes')}</option>
                            <option value="Both"> {t('general.both')} </option>

                        </select>

                    </div>

                </div>

                <hr />

                <div className="text-center mt-3">
                    <button className="allBtn" onClick={handleAll}>{t('editDeleteApp.showingAll')}</button>
                </div>
                <div className="text-center">{t('general.or')}</div>

                <div className="dateContainer">
                    <p className="text-center">
                        {t('general.select')} {t('general.date')}: {" "}
                        <Datepicker
                            selected={appDate}
                            onChange={handleDateChange}
                        />
                    </p>

                </div>

                <hr />




            </div>

            <ul className="deleteTableHeader">
                <li className="deleteTableEntries">{t('general.date')}</li>
                <li className="deleteTableEntries">{t('dashboard.Time')}</li>
                <li className="deleteTableEntries">{t('general.Type')}</li>
                <li className="deleteTableEntries">{t('general.hospital')}</li>
                <li className="deleteTableEntries"></li>
            </ul>
            <div className="contain">
                {selectedInputs.map((Details, id) => (
                    <ul className='deleteRowContainer' id={Details.id}>

                        {console.log("detila are:", Details.data())}

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

                                    <option value="Thrombocytes" >{t('general.Thrombocytes')}</option>
                                    <option value="Granulocytes">{t('general.Granulocytes')}</option>

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


                                    <li className='deleteAppRow deleteRowHospitalName ' id="hospitalName">
                                        {Details.data().userID ? <span className="highlight text-center"> {t('editDeleteApp.reservedBy')}: {Details.data().userID} </span> : Details.data().timestamp.seconds > (Date.now() / 1000) ? <span className="greenhighlight"> {t('editDeleteApp.notReserved')}</span> : <span style={{ color: "red" }} > {t('editDeleteApp.expired')}</span>}</li>
                                </Fragment>
                            )

                        }

                        <div className='ButtonsContainer ButtonsContainerRow '>


                            <Popup className="popup2" trigger={<button id={Details.id} className="DeleteButton">{t('editDeleteApp.delete')}</button>}
                                modal position="left top" closeOnDocumentClick
                                contentStyle={{ width: "20px" }}
                            >
                                {close => (
                                    <div className="container">
                                        <a className="close" onClick={close}>
                                            X
                                </a>


                                        <div className="content">

                                        {t('editDeleteApp.deleteAppConfirm')} ?

                                     </div>

                                        <div className="actions">

                                            <button
                                                id={Details.id}
                                                className="yesButton"
                                                onClick={(e) => {
                                                    deleteAppointment(e)
                                                    close();
                                                }}>
                                                {t('general.Yes')}
                                        </button>

                                            <button
                                                className="noButton"
                                                onClick={() => {
                                                    close();
                                                }}>
                                                {t('general.No')}
                                        </button>

                                        </div>



                                    </div>
                                )}

                            </Popup>



                            <button
                                id={Details.id}
                                className="SaveButton" onClick={handleEdit}>

                                {t('general.edit')}</button>

                        </div>

                    </ul>
                ))}
            </div>


        </Fragment >
    )
}

export default DeleteAppointments