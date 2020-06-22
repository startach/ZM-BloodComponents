import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PreviousAppointments from '../../Screens/previousAppointments'
import AppointmentVerification from '../../Screens/appointmentVerification'
import './App.css';
import Dashboard from '../../Screens/dashboard';
import NotFound from '../NotFound'
import Login from '../../Screens/login'
import UserPage from '../UserPage/UserPage'
import Register from '../../Screens/register'
import {Userid} from '../../store/user/useridContext'


function App() {
  const [id, setId] = useState('')
  return (
    <Router>
      <Switch>
        <Userid.Provider value={{id, setId}}>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/prevapp' component={PreviousAppointments} />
        <Route path='/appver' component={AppointmentVerification} />
        <Route path='/user' component={UserPage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/not-found' component={NotFound} />
        </Userid.Provider>
        <Redirect from='/' exact to="/login" />
        <Redirect to='/not-found' />
      </Switch>
    </Router>
  );
}

export default App;
