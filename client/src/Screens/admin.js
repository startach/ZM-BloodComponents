import React from 'react'

import MenuHeader from '../components/MenuHeader'

import "../components/Dashboard/dashboard.css"
import Admin from '../components/Admin/Admin'


const Dashboard = () => {

    return (
        <div>
            <MenuHeader title="Admin Controls" icon='burger'></MenuHeader>
            <Admin />
        </div>
    )
}

export default Dashboard