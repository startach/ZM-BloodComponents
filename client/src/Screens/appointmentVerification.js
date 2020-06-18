import React from 'react'
import ScreenContainer from '../components/screen'
import VerificationList from '../components/verificationList'
import MenuHeader from '../components/MenuHeader'

const AppointmentVerification = () => {
    return (
        <ScreenContainer>
            <MenuHeader icon = "burger" title = "Appointment Verification"/>
            <VerificationList/>
        </ScreenContainer>
    )
}

export default AppointmentVerification
