import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
function App() {
  return (
  <div className="App">
      <Router>
        <Register/>
      </Router>
    </div>
  );
}

export default App;
