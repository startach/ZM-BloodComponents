import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import VerificationList from '../components/verificationList'
import BottomNavBar from '../components/BottomNavBar/BottomBar'





const AppointmentVerification = () => {
    return (

        <div>
            <div className="header"></div>
            <ScreenContainer>
                <MenuHeader title="Appointment Verification" icon='burger'></MenuHeader>
                <VerificationList />
                <BottomNavBar />
            </ScreenContainer>
            <div className="footer"></div>
        </div>

    )
}

export default AppointmentVerification
