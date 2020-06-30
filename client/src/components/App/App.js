import React, {useEffect, useState} from 'react';
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
import Verfication from '../verificationList/verificationList'
import EmergencyDonations from '../../Screens/emergencyDonations'
import { firebase, auth } from '../../components/firebase/firebase'
import DeleteEditAppointments from '../../Screens/deleteAppointments'
import { ForgotPassword } from '../forgetPassword/ForgotPassword';

function App() {
  // let history = useHistory();
 const [userClaims, setUserClaims] = useState({})
  let isUser = false
  useEffect(() => {
  auth.onAuthStateChanged( user => {
     if(user){
      isUser=true
      user.getIdTokenResult().then(data => {
        setUserClaims(data.claims)
      }) 
    }
    })}, [])

  //     if(history.location.pathname === '/')
  //       history.push('/dashboard')


  return (
    <Router>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/prevapp' component={PreviousAppointments} />
        <Route path='/appver' component={AppointmentVerification} />
        <Route path='/add' component={AddAppointment} />
        <Route path='/admin' component={Admin} />
        <Route path='/emergency' component={EmergencyDonations} />
        <Route path='/user' component={User} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/not-found' component={NotFound} />
        <Route path='/questions' component={Questions} />
        <Route path='/edit-delete' component={DeleteEditAppointments} />
        <Route path='/verfication' component={AppointmentVerification} />
        <Route path='/passwordreset' component={ForgotPassword} />
        <Redirect from='/' exact to="/login" />
        <Redirect to='/not-found' />
      </Switch>
    </Router>
  );
}

export default App;
