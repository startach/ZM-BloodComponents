import React, { useEffect } from "react";
import AuthLoadingScreen from "./AuthLoadingScreen";
import {
  initFirebase,
  registerAuthChange,
} from "../../firebase/FirebaseInitializer";
import "firebase/auth";
import { UserDetails } from "../../App";

interface AuthLoadingScreenContainerProps {
  setUserDetails: (userDetails: UserDetails) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function AuthLoadingScreenContainer(
  props: AuthLoadingScreenContainerProps
) {
  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange(props.setIsLoggedIn, props.setUserDetails);
  }, [props.setIsLoggedIn]);

  return <AuthLoadingScreen />;
}
