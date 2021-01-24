import React from 'react'
import ScreenContainer from '../components/screen'
import AppointmentsList from '../components/appointmentsList'
import AppointmentsEntry from '../components/appointmentsEntry'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import {useTranslation} from 'react-i18next';

const PreviousAppointments = () => {
    const { t } = useTranslation();

    return (

            <ScreenContainer>
                <MenuHeader icon="burger" title={t('burgerMenu.previousAppointments')} />
                <AppointmentsList />
                <AppointmentsEntry />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>

    )
}

export default PreviousAppointments
