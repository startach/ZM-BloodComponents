import React from 'react'
import ScreenContainer from '../components/screen'
import EmergencyDonations
  from '../components/EmergencyDontations/EmergencyDonations'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import MenuHeader from '../components/MenuHeader'

import {useTranslation} from 'react-i18next';

function Login() {
    const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title= {t('burgerMenu.emergencyDonation')}  icon='burger'></MenuHeader>
                <EmergencyDonations />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>
    )
}

export default Login
