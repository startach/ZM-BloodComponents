import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PreviousAppointments from '../../Screens/previousAppointments'
import AppointmentVerification from '../../Screens/appointmentVerification'
import './App.css';

function App() {
  return (
 
    <Router>

      <Switch>
        <Route path='/prevapp' component={PreviousAppointments} />

        <Route path='/appver' component={AppointmentVerification} />

      </Switch>
    </Router>

  );
}

export default App;
