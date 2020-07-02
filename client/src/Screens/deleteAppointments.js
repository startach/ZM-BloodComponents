import React from 'react'
import DeleteElements from '../components/deleteAppointments'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import BottomNavBar from '../components/BottomNavBar/BottomBar'

function DeleteAppointments () {
    return (
            <ScreenContainer>
                <MenuHeader title="Edit/Delete Appointments" icon='burger'/>
                <DeleteElements />
                <BottomNavBar />
            </ScreenContainer>
    )
}

export default DeleteAppointments
