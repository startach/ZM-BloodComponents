import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import DashboardMain from "../components/Dashboard/Dashboard.Main"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import Admin from '../components/Admin/Admin'


const AdminPage = () => {

    return (
        <div>
            <MenuHeader title="Admin" icon='burger'></MenuHeader>
            <Admin />
        </div>
    )
}


export default AdminPage
