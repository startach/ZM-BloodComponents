import { db } from '../components/firebase/firebase';

export const getAllAppointments = () => {
    return (db.collection('Appointments').get());
}

export const updateAppointment = (id, content) => {
    db.collection('Appointments').doc(id).update(content);
}