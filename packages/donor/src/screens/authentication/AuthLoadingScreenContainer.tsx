import React, { useEffect } from "react";
import AuthLoadingScreen from "./AuthLoadingScreen";
import {
  initFirebase,
  registerAuthChange,
} from "../../firebase/FirebaseInitializer";
import "firebase/auth";
import { Donor } from "@zm-blood-components/common";

interface AuthLoadingScreenContainerProps {
  onFinishedLoading: (isLoggedIn: boolean, user?: Donor) => void;
}

export default function AuthLoadingScreenContainer(
  props: AuthLoadingScreenContainerProps
) {
  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange(props.onFinishedLoading);
  }, [props.onFinishedLoading]);

  return <AuthLoadingScreen />;
}
