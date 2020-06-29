import React, { useEffect, useState, Fragment, useRef} from 'react'
import './deleteAppointments.css'
import { db } from '../firebase/firebase'
import Datepicker from "react-datepicker";


function DeleteAppointments() {
    const editButtonRef = useRef();
    const [appDate, setAppDate] = useState(new Date())
    const [hospitals, setHospitals] = useState([])
    const [hospitalAppointments, setHospitalAppointments] = useState({

        hospitalName: "",
        date: "",
        appointmentType: "",

    })

    const [selectedInputs, setSelectedInputs] = useState([])


    //state for if data feild is currently editable or not
    const [editable, setEditable] = useState({
        date: false,
        time: false,
        appointmentType: false,
        hospitalName: false,
    })



    const [editedInputs, setEditedInputs] = useState({})




    const handleEdit = (e) => {

        e.target.textContent = "Save"

        setEditable({
            date: true,
            time: true,
            appointmentType: true,
            hospitalName: true,
        })
        
    }

    


    const handleEditChange = (e) => {

        setEditedInputs({ ...editedInputs, [e.target.id]: e.target.value })

        console.log(editedInputs)
    }



    const handleDateChange = date => {
        setAppDate(date)
        console.log(date)
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




    useEffect(() => {

        if (hospitalAppointments.appointmentType == "Both") {

            console.log('loooop')
            db.collection('Appointments').where('hospitalName', '==', hospitalAppointments.hospitalName)
                .where('date', '==', hospitalAppointments.date)
                .get()
                .then((Appointments) => {
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
                .get()
                .then((Appointments) => {
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
                        Select Hospital : {" "}
                        <select id="hospitalName" className="hospitalsList" onChange={handleChange}>
                            <option value="Select" selected disabled>Select </option>
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
                        Select Date : {" "}
                        <Datepicker
                            selected={appDate}
                            onChange={handleDateChange}
                        />
                    </p>

                </div>


                <div className="selectAppointmentTypeContainer">
                    <p className="text-center mt-5">
                        Select Appointment Type : {" "}
                        <select id="appointmentType" className="appointmentTypeList" onChange={handleChange}>

                            <option value="Select" selected disabled>Select </option>
                            <option value="Thrombocytes" >Thrombocytes</option>
                            <option value="Granulocytes">Granulocytes</option>
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

            {selectedInputs.map(Details  => (
                <ul className='deleteRowContainer' id={Details.id}>

                    {editable.date ? (

                        <Fragment>

                            <input className='inputDate'
                                id="date"
                                type="text"
                                defaultValue={Details.data().date}
                                onChange={handleEditChange}
                            >


                            </input>


                        </Fragment>

                    ) : (
                            <Fragment>
                                <li className='deleteAppRow'
                                    id="date"
                                >
                                    {Details.data().date}</li>


                            </Fragment>

                        )


                    }

                    <li className='deleteAppRow'>{Details.data().time}</li>


                    <li className='deleteAppRow'>{Details.data().appointmentType}</li>
                    <li className='deleteAppRow'>{Details.data().hospitalName}</li>
                    <div className='ButtonsContainer'>
                        <button id={Details.id} className="DeleteButton">Delete</button>
                        <button
                            id={Details.id}
                            className="SaveButton" onClick={handleEdit} ref={editButtonRef}>

                            Edit</button>

                    </div>

                </ul>
            ))}


        </Fragment>
    )
}

export default DeleteAppointments
