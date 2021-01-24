import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const AdminRoute = ({
    component: Component,
    isAuthenticated,
    userLevel,
    ...rest
}) => (
    <Route {...rest} component={(props) => 
            isAuthenticated && userLevel==="admin" ? (
                <Component {...props} />
            ):(
                <Redirect to="/login" />
            )
    } />
)

export default AdminRoute