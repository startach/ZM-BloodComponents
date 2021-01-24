import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import UserPage from '../components/UserPage/UserPage'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import {useTranslation} from 'react-i18next';

const User = () => {
    const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title={t('burgerMenu.profile')}  icon='burger'></MenuHeader>
                <UserPage />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>
    )
}


export default User
