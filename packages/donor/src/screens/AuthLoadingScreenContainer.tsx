import React, { useEffect } from "react";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Constants from "expo-constants";
import { Platform } from "react-native";
import firebase from "firebase";
import { initFirebase } from "../firebase/FirebaseInitiator";
import { INavigation } from "../interfaces/INavigation";
import { MainNavigationKeys } from "../navigator/app/MainNavigationKeys";

export default function (props: INavigation<MainNavigationKeys.AuthLoading>) {
  useEffect(() => {
    initFirebase(props.route.params.setIsLoggedIn);
    checkVersion(props.route.params.setAppRequiresUpdate);
  }, []);

  return <AuthLoadingScreen />;
}

const callCheckVersionFunction = false;
function checkVersion(
  setAppRequiresUpdate: (isAppRequiresUpdate: boolean) => void
) {
  if (!callCheckVersionFunction) {
    // TODO (Yaron) - write this function
    return;
  }
  const checkVersionFunction = firebase
    .functions()
    .httpsCallable("versionCheck");

  const data = {
    vc: Constants.manifest.android.versionCode,
    v: Constants.manifest.version,
    os: Platform.OS,
  };

  checkVersionFunction(data)
    .then((response) => {
      if (response.data === "ok") {
      } else {
        console.log("Bad Version", Constants.manifest.android.versionCode);
        setAppRequiresUpdate(true);
      }
    })
    .catch((e) => console.error(e, "Error checking version"));
}
