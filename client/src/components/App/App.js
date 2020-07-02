import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import PreviousAppointments from '../../Screens/previousAppointments'
import AppointmentVerification from '../../Screens/appointmentVerification'
import './App.css';
import Dashboard from '../../Screens/dashboard';
import NotFound from '../NotFound'
import Login from '../../Screens/login'
import User from '../../Screens/user'
import Register from '../../Screens/register'
import AddAppointment from '../../Screens/addAppointment'
import Admin from '../../Screens/admin'
import Questions from '../../Screens/Questionnaire'
import EmergencyDonations from '../../Screens/emergencyDonations'
import { firebase, auth } from '../../components/firebase/firebase'
import DeleteEditAppointments from '../../Screens/deleteAppointments'
import UserRoute from '../../routes/UserRoute';
import PublicRoute from '../../routes/PublicRoute';
import CordRoute from '../../routes/CordRoute';
import AdminRoute from '../../routes/AdminRoute';
import { ForgotPassword } from '../forgetPassword/ForgotPassword';


import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


function App() {
  const [userClaims, setUserClaims] = useState(localStorage.getItem('userLevel'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userid'))



  return (
   
    <Router>
      <Switch>
        <UserRoute path='/dashboard' component={Dashboard} isAuthenticated={isAuthenticated} userLevel={userClaims}/>
        <UserRoute path='/prevapp' component={PreviousAppointments} isAuthenticated={isAuthenticated} userLevel={userClaims}/>
        <UserRoute path='/verfication' component={AppointmentVerification} isAuthenticated={isAuthenticated} userLevel={userClaims}/>
        <UserRoute path='/user' component={User} isAuthenticated={isAuthenticated} userLevel={userClaims}/>
        <UserRoute path='/questions' component={Questions} isAuthenticated={isAuthenticated} userLevel={userClaims}/>

        <CordRoute path='/add' component={AddAppointment} isAuthenticated={isAuthenticated} userLevel={userClaims}/>
        <CordRoute path='/emergency' component={EmergencyDonations} isAuthenticated={isAuthenticated} userLevel={userClaims}/>
        <CordRoute path='/edit-delete' component={DeleteEditAppointments} isAuthenticated={isAuthenticated} userLevel={userClaims}/>

        <AdminRoute path='/admin' component={Admin} isAuthenticated={isAuthenticated} userLevel={userClaims}/>

        <PublicRoute path='/not-found' component={NotFound} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/register' component={Register} /> 

        <Redirect from='/' exact to="/login" />
        <Redirect to='/not-found' />
      </Switch>
    </Router>
  );
}

export default App;
