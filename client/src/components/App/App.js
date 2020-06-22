import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PreviousAppointments from '../../Screens/previousAppointments'
import AppointmentVerification from '../../Screens/appointmentVerification'
import './App.css';
import Dashboard from '../../Screens/dashboard';
import NotFound from '../NotFound'
import Login from '../../Screens/login'
import UserPage from '../UserPage/UserPage'
import Register from '../../Screens/register'
import AddAppointment from '../../Screens/addAppointment'



function App() {
  return (

    <Router>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />


        <Route path='/prevapp' component={PreviousAppointments} />
        <Route path='/appver' component={AppointmentVerification} />
        <Route path='/add' component={AddAppointment} />
        <Route path='/user' component={UserPage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/not-found' component={NotFound} />
        <Redirect from='/' exact to="/dashboard" />
        <Redirect to='/not-found' />
      </Switch>
    </Router>

  );
}

export default App;
