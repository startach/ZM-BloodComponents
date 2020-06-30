import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PublicRoute = ({
    component: Component,
    isAuthenticated,
    userLevel,
    ...rest
}) => ( 
    <Route {...rest} component={(props)=> 
            isAuthenticated ? (
                <Redirect to="/dashboard" />
                
            ):(
                <Component {...props} />
            )
    } />
    
)

export default PublicRoute