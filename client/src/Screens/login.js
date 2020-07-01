import React from 'react'
import FullScreenContainer from '../components/fullscreen/fullscreen'
import LoginForm from '../components/loginForm'
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();
    if (localStorage.getItem('userid'))
        history.push('/dashboard')

    return (

        <FullScreenContainer>
            <LoginForm />

        </FullScreenContainer>

    )
}

export default Login
