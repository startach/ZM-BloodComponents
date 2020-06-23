import React from 'react'
import ScreenContainer from '../components/screen'
import LoginForm from '../components/loginForm'
import { useHistory} from 'react-router-dom'
import { auth } from '../components/firebase/firebase'

function Login() {
    const history = useHistory();
    //redirect user to dashboard page if he is logged in
    // auth.onAuthStateChanged(async user => {
    //     if (user) 
    //         history.push('/dashboard')
    // });
    if (localStorage.getItem('userid'))
        history.push('/dashboard')
    
    return (
        <ScreenContainer>
            <LoginForm />
        </ScreenContainer>
    )
}

export default Login
