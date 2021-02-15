import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Dashboard, BookedAppointments, UsersSearch, LogIn } from '../pages';

import NavBar from '../NavBar';
const flag = localStorage.getItem('userLevel');

const App = () => (
  <Router>
    <NavBar />
    {!flag ? <LogIn /> :
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/bookedAppointments" component={BookedAppointments} />
        <Route exact path="/usersSearch" component={UsersSearch} />
      </Switch>}
  </Router>
);

export default App;
