import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PreviousAppointments from '../../Screens/previousAppointments'
import './App.css';

function App() {
  return (

    <Router>

      <Switch>
        <Route path='/previousappointments' exact component={PreviousAppointments} />

      </Switch>
    </Router>

  );
}

export default App;
