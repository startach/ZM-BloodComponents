import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import VerificationList from '../components/verificationList'
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';



const AppointmentVerification = () => {
const { t } = useTranslation();
    

    return (

            <ScreenContainer>
                <MenuHeader title={t('screens.verification')} icon='burger'/>
                <VerificationList />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>

    )
}

export default AppointmentVerification
