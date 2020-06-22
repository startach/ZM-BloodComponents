import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import EmergencyDonations from '../components/EmergencyDontations/EmergencyDonations'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import MenuHeader from '../components/MenuHeader'

function Login() {
    return (
        <Fragment>
            <MenuHeader title="." icon='burger'></MenuHeader>
            <EmergencyDonations />
            <BottomNavBar />
        </Fragment>
    )
}

export default Login
