import { useEffect, useState } from "react";
import LoggedInRouter from "./app/LoggedInRouter";
import { LoginStatus } from "@zm-blood-components/common";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import AuthLoadingScreen from "../screens/authentication/AuthLoadingScreen";
import AuthenticationRouter from "./AuthenticationRouter";
import { useAvailableAppointmentsStore } from "../state/Providers";
import { refreshAvailableAppointments } from "../state/AvailableAppointmentsStore";

const MINIMUM_SPLASH_SCREEN_TIME_MILLIS = 2_000;

export default function AppRouter() {
  const [splashMinimumTimeoutFinished, setSplashMinimumTimeoutFinished] =
    useState(false);
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);

  const availableAppointmentsStore = useAvailableAppointmentsStore();

  useEffect(() => {
    initFirebase();
    refreshAvailableAppointments(availableAppointmentsStore);
  }, [availableAppointmentsStore]);

  useEffect(() => {
    registerAuthChange((newLoginStatus) => {
      setLoginStatus(newLoginStatus);
    });
  }, [setLoginStatus]);

  useEffect(() => {
    setTimeout(() => {
      setSplashMinimumTimeoutFinished(true);
    }, MINIMUM_SPLASH_SCREEN_TIME_MILLIS);
  }, []);

  if (!splashMinimumTimeoutFinished) {
    return <AuthLoadingScreen />;
  }

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    return <AuthenticationRouter />;
  }

  if (loginStatus === LoginStatus.UNKNOWN) {
    return <AuthLoadingScreen />;
  }

  return <LoggedInRouter />;
}
