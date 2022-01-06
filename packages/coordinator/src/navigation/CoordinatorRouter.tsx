import React, { useEffect, useState } from "react";
import LoadingScreen from "../screens/loading/LoadingScreen";
import { Navigate, Route, Routes } from "react-router-dom";
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
import CoordinatorHeaderContainer from "../components/V2/Header/CoordinatorHeaderContainer";
import ManageAppointmentsScreenContainer from "../screens/manageAppointmentsScreenOld/ManageAppointmentsScreenContainer";
import SearchDonorsScreenContainer from "../screens/searchDonorsScreen/SearchDonorsScreenContainer";
import ScheduledAppointmentsContainer from "../screens/scheduledAppointments/ScheduledAppointmentsScreenContainer";
import * as CoordinatorFunctions from "../firebase/CoordinatorFunctions";
import CoordinatorScreen from "../components/V2/CoordinatorScreen";
import { CoordinatorScreenKey } from "./CoordinatorScreenKey";
import { signOut } from "../firebase/FirebaseAuthentication";

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
      if (!coordinator) {
        signOut();
        return;
      }
      coordinator.role = CoordinatorRole.SYSTEM_USER;

      setAppState({
        coordinator,
        isFetching: false,
      });
    }

    fetchData();
  }, [loginStatus]);

  if (loginStatus === LoginStatus.UNKNOWN || appState.isFetching) {
    return <LoadingScreen />;
  }

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    return <CoordinatorSignInScreenContainer />;
  }

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

  const activeHospitalsForCoordinator =
    appState.coordinator?.activeHospitalsForCoordinator!;

  return (
    <CoordinatorScreen
      header={
        <CoordinatorHeaderContainer
          flags={{
            isLoggedIn: true,
            showAddAppointments: canAddAppointments,
            showOpenAppointments: canViewOpenAppointments,
            showSearchDonors: canViewDonors,
            showBookedAppointments: canViewBookedAppointments,
          }}
          coordinator={appState.coordinator}
        />
      }
    >
      <Routes>
        {canViewOpenAppointments && (
          <Route
            path={"/" + CoordinatorScreenKey.SCHEDULED_APPOINTMENTS}
            element={
              <ManageAppointmentsScreenContainer
                activeHospitalsForCoordinator={activeHospitalsForCoordinator}
              />
            }
          />
        )}
        {canViewDonors && (
          <Route
            path={"/" + CoordinatorScreenKey.DONORS}
            element={<SearchDonorsScreenContainer />}
          />
        )}
        {canViewBookedAppointments && (
          <Route
            path={"/" + CoordinatorScreenKey.BOOKED_DONATIONS}
            element={
              <ScheduledAppointmentsContainer
                activeHospitalsForCoordinator={activeHospitalsForCoordinator}
              />
            }
          />
        )}
        {canAddAppointments && (
          <Route
            path={"/" + CoordinatorScreenKey.ADD_APPOINTMENTS}
            element={
              <AddAppointmentsScreenContainer
                activeHospitalsForCoordinator={activeHospitalsForCoordinator}
              />
            }
          />
        )}

        {/*in case of no match*/}
        <Route
          path="*"
          element={
            <Navigate to={"/" + CoordinatorScreenKey.SCHEDULED_APPOINTMENTS} />
          }
        />
      </Routes>
    </CoordinatorScreen>
  );
}
