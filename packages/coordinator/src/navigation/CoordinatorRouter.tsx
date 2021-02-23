import React, { useEffect, useState } from "react";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { Route, Switch } from "react-router-dom";
import { CoordinatorScreen } from "./CoordinatorScreen";
import AddAppointmentsScreenContainer from "../screens/addAppointments/AddAppointmentsScreenContainer";
import { LoginStatus } from "@zm-blood-components/common";
import CoordinatorSignInScreenContainer from "../screens/authentication/CoordinatorSignInScreenContainer";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import CoordinatorHeaderContainer from "../components/Header/CoordinatorHeaderContainer";
import ManageAppointmentsScreenContainer from "../screens/manageAppointmentsScreen/ManageAppointmentsScreenContainer";

export default function CoordinatorRouter() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);

  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange(setLoginStatus);
  }, [loginStatus]);

  let content = <LoadingScreen />;

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    content = <CoordinatorSignInScreenContainer />;
  }

  if (loginStatus === LoginStatus.LOGGED_IN) {
    content = (
      <Switch>
        <Route path={"/" + CoordinatorScreen.SCHEDULED_APPOINTMENTS}>
          <ManageAppointmentsScreenContainer />
        </Route>
        <Route path={"/" + CoordinatorScreen.DONORS}></Route>
        <Route path={["/" + CoordinatorScreen.ADD_APPOINTMENTS, "*"]}>
          <AddAppointmentsScreenContainer />
        </Route>
      </Switch>
    );
  }

  return (
    <div>
      <CoordinatorHeaderContainer
        showSignOutButton={loginStatus === LoginStatus.LOGGED_IN}
      />
      {content}
    </div>
  );
}