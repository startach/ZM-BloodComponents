import React from 'react'
import ScreenContainer from '../components/screen'
import AppointmentsList from '../components/appointmentsList'
import AppointmentsEntry from '../components/appointmentsEntry'
import MenuHeader from '../components/MenuHeader'

const PreviousAppointments = () => {

    return (

        <ScreenContainer>

            <MenuHeader icon = "burger" title = "Previous Appointments"/>

            <AppointmentsList />

            <AppointmentsEntry />


        </ScreenContainer>

    )
}

export default PreviousAppointments
