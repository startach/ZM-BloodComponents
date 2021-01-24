import React, {Fragment, useEffect, useState} from 'react'
import './deleteAppointments.css'
import Datepicker from "react-datepicker";
import Popup from "reactjs-popup";
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {
    deleteAppointment,
    getAppointmentsByFilters,
    updateAppointment
} from '../../services/appointmentService';
import {getHospitalLangName, hospitals} from '../../utils/enums/hospitals';

function DeleteAppointments() {
    const { t } = useTranslation();
    const [appDate, setAppDate] = useState(new Date())
    const hospitalsDetails = hospitals;
    const [hospitalAppointments, setHospitalAppointments] = useState({
        hospitalID: null,
        date: null,
        appointmentType: "Both",
    })

    const [selectedInputs, setSelectedInputs] = useState([])
    const [getAll, setGetAll] = useState(true)
    let appointmentDate = null;
    let appointmentTime = null;
    let hospitalName = null;

    //state for if data feild is currently editable or not
    const [editable, setEditable] = useState({})
    const [editedInputs, setEditedInputs] = useState({})
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

            updateAppointment(e.target.id, editedInputs);
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
        setHospitalAppointments({ ...hospitalAppointments, date: fullDate })
    }

    const handleChange = e => {
        setHospitalAppointments({ ...hospitalAppointments, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        getAppointmentsByFilters(buildFilter()).then(appointments => {
            setSelectedInputs(appointments.docs);
        });
    }, [hospitalAppointments, getAll])

    useEffect(() => {
        selectedInputs.map(SingleInput => setEditedInputs(SingleInput.data()))
    }, [selectedInputs])

//     const getHospitals = async () => {
//         db.collection('Hospitals').get().then(async (hopsitals) => {
//             hospitalNames = hopsitals.docs.map(hospitalDetails => {
//                 return hospitalDetails.data().hospitalName
//             })

//             const userClaims = await getUserClaims()
//             if (userClaims.userLevel === "hospitalCord") {
//                 const userHospital = userClaims.hospital
//                 hospitalNames = [hospitalNames
//                     .find(hospital => hospital.replace(" ", "").toLowerCase() === userHospital.toLowerCase())]
//                 setHospitalAppointments({ ...hospitalAppointments, hospitalName: hospitalNames[0] })
//             }
//             setHospitals(hospitalNames)
//         })
//     }
//     getHospitals()
// }, [])


    const buildFilter = () => {
        let filterObj = {};

        if (hospitalAppointments.hospitalID) {
            filterObj = {...filterObj, hospitalID: hospitalAppointments.hospitalID};
        } 

        if (hospitalAppointments.appointmentType) {
            filterObj = {...filterObj, appointmentType: hospitalAppointments.appointmentType};
        }
         
        if (hospitalAppointments.date) {
            filterObj = {...filterObj, date: hospitalAppointments.date};
        }

        return filterObj;
    }

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
                        <select id="hospitalID" className="hospitalsList" onChange={handleChange}
                                value={hospitalAppointments.hospitalName} disabled={hospitals.length === 1}>
                            {hospitals.length === 1 ? null : <option value="Select" selected disabled>{t('general.select')} </option>}
                            {hospitalsDetails.map((hospital) => (
                                <option key={hospital.id} value={hospital.id}>
                                    {getHospitalLangName(hospital.id)}
                                </option>
                             ))}
                        </select>
                    </div>
                    <div className="selectAppointmentTypeContainer mt-3">
                        {t('addAppointments.selectAppointmentType')}: {" "}
                        <select id="appointmentType" className="appointmentTypeList" 
                                onChange={handleChange} value={hospitalAppointments.appointmentType}>
                            <option value="Both"> {t('general.both')} </option>
                            <option value="Thrombocytes" >{t('general.Thrombocytes')}</option>
                            <option value="Granulocytes">{t('general.Granulocytes')}</option>
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
                <div className="mx-4 mb-2 text-right" style={{ fontSize: "12px" }}><span>results:</span><b> {selectedInputs.length}</b></div>
            </div>
            <ul className="deleteTableHeader">
                <li className="deleteTableEntries">{t('general.date')}</li>
                <li className="deleteTableEntries">{t('dashboard.Time')}</li>
                <li className="deleteTableEntries">{t('general.Type')}</li>
                <li className="deleteTableEntries">{t('general.hospital')}</li>
                <li className="deleteTableEntries"></li>
            </ul>
            <div className="contain">
                {selectedInputs.map((Details, id) => {
                    appointmentDate = moment(Details.data().datetime.toMillis()).format('DD/MM/YY');
                    appointmentTime = moment(Details.data().datetime.toMillis()).format('HH:mm');
                    hospitalName = getHospitalLangName(Details.data().hospitalID);

                    return (
                        <ul className='deleteRowContainer' id={Details.id}>
                            {editable.date && editable.id === Details.id ? (
                                <Fragment>
                                    <input className='editableInputsDB'
                                        id="date"
                                        type="text"
                                        defaultValue={appointmentDate}
                                        onChange={handleEditChange}>
                                    </input>
                                    <input className='editableInputsDB'
                                        id="time"
                                        type="text"
                                        defaultValue={appointmentTime}
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
                                        defaultValue={hospitalName}
                                        onChange={handleEditChange}>
                                    </input>
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        <li className='deleteAppRow deleteRowDate' id="date">
                                            {appointmentDate}</li>
                                        <li className='deleteAppRow deleteRowTime' id="time">
                                            {appointmentTime}</li>
                                        <li className='deleteAppRow deleteRowAppointmentType' id="appointmentType">
                                            {Details.data().appointmentType}</li>
                                        <li className='deleteAppRow deleteRowHospitalName ' id="hospitalName">
                                            {hospitalName}</li>
                                        <li className='deleteAppRow deleteRowUserName ' id="userName">
                                            {Details.data().userID ? <span className="highlight text-center"> {t('editDeleteApp.reservedBy')}: {Details.data().userID} </span> : Details.data().datetime.seconds > (Date.now() / 1000) ? <span className="greenhighlight"> {t('editDeleteApp.notReserved')}</span> : <span style={{ color: "red" }} > {t('editDeleteApp.expired')}</span>}</li>
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
                                            <button className="close" onClick={close}>
                                                X
                                            </button>
                                            <div className="content">
                                            {t('editDeleteApp.deleteAppConfirm')} ?
                                            </div>
                                            <div className="actions">
                                                <button
                                                    id={Details.id}
                                                    className="yesButton"
                                                    onClick={(e) => {
                                                        deleteAppointment(e.target.id)
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
                    )}
                )}
            </div>
        </Fragment >
    )
}

export default DeleteAppointments