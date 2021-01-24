import React from 'react'
import {Redirect, Route} from 'react-router-dom'

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