import React, { useState } from "react";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { Route, Switch } from "react-router-dom";
import { CoordinatorScreen } from "./CoordinatorScreen";
import AddAppointmentsScreenContainer from "../screens/addAppointments/AddAppointmentsScreenContainer";
import { LoginStatus } from "@zm-blood-components/common";
import CoordinatorSignInScreenContainer from "../screens/authentication/CoordinatorSignInScreenContainer";

export default function CoordinatorRouter() {
  const [loginStatus] = useState(LoginStatus.LOGGED_OUT);

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    return <CoordinatorSignInScreenContainer />;
  }

  if (loginStatus === LoginStatus.UNKNOWN) {
    return <LoadingScreen />;
  }

  return (
    <Switch>
      <Route path={"/" + CoordinatorScreen.SCHEDULED_APPOINTMENTS}></Route>
      <Route path={"/" + CoordinatorScreen.DONORS}></Route>
      <Route path={["/" + CoordinatorScreen.ADD_APPOINTMENTS, "*"]}>
        <AddAppointmentsScreenContainer />
      </Route>
    </Switch>
  );
}
