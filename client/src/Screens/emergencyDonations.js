import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import EmergencyDonations from '../components/EmergencyDontations/EmergencyDonations'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import MenuHeader from '../components/MenuHeader'

function Login() {
    return (
        <Fragment>
            <div className="header"></div>
            <ScreenContainer>
                <MenuHeader title="Emergency Donations" icon='burger'></MenuHeader>
                <EmergencyDonations />
                <BottomNavBar />
            </ScreenContainer>
            <div className="footer"></div>
        </Fragment>
    )
}

export default Login
