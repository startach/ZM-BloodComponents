import { db } from '../components/firebase/firebase';

export const getAllAppointments = () => {
    return (db.collection('appointments').get());
}

export const getAppointment = (id) => {
    db.collection('appointments').doc(id).get();
}

export const getAppointmentsForHospital = (hospitalID) => {
    return (db.collection('appointments').where('hospitalID', '==', hospitalID));
}

export const updateAppointment = (id, content) => {
    db.collection('appointments').doc(id).update(content);
}

export const getAppointmentsForUser = (userID) => {
    return (db.collection('appointments').where('userID', '==', userID));
}

export const getDonationsForUser = (userID) => {
    return (db.collection('appointments').where('userID', '==', userID).where("hasDonated", "==", true));
}

export const getAvailableAppointmentsForHospital = (hospitalID) => {
    return (db.collection('appointments').where('userID', '==', null).where('hospitalID', '==', hospitalID));
}

export const addAppointment = (newAppointment) => {
    db.collection('appointments').add(newAppointment);
}

export const deleteAppointment = (id) => {
    db.collection('appointments').doc(id).delete();
}

export const getAppointmentsByFilters = (filters) => {
    let appointmentsQuery = db.collection('appointments');
    for(const [key, value] of Object.entries(filters)) {
        appointmentsQuery = appointmentsQuery.where(`${key}`, '==', value);
    }
    
    return appointmentsQuery.get();
}

export const getAllOccupiedAppointments = async () => {
    const appointmentsQuery = await db.collection("appointments")
      .where("userID", ">", "").get();
  
    return appointmentsQuery.docs.map(occupied => {
      return { ...occupied.data(), id: occupied.id }
    });
  }

