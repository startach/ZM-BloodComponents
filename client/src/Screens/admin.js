import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import Admin from '../components/Admin/Admin'


const AdminPage = () => {

    return (
        <div>
            <div className="header"></div>
            <ScreenContainer>
                <MenuHeader title="Admin Controls" icon='burger'></MenuHeader>
                <Admin />
                <BottomNavBar />
            </ScreenContainer>
        </div>
    )
}


export default AdminPage
