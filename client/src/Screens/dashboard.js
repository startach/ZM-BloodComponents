import React from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import DashboardMain from "../components/Dashboard/Dashboard.Main"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'


const Dashboard = () => {
    
    return (
     
            <MenuHeader title="Dashboard" icon='burger'></MenuHeader>
            <DashboardMain>
            </DashboardMain>
    )
}

export default Dashboard