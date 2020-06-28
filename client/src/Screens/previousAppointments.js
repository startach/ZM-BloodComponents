import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import AppointmentsList from '../components/appointmentsList'
import AppointmentsEntry from '../components/appointmentsEntry'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

const PreviousAppointments = () => {

    return (
        <Fragment>

            <ScreenContainer>
                <div className="header"></div>
                <MenuHeader icon="burger" title="Previous Appointments" />
                <AppointmentsList />
                <AppointmentsEntry />
                <BottomNavBar />
                <div className="footer"></div>
            </ScreenContainer>

        </Fragment>

    )
}

export default PreviousAppointments
