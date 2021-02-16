import React from "react";
import "./App.css";
import Header from "./components/Header";
import AddAppointmentsScreenContainer from "./screens/addAppointments/AddAppointmentsScreenContainer";

function App() {
  return (
    <div className="App">
      <Header />

      <AddAppointmentsScreenContainer />
    </div>
  );
}

export default App;
