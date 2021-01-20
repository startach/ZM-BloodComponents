import { db, auth } from '../components/firebase/firebase';

export const getAllUsers = async () => {
    const usersQuery = await db.collection("users").get();
    return usersQuery.docs.map(user => {
      return { ...user.data(), id: user.id }
    });
}

export const getUserById = (userId) => {
    return (db.collection('users').doc(userId).get());
}

export const updateUser = (userId, data) => {
    db.collection('users').doc(userId).update(data);
} 

export const setUser = (userId, data) => {
    db.collection('users').doc(userId).set(data);
}

export const getUsersByBloodType = (bloodType) => {
    return (db.collection('users').where("bloodType", "==", bloodType).get());
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