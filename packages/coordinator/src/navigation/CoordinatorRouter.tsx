import React, { useEffect, useState } from "react";
import styles from "./CoordinatorRouter.module.scss";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { Redirect, Route, Switch } from "react-router-dom";
import { CoordinatorScreen } from "./CoordinatorScreen";
import AddAppointmentsScreenContainer from "../screens/addAppointments/AddAppointmentsScreenContainer";
import { Coordinator, LoginStatus } from "@zm-blood-components/common";
import CoordinatorSignInScreenContainer from "../screens/authentication/CoordinatorSignInScreenContainer";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import CoordinatorHeaderContainer from "../components/Header/CoordinatorHeaderContainer";
import ManageAppointmentsScreenContainer from "../screens/manageAppointmentsScreen/ManageAppointmentsScreenContainer";
import SearchDonorsScreenContainer from "../screens/serchDonorsScreen/SearchDonorsScreenContainer";
import ScheduledAppointmentsContainer from "../screens/scheduledAppointments/ScheduledAppointmentsScreenContainer";
import * as CoordinatorFunctions from "../firebase/CoordinatorFunctions";

const appVersion = process.env.REACT_APP_VERSION || "dev";

export default function CoordinatorRouter() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);
  const [appState, setAppState] = useState<{
    coordinator?: Coordinator;
    isFetching: boolean;
  }>({
    coordinator: undefined,
    isFetching: false,
  });

  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange((newLoginStatus) => {
      if (newLoginStatus === LoginStatus.LOGGED_IN) {
        setAppState({
          coordinator: undefined,
          isFetching: true,
        });
      }
      setLoginStatus(newLoginStatus);
    });
  }, [loginStatus]);

  useEffect(() => {
    if (loginStatus !== LoginStatus.LOGGED_IN) {
      setAppState({
        coordinator: undefined,
        isFetching: false,
      });
      return;
    }

    async function fetchData() {
      const coordinator = await CoordinatorFunctions.getCoordinator();

      setAppState({
        coordinator,
        isFetching: false,
      });
    }

    fetchData();
  }, [loginStatus]);

  let content: React.ReactNode;
  if (loginStatus === LoginStatus.UNKNOWN || appState.isFetching) {
    content = <LoadingScreen />;
  } else if (loginStatus === LoginStatus.LOGGED_OUT) {
    content = <CoordinatorSignInScreenContainer />;
  } else {
    const activeHospitalsForCoordinator =
      appState.coordinator?.activeHospitalsForCoordinator!;
    content = (
      <Switch>
        <Route exact path={"/" + CoordinatorScreen.SCHEDULED_APPOINTMENTS}>
          <ManageAppointmentsScreenContainer
            activeHospitalsForCoordinator={activeHospitalsForCoordinator}
          />
        </Route>
        <Route exact path={"/" + CoordinatorScreen.DONORS}>
          <SearchDonorsScreenContainer />
        </Route>
        <Route exact path={"/" + CoordinatorScreen.BOOKED_DONATIONS}>
          <ScheduledAppointmentsContainer
            activeHospitalsForCoordinator={activeHospitalsForCoordinator}
          />
        </Route>
        <Route exact path={["/" + CoordinatorScreen.ADD_APPOINTMENTS, "*"]}>
          <AddAppointmentsScreenContainer
            activeHospitalsForCoordinator={activeHospitalsForCoordinator}
          />
        </Route>

        {/*in case of no match*/}
        <Redirect to={"/" + CoordinatorScreen.ADD_APPOINTMENTS} />
      </Switch>
    );
  }

  return (
    <>
      <CoordinatorHeaderContainer
        showSignOutButton={loginStatus === LoginStatus.LOGGED_IN}
      />
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>{appVersion}</div>
    </>
  );
}
