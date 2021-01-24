import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const UserRoute = ({
    component: Component,
    isAuthenticated,
    userLevel,
    ...rest
}) => (
   
    <Route {...rest} component={(props)=> 
            isAuthenticated ? (
                <Component {...props} />  
            ):(
                <Redirect to="/login" />
            )
    } />
    
) 

export default UserRoute

