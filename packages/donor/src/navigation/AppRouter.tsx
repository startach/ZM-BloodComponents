import React, { useEffect, useState } from "react";
import LoggedInRouter from "./app/LoggedInRouter";
import { Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import {
  initFirebase,
  registerAuthChange,
} from "../firebase/FirebaseInitializer";
import AuthLoadingScreen from "../screens/authentication/AuthLoadingScreen";
import AuthenticationRouter from "./AuthenticationRouter";

export enum LoginStatus {
  UNKNOWN,
  LOGGED_IN,
  LOGGED_OUT,
}

export default function AppRouter() {
  const [loginStatus, setLoginStatus] = useState(LoginStatus.UNKNOWN);
  const [donorState, setDonorState] = useState<{
    donor?: Donor;
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
        setDonorState({
          donor: undefined,
          isFetching: true,
        });
      }
      setLoginStatus(newLoginStatus);
    });
  }, [setLoginStatus]);

  useEffect(() => {
    if (loginStatus === LoginStatus.LOGGED_IN) {
      FirebaseFunctions.getDonor().then((donor) => {
        setDonorState({
          donor,
          isFetching: false,
        });
      });
    } else if (loginStatus === LoginStatus.LOGGED_OUT) {
      setDonorState({
        donor: undefined,
        isFetching: false,
      });
    }
  }, [loginStatus]);

  if (loginStatus === LoginStatus.LOGGED_OUT) {
    return <AuthenticationRouter />;
  }

  if (loginStatus === LoginStatus.UNKNOWN || donorState.isFetching) {
    return <AuthLoadingScreen />;
  }

  return (
    <LoggedInRouter
      user={donorState.donor}
      setUser={(user: Donor) => {
        setDonorState({
          donor: user,
          isFetching: false,
        });
      }}
    />
  );
}
