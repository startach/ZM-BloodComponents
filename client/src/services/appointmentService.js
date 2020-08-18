import { db } from '../components/firebase/firebase';

export const getAllAppointments = () => {
    return (db.collection('Appointments').get());
}

export const updateAppointment = (id, content) => {
    db.collection('Appointments').doc(id).update(content);
}

export const getAppointmentsForUser = (userID) => {
    return (db.collection('Appointments').where('userID', '==', userID));
}

export const getAvailableAppointmentsForHospital = (hospitalName) => {
    return (db.collection('Appointments').where('userID', '==', null).where('hospitalName', '==', hospitalName));
}