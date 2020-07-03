import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import MainDashboard from "../components/Dashboard/Dashboard.NoAppoin"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const Dashboard = () => {
     const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title={t('burgerMenu.dashboard')} icon='burger'></MenuHeader>
                <MainDashboard> </MainDashboard>
                <BottomNavBar />
            </ScreenContainer>
           

    )
}

export default Dashboard