import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase';

export const ForgotPassword = () => {
    const [emailValue, setEmailValue] = useState('');

const handleChange = (e) => {
    setEmailValue(e.target.value)
}


const handlePassReset = (e) => {
    console.log(emailValue);
    auth.sendPasswordResetEmail(emailValue)
    .then(() => {
        window.alert("An reset password email has been sent to you, Please check your email")
    })
    .catch((error) => {
        console.log(error);
    })
    
    e.preventDefault()
}

    return (
        <div>
            <form onSubmit={handlePassReset}>
            <p style={{textAlign:'justify'}}>Please enter your email address below and an email will with your information will be sent to it.</p>
            <label htmlFor='emailFieldForgot'>
                <input type='email' onChange={handleChange}  name='emailFieldForgot' placeholder='please insert your Email' />
            </label>
            <input type='submit' value="Reset password"/>
            </form>
        </div>
    )
}
