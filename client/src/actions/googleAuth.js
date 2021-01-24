import {firebase, googleProvider} from '../components/firebase/firebase'
import React, {useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {updateUser} from '../services/userService';

export const SignInWithGoogle = () => {
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            history.push('/dashboard');
         }, 10000);
       },[]);

    return () => {
        return firebase.auth().signInWithPopup(googleProvider)
        .then(async result =>{
            console.log(result.credential.accessToken)
            const user = result.user
            console.log(user)
            localStorage.setItem('userid', user.uid)
            localStorage.setItem('photoURL', user.photoURL)
            //TODO if userid exists IN USERS db then use update IF NULL use set
            await updateUser(user.uid ,{ name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                photoURL: user.photoURL });

        })
        .then(() => {
            history.push('/dashboard');
        })
        .catch( err => {
            console.log(err)
        })       
    }
}

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}