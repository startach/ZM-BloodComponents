import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import EmergencyDonations from '../components/EmergencyDontations/EmergencyDonations'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import MenuHeader from '../components/MenuHeader'

function Login() {
    return (
            <ScreenContainer>
                <MenuHeader title="Emergency Donations" icon='burger' />
                <EmergencyDonations />
                <BottomNavBar />
            </ScreenContainer>
    )
}

export default Login
