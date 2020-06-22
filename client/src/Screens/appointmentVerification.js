import React from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import VerificationList from '../components/verificationList'

const AppointmentVerification = () => {
    return (
        <ScreenContainer>
            <MenuHeader icon="burger" title="Appointment Verification" />
            <VerificationList />

        </ScreenContainer>

    )
}

export default AppointmentVerification
