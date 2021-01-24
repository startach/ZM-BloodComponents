import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import Admin from '../components/Admin/Admin'
import {useTranslation} from 'react-i18next';

const AdminPage = () => {
    const { t } = useTranslation();

    return (
            <ScreenContainer>
                <MenuHeader title={t('screens.adminControls')} icon='burger'/>
                <Admin />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>
    )
}


export default AdminPage
