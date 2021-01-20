import { db } from '../components/firebase/firebase';

export const getAllHospitals = async () => {
    const hospitals = await db.collection('hospitals').get();
    
    return hospitals.docs.map(hospitalDetails => {
       return { ...hospitalDetails.data(), id: hospitalDetails.id };
    });
};