import { db, auth } from '../components/firebase/firebase';

export const getAllUsers = () => {
    return (db.collection('users').get());
}

export const getUserById = (userId) => {
    return (db.collection('users').doc(userId).get());
}

export const getUserAccessLevel = async () => {
    let authClaims = {}
    
    auth.onAuthStateChanged((user) => {
        const userToken = await user.getIdTokenResult()

        authClaims = userToken.claims
    })
    
    // Quickfix to make hospitalCord accessLevel
    if (userToken) {
        const uid = auth.currentUser.uid
        const userDoc = await db.collection('users').doc(uid).get()
        const dbAccessLevel = userDoc.data().accessLevel
        if (dbAccessLevel) {
            return dbAccessLevel
        }
    }

    return authClaims
}