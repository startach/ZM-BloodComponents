import React from 'react'
import ScreenContainer from '../components/screen'
import VerificationList from '../components/verificationList'
import MenuHeader from '../components/MenuHeader'
import Login from '../components/Login/Login'

const AppointmentVerification = () => {
    return (
        <ScreenContainer>
            <MenuHeader icon = "burger" title = "Appiontment Verification"/>
            <VerificationList/>

        </ScreenContainer>

    )
}

export default AppointmentVerification
