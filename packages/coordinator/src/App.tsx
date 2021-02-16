import React from "react";
import "./App.css";
import Header from "./components/Header";
import CoordinatorRouter from "./navigation/CoordinatorRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <CoordinatorRouter />
      </Router>
    </div>
  );
}

export default App;
