import React from 'react'
import ScreenContainer from '../components/screen'
import MenuHeader from '../components/MenuHeader'



const Dashboard = () => {
    console.log(localStorage.getItem('userid'))
    return (
        <ScreenContainer>
            <MenuHeader title="Dashboard" icon='burger'></MenuHeader>
            
        </ScreenContainer>
    )
}

export default Dashboard