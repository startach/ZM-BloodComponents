import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfigDev, LoginStatus } from "@zm-blood-components/common";

export function initFirebase() {
  firebase.initializeApp(firebaseConfigDev);
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
