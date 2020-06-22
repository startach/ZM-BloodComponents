import React from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'
import DashboardMain from "../components/Dashboard/Dashboard.Main"
import "../components/Dashboard/dashboard.css"
import BottomNavBar from '../components/BottomNavBar/BottomBar'
import AddAppointments from '../components/AddAppointments/AddAppointments'


const AddAppointment = () => {

    return (
        <div>
            <MenuHeader title="." icon='burger'></MenuHeader>
            <AddAppointments />
            <BottomNavBar />
        </div>
    )
}

export default AddAppointment