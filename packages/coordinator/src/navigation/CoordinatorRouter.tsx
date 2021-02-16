import React, { useState } from "react";
import LoadingScreen from "../screens/loading/LoadingScreen";
import CoordinatorLoginScreen from "../screens/authentication/CoordinatorLoginScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CoordinatorScreens } from "./CoordinatorScreens";
import AddAppointmentsScreenContainer from "../screens/addAppointments/AddAppointmentsScreenContainer";
import { LoginStatus } from "@zm-blood-components/common";

export default function CoordinatorRouter() {
  const [loginStatus] = useState(LoginStatus.LOGGED_IN);

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    return <CoordinatorLoginScreen />;
  }

  if (loginStatus === LoginStatus.UNKNOWN) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Switch>
        <Route path={"/" + CoordinatorScreens.SCHEDULED_APPOINTMENTS}></Route>
        <Route path={"/" + CoordinatorScreens.DONORS}></Route>
        <Route path={"*"}>
          <AddAppointmentsScreenContainer />
        </Route>
      </Switch>
    </Router>
  );
}
