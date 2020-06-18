import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard.Main'
import BottomBar from './Components/BottomNavBar/BottomBar'

function App() {
  return (
    <div className="App">
      <Dashboard />
      <BottomBar />
    </div>
  );
}

export default App;
