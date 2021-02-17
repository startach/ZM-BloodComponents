import React from "react";
import "./App.css";
import { Hospital } from "@zm-blood-components/common";

function App() {
  const [hospital] = React.useState(Hospital.TEL_HASHOMER);

  return <div className="App">{hospital}</div>;
}

export default App;
