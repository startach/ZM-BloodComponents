import React, { Fragment } from 'react'
import ScreenContainer from '../components/screen'
import AppointmentsList from '../components/appointmentsList'
import AppointmentsEntry from '../components/appointmentsEntry'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

const PreviousAppointments = () => {

    return (

            <ScreenContainer>
                <MenuHeader icon="burger" title="Previous Appointments" />
                <AppointmentsList />
                <AppointmentsEntry />
                <BottomNavBar />
            </ScreenContainer>

    )
}

export default PreviousAppointments
