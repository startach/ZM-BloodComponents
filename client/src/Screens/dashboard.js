import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import DashboardMain from "../components/Dashboard/Dashboard.Main"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'


const Dashboard = () => {


    return (
        <Fragment>
            <div className="header"></div>
            <ScreenContainer>
                <MenuHeader title="Dashboard" icon='burger'></MenuHeader>
                <DashboardMain> </DashboardMain>
            </ScreenContainer>

            <BottomNavBar />
            <div className="footer"></div>

        </Fragment>

    )
}

export default Dashboard