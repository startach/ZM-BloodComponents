import React, { useEffect, useState } from "react";
import styles from "./CoordinatorRouter.module.scss";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { Redirect, Route, Switch } from "react-router-dom";
import { CoordinatorScreen } from "./CoordinatorScreen";
import AddAppointmentsScreenContainer from "../screens/addAppointments/AddAppointmentsScreenContainer";
import {
  Coordinator,
  CoordinatorRole,
  LoginStatus,
} from "@zm-blood-components/common";
import CoordinatorSignInScreenContainer from "../screens/authentication/CoordinatorSignInScreenContainer";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import CoordinatorHeaderContainer from "../components/Header/CoordinatorHeaderContainer";
import ManageAppointmentsScreenContainer from "../screens/manageAppointmentsScreen/ManageAppointmentsScreenContainer";
import SearchDonorsScreenContainer from "../screens/searchDonorsScreen/SearchDonorsScreenContainer";
import ScheduledAppointmentsContainer from "../screens/scheduledAppointments/ScheduledAppointmentsScreenContainer";
import * as CoordinatorFunctions from "../firebase/CoordinatorFunctions";

const appVersion = process.env.REACT_APP_VERSION || "dev";

const ROLES_THAT_ADD_APPOINTMENTS = [
  CoordinatorRole.SYSTEM_USER,
  CoordinatorRole.ZM_COORDINATOR,
  CoordinatorRole.HOSPITAL_COORDINATOR,
];
const ROLES_THAT_VIEW_OPEN_APPOINTMENTS = [
  CoordinatorRole.SYSTEM_USER,
  CoordinatorRole.ZM_COORDINATOR,
  CoordinatorRole.HOSPITAL_COORDINATOR,
  CoordinatorRole.GROUP_COORDINATOR,
];

const ROLES_THAT_VIEW_BOOKED_APPOINTMENTS = [
  CoordinatorRole.SYSTEM_USER,
  CoordinatorRole.ZM_COORDINATOR,
  CoordinatorRole.HOSPITAL_COORDINATOR,
  CoordinatorRole.GROUP_COORDINATOR,
];

const ROLES_THAT_VIEW_DONORS = [
  CoordinatorRole.SYSTEM_USER,
  CoordinatorRole.ZM_COORDINATOR,
  CoordinatorRole.GROUP_COORDINATOR,
];

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
      coordinator.role = CoordinatorRole.SYSTEM_USER;

      setAppState({
        coordinator,
        isFetching: false,
      });
    }

    fetchData();
  }, [loginStatus]);

  const canAddAppointments = !!(
    appState.coordinator?.role &&
    ROLES_THAT_ADD_APPOINTMENTS.includes(appState.coordinator?.role)
  );
  const canViewOpenAppointments = !!(
    appState.coordinator?.role &&
    ROLES_THAT_VIEW_OPEN_APPOINTMENTS.includes(appState.coordinator?.role)
  );
  const canViewBookedAppointments = !!(
    appState.coordinator?.role &&
    ROLES_THAT_VIEW_BOOKED_APPOINTMENTS.includes(appState.coordinator?.role)
  );
  const canViewDonors = !!(
    appState.coordinator?.role &&
    ROLES_THAT_VIEW_DONORS.includes(appState.coordinator?.role)
  );

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
        {canViewOpenAppointments && (
          <Route exact path={"/" + CoordinatorScreen.SCHEDULED_APPOINTMENTS}>
            <ManageAppointmentsScreenContainer
              activeHospitalsForCoordinator={activeHospitalsForCoordinator}
            />
          </Route>
        )}
        {canViewDonors && (
          <Route exact path={"/" + CoordinatorScreen.DONORS}>
            <SearchDonorsScreenContainer />
          </Route>
        )}
        {canViewBookedAppointments && (
          <Route exact path={"/" + CoordinatorScreen.BOOKED_DONATIONS}>
            <ScheduledAppointmentsContainer
              activeHospitalsForCoordinator={activeHospitalsForCoordinator}
            />
          </Route>
        )}
        {canAddAppointments && (
          <Route exact path={["/" + CoordinatorScreen.ADD_APPOINTMENTS, "*"]}>
            <AddAppointmentsScreenContainer
              activeHospitalsForCoordinator={activeHospitalsForCoordinator}
            />
          </Route>
        )}

        {/*in case of no match*/}
        <Redirect to={"/" + CoordinatorScreen.SCHEDULED_APPOINTMENTS} />
      </Switch>
    );
  }

  return (
    <>
      <CoordinatorHeaderContainer
        flags={{
          showSignOutButton: loginStatus === LoginStatus.LOGGED_IN,
          showAddAppointments: canAddAppointments,
          showOpenAppointments: canViewOpenAppointments,
          showSearchDonors: canViewDonors,
          showBookedAppointments: canViewBookedAppointments,
        }}
      />
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>{appVersion}</div>
    </>
  );
}
