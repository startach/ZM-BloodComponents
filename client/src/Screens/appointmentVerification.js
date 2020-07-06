import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import VerificationList from '../components/verificationList'
import BottomNavBar from '../components/BottomNavBar/BottomBar'





const AppointmentVerification = () => {
    return (

            <ScreenContainer>
                <MenuHeader title="Appointment Verification" icon='burger'/>
                <VerificationList />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>

    )
}

export default AppointmentVerification
