import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import UserPage from '../components/UserPage/UserPage'
import BottomNavBar from '../components/BottomNavBar/BottomBar'


const User = () => {

    return (
        <div>
            <MenuHeader title="." icon='burger'></MenuHeader>
            <UserPage />
            <BottomNavBar />
        </div>
    )
}


export default User
