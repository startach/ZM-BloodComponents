import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PreviousAppointments from '../../Screens/previousAppointments'
import AppointmentVerification from '../../Screens/appointmentVerification'
import './App.css';
import Dashboard from '../../Screens/dashboard';
import NotFound from '../NotFound'
import BottomNavBar from '../BottomNavBar/BottomBar'

function App() {
  return (
 
    <Router>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/prevapp' component={PreviousAppointments} />
        <Route path='/appver' component={AppointmentVerification} />
        <Route path='/not-found' component={NotFound} />
        <Redirect from='/' exact to="/dashboard" />
        <Redirect to='/not-found' />
      </Switch>
      <BottomNavBar />
    </Router>

  );
}

export default App;
