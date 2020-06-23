import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import VerificationList from '../components/verificationList'

const AppointmentVerification = () => {
    return (
        <Fragment>
            <div className="header"></div>
            <ScreenContainer>
                <MenuHeader icon="burger" title="Appointment Verification" />
                <VerificationList />

            </ScreenContainer>
            <div className="footer"></div>
        </Fragment>

    )
}

export default AppointmentVerification
