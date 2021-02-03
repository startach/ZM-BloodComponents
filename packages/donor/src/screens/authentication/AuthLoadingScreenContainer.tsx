import React, { useEffect } from "react";
import AuthLoadingScreen from "./AuthLoadingScreen";
import {
  initFirebase,
  registerAuthChange,
} from "../../firebase/FirebaseInitializer";
import "firebase/auth";

interface AuthLoadingScreenContainerProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function AuthLoadingScreenContainer(
  props: AuthLoadingScreenContainerProps
) {
  useEffect(() => {
    initFirebase();
  }, []);

  useEffect(() => {
    registerAuthChange(props.setIsLoggedIn);
  }, [props.setIsLoggedIn]);

  return <AuthLoadingScreen />;
}
