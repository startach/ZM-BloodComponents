import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import AppointmentsList from '../components/appointmentsList'
import AppointmentsEntry from '../components/appointmentsEntry'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const PreviousAppointments = () => {
    const { t } = useTranslation();

    return (
        <Fragment>

            <ScreenContainer>
                <div className="header"></div>
                <MenuHeader icon="burger" title={t('burgerMenu.previousAppointments')} />
                <AppointmentsList />
                <AppointmentsEntry />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>

        </Fragment>

    )
}

export default PreviousAppointments
