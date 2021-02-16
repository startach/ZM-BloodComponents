import React from "react";
import "./App.css";
import Header from "./components/Header";
import CoordinatorRouter from "./navigation/CoordinatorRouter";

function App() {
  return (
    <div className="App">
      <Header />

      <CoordinatorRouter />
    </div>
  );
}

export default App;
