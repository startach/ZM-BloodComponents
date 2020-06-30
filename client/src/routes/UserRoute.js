import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const UserRoute = ({
    component: Component,
    isAuthenticated,
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

