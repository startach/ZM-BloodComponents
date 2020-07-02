import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import MainDashboard from "../components/Dashboard/Dashboard.NoAppoin"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'


const Dashboard = () => {
    return (
            <ScreenContainer>
                <MenuHeader title="Dashboard" icon='burger'/>
                <MainDashboard> </MainDashboard>
                <BottomNavBar />
            </ScreenContainer>
           

    )
}

export default Dashboard