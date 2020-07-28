import { db } from '../components/firebase/firebase';

export const getAllUsers = () => {
    return (db.collection('users').get());
}