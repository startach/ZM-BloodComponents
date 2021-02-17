import React from "react";
import "./App.css";
import CoordinatorRouter from "./navigation/CoordinatorRouter";
import { BrowserRouter as Router } from "react-router-dom";
import WithGlobalTheme from "./HOCs/withGlobalTheme";

function App() {
  return (
    <div className="App">
      <WithGlobalTheme>
        <Router>
          <CoordinatorRouter />
        </Router>
      </WithGlobalTheme>
    </div>
  );
}

export default App;
