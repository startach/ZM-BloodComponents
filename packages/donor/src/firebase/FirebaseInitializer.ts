import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "@zm-blood-components/common";
import { LoginStatus } from "../navigation/AppRouter";

export function initFirebase() {
  firebase.initializeApp(firebaseConfig);
}

export function registerAuthChange(
  setLoginState: (isLoggedIn: LoginStatus) => void
) {
  firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
    if (user) {
      setLoginState(LoginStatus.LOGGED_IN);
    } else {
      setLoginState(LoginStatus.LOGGED_OUT);
    }
  });
}
