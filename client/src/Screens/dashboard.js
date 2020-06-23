import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import MainDashboard from "../components/Dashboard/Dashboard.NoAppoin"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'


const Dashboard = () => {


    return (
        <Fragment>
            <div className="header"></div>
            <ScreenContainer>
                <MenuHeader title="Dashboard" icon='burger'></MenuHeader>
                <MainDashboard> </MainDashboard>
            </ScreenContainer>

            <BottomNavBar />
            <div className="footer"></div>

        </Fragment>

    )
}

export default Dashboard