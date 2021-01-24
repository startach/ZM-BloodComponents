import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import BrowseUsers from '../components/BrowseUsers/BrowseUsers'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import {useTranslation} from 'react-i18next';

const UsersBrowsing = () => {
    const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title={t('burgerMenu.usersBrowsing')}  icon='burger'></MenuHeader>
                <BrowseUsers />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>
    )
}


export default UsersBrowsing
