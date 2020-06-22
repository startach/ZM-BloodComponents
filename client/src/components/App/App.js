import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
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
import Questions from '../Questionnaire/Questionnaire'
import Verfication from '../verificationList/verificationList'
import EmergencyDonations from '../../Screens/emergencyDonations'

function App() {
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
        <Route path='/verfication' component={Verfication} />



        <Redirect from='/' exact to="/dashboard" />
        <Redirect to='/not-found' />
      </Switch>
    </Router>

  );
}

export default App;
