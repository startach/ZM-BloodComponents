import React from "react";
import "./App.css";
import CoordinatorRouter from "./navigation/CoordinatorRouter";
import { BrowserRouter as Router } from "react-router-dom";
import WithGlobalTheme from "./HOCs/withGlobalTheme";
import Div100vh from "react-div-100vh";

function App() {
  return (
    <Div100vh className="App">
      <WithGlobalTheme>
        <Router>
          <CoordinatorRouter />
        </Router>
      </WithGlobalTheme>
    </Div100vh>
  );
}

export default App;
