import React from "react";
import "./App.css";
import Header from "./components/Header";
import CoordinatorRouter from "./navigation/CoordinatorRouter";
import { BrowserRouter as Router } from "react-router-dom";
import WithGlobalTheme from './HOCs/withGlobalTheme';

function App() {
  return (
    <div className="App">
      <WithGlobalTheme>
      <Router>
        <Header />

        <CoordinatorRouter />
      </Router>
      </WithGlobalTheme>
    </div>
  );
}

export default App;
