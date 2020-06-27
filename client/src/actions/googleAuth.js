import { firebase, googleProvider, db } from '../components/firebase/firebase'
import React, {useEffect} from "react";
import { useHistory, Redirect } from 'react-router-dom'


export const SignInWithGoogle = () => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            history.push('/dashboard');
         }, 10000);
       },[]);

    return () => {
        return firebase.auth().signInWithPopup(googleProvider)
        .then( async result =>{
            console.log(result.credential.accessToken)
            const user = result.user
            console.log(user)
            localStorage.setItem('userid', user.uid)
            localStorage.setItem('photoURL', user.photoURL)
            await db.collection('users').doc(user.uid).set({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                photoURL: user.photoURL
            })

        }).catch( err => {
            console.log(err)
        })       
    }
}

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}