import { db, auth } from '../components/firebase/firebase';

export const getAllUsers = () => {
    return (db.collection('users').get());
}

export const getUserById = (userId) => {
    return (db.collection('users').doc(userId).get());
}

export const getUserClaims = async () => {
    let user = {}
    const getUser = new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            resolve(user)
        })
    })
    user = await getUser
    const userToken = await user.getIdTokenResult()

    return userToken.claims
}