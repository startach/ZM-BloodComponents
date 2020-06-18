import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserPage from './Components/UserPage/UserPage'
import Questionnaire from './Components/Questionnaire/Questionnaire'

function App() {
  return (
    <div className="App">
      <UserPage />
      <Questionnaire />
    </div>
  );
}

export default App;
