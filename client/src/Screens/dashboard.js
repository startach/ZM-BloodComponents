import React from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import DashboardMain from "../components/Dashboard/Dashboard.Main"
import "../components/Dashboard/dashboard.css"


const Dashboard = () => {
    
    return (
        <ScreenContainer>
            <MenuHeader title="Dashboard" icon='burger'></MenuHeader>
            <DashboardMain />
        </ScreenContainer>
    )
}

export default Dashboard