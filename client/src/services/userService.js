import { db } from '../components/firebase/firebase';

export const getAllUsers = () => {
    return (db.collection('users').get());
}

export const getUserById = (userId) => {
    return (db.collection('users').doc(userId).get());
}