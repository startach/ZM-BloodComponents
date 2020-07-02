import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import EmergencyDonations from '../components/EmergencyDontations/EmergencyDonations'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import MenuHeader from '../components/MenuHeader'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

function Login() {
    const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title= {t('burgerMenu.emergencyDonation')}  icon='burger'></MenuHeader>
                <EmergencyDonations />
                <BottomNavBar />
            </ScreenContainer>
    )
}

export default Login
