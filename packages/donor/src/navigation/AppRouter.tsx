import { useEffect, useState } from "react";
import LoggedInRouter from "./app/LoggedInRouter";
import {
  AvailableAppointment,
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

const MINIMUM_SPLASH_SCREEN_TIME_MILLIS = 2_000;

export default function AppRouter() {
  const [splashMinimumTimeoutFinished, setSplashMinimumTimeoutFinished] =
    useState(false);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);
  const [appState, setAppState] = useState<{
    donor?: Donor;
    bookedAppointment?: BookedAppointment;
    availableAppointments: AvailableAppointment[];
    isFetching: boolean;
  }>({
    isFetching: false,
    availableAppointments: [],
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
          availableAppointments: [],
        });
      }
      setLoginStatus(newLoginStatus);
    });
  }, [setLoginStatus]);

  useEffect(() => {
    setTimeout(() => {
      setSplashMinimumTimeoutFinished(true);
    }, MINIMUM_SPLASH_SCREEN_TIME_MILLIS);
  }, []);

  useEffect(() => {
    if (loginStatus !== LoginStatus.LOGGED_IN) {
      setAppState({
        donor: undefined,
        isFetching: false,
        availableAppointments: [],
      });
      return;
    }

    async function fetchData() {
      const startTime = new Date().getTime();
        const donorPromise = FirebaseFunctions.getDonor();
        const bookedAppointmentPromise =
          FirebaseFunctions.getBookedAppointment();
        const availableAppointmentsPromise =
          FirebaseFunctions.getAvailableAppointments();

        const donor = await donorPromise;
        const bookedAppointment = await bookedAppointmentPromise;
        const availableAppointments = await availableAppointmentsPromise;

        setAppState({
          isFetching: false,
          donor: donor,
          bookedAppointment: bookedAppointment,
          availableAppointments: availableAppointments,
        });
      console.log("t", new Date().getTime() - startTime);
    }

    fetchData();
  }, [loginStatus]);

  if (!splashMinimumTimeoutFinished) {
    return <AuthLoadingScreen />;
  }

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
      availableAppointments={appState.availableAppointments}
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
