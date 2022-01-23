import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Coordinator,
  CoordinatorRole,
  LoginStatus,
} from "@zm-blood-components/common";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import SearchDonorsScreenContainer from "../screens/searchDonorsScreen/SearchDonorsScreenContainer";
import ScheduledAppointmentsContainer from "../screens/scheduledAppointments/ScheduledAppointmentsScreenContainer";
import * as CoordinatorFunctions from "../firebase/CoordinatorFunctions";
import { CoordinatorScreenKey } from "./CoordinatorScreenKey";
import { signOut } from "../firebase/FirebaseAuthentication";
import SignInScreenContainer from "../screens/AuthScreens/SignInScreenContainer";
import ResetPasswordScreenContainer from "../screens/AuthScreens/ResetPasswordScreenContainer";
import SplashScreen from "../screens/loading/SplashScreen";
import ScheduleScreenContainer from "../screens/schedule/ScheduleScreenContainer";
import DonationDayScreenContainer from "../screens/donationDay/DonationDayScreenContainer";
import BookManualDonationScreenContainer from "../screens/bookManualDonationScreen/BookManualDonationScreenContainer";
import { schedulePath } from "./RouterUtils";
import BookedAppointmentScreenContainer from "../screens/bookedDonation/BookedAppointmentScreenContainer";
import AddAppointmentScreenContainer from "../screens/AddAppointmentScreen/AddAppointmentScreenContainer";

// const ROLES_THAT_ADD_APPOINTMENTS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.HOSPITAL_COORDINATOR,
// ];
//
// const ROLES_THAT_VIEW_OPEN_APPOINTMENTS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.HOSPITAL_COORDINATOR,
//   CoordinatorRole.GROUP_COORDINATOR,
// ];
//
// const ROLES_THAT_VIEW_BOOKED_APPOINTMENTS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.HOSPITAL_COORDINATOR,
//   CoordinatorRole.GROUP_COORDINATOR,
// ];
//
// const ROLES_THAT_VIEW_DONORS = [
//   CoordinatorRole.SYSTEM_USER,
//   CoordinatorRole.ZM_COORDINATOR,
//   CoordinatorRole.GROUP_COORDINATOR,
// ];

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

  const activeHospitalsForCoordinator =
    appState.coordinator?.activeHospitalsForCoordinator!;

  if (loginStatus === LoginStatus.UNKNOWN || appState.isFetching) {
    return <SplashScreen />;
  }

  const loggedIn = loginStatus === LoginStatus.LOGGED_IN;
  return (
    <Routes>
      <Route
        path={CoordinatorScreenKey.LOGIN}
        element={<SignInScreenContainer loggedIn={loggedIn} />}
      />
      <Route
        path={CoordinatorScreenKey.RESET_PASSWORD}
        element={<ResetPasswordScreenContainer loggedIn={loggedIn} />}
      />
      <Route path={CoordinatorScreenKey.SCHEDULE}>
        <Route
          path={""}
          element={
            <Navigate
              to={
                appState.coordinator
                  ? schedulePath(activeHospitalsForCoordinator[0])
                  : CoordinatorScreenKey.LOGIN
              }
            />
          }
        />
        <Route
          path={":hospital/:timestamp"}
          element={
            <ScheduleScreenContainer
              loggedIn={loggedIn}
              availableHospitals={activeHospitalsForCoordinator}
            />
          }
        />
      </Route>

      <Route
        path={CoordinatorScreenKey.DAY + "/:hospital/:timestamp"}
        element={<DonationDayScreenContainer loggedIn={loggedIn} />}
      />

      <Route
        path={CoordinatorScreenKey.APPOINTMENT + "/:appointmentId"}
        element={<BookedAppointmentScreenContainer loggedIn={loggedIn} />}
      />

      <Route
        path={
          CoordinatorScreenKey.MANUAL_DONATION + "/:appointmentId/:timestamp"
        }
        element={<BookManualDonationScreenContainer loggedIn={loggedIn} />}
      />

      <Route
        path={CoordinatorScreenKey.ADD + "/:hospital"}
        element={<AddAppointmentScreenContainer loggedIn={loggedIn} />}
      />

      {/*Old screens*/}
      <Route
        path={CoordinatorScreenKey.DONORS}
        element={<SearchDonorsScreenContainer />}
      />

      <Route
        path={CoordinatorScreenKey.REPORTS}
        element={
          <ScheduledAppointmentsContainer
            activeHospitalsForCoordinator={activeHospitalsForCoordinator}
          />
        }
      />

      {/*in case of no match*/}
      <Route
        path="*"
        element={<Navigate to={CoordinatorScreenKey.SCHEDULE} />}
      />
    </Routes>
  );
}
