import { db } from '../components/firebase/firebase';
const languageSelected = localStorage.getItem("i18nextLng");

export const getAllHospitals = async () => {
    const hospitals = await db.collection('Hospitals').get();
    
    return hospitals.docs.map(hospitalDetails => {
        const hospitalData = hospitalDetails.data();
        
        return languageSelected == "en" ? 
            { ...hospitalData, currLangName: hospitalData.hospitalName } 
            : 
            { ...hospitalData, currLangName: hospitalData.hebName } 
    });
};

export const getHospitalLangName = async (hospitalId) => {
    const hospital = await db.collection('Hospitals').doc(hospitalId).get();

    return languageSelected == "en" ? hospital.data().hospitalName : hospital.data().hebName;
}