import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import UserPage from '../components/UserPage/UserPage'
import BottomNavBar from '../components/BottomNavBar/BottomBar'


const User = () => {

    return (
            <ScreenContainer>
                <MenuHeader title="User Profile" icon='burger' />
                <UserPage />
                <BottomNavBar />
            </ScreenContainer>
    )
}


export default User
