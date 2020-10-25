import React from 'react'
import FullScreenContainer from '../components/fullscreen/fullscreen'
import LoginForm from '../components/loginForm'
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory();
    const homePageUrl = localStorage.getItem('homepageUrl')
    if (localStorage.getItem('userid') && homePageUrl)
        history.push(homePageUrl)

    return (

        <FullScreenContainer>
            <LoginForm />
        </FullScreenContainer>

    )
}

export default Login
