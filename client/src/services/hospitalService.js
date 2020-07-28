import { db } from '../components/firebase/firebase';

export const getAllHospitals = () => {
    return (db.collection('Hospitals').get());
}