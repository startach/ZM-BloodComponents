import React from 'react'

import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import "../components/Dashboard/dashboard.css"
import OnAirDonations from '../components/OnAirDonations/OnAirDonations'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import {useTranslation} from 'react-i18next';

const DonationsManagement = () => {
    const { t } = useTranslation();
    return (
            <ScreenContainer>
                <MenuHeader title={t('burgerMenu.onAirDonations')}  icon='burger'></MenuHeader>
                <OnAirDonations />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>
    )
}


export default DonationsManagement
