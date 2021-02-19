import React, { useEffect, useState } from "react";
import LoggedInRouter from "./app/LoggedInRouter";
import {
  BookedAppointment,
  Donor,
  LoginStatus,
} from "@zm-blood-components/common";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import AuthLoadingScreen from "../screens/authentication/AuthLoadingScreen";
import AuthenticationRouter from "./AuthenticationRouter";

export default function AppRouter() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);
  const [appState, setAppState] = useState<{
    donor?: Donor;
    bookedAppointment?: BookedAppointment;
    isFetching: boolean;
  }>({
    donor: undefined,
    isFetching: false,
  });

  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange((newLoginStatus) => {
      if (newLoginStatus === LoginStatus.LOGGED_IN) {
        setAppState({
          donor: undefined,
          isFetching: true,
        });
      }
      setLoginStatus(newLoginStatus);
    });
  }, [setLoginStatus]);

  useEffect(() => {
    if (loginStatus !== LoginStatus.LOGGED_IN) {
      setAppState({
        donor: undefined,
        isFetching: false,
      });
      return;
    }

    async function fetchData() {
      const donor = await FirebaseFunctions.getDonor();
      let bookedAppointment: BookedAppointment | undefined = undefined;
      if (donor) {
        bookedAppointment = await FirebaseFunctions.getBookedAppointment();
      }

      setAppState({
        donor,
        bookedAppointment,
        isFetching: false,
      });
    }

    fetchData();
  }, [loginStatus]);

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    return <AuthenticationRouter />;
  }

  if (loginStatus === LoginStatus.UNKNOWN || appState.isFetching) {
    return <AuthLoadingScreen />;
  }

  return (
    <LoggedInRouter
      user={appState.donor}
      bookedAppointment={appState.bookedAppointment}
      setUser={(user: Donor) => {
        setAppState({
          ...appState,
          donor: user,
        });
      }}
      setBookedAppointment={(bookedAppointment?: BookedAppointment) => {
        setAppState({
          ...appState,
          bookedAppointment,
        });
      }}
    />
  );
}
