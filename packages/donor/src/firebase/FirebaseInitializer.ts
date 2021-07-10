import firebase from "firebase/app";
import "firebase/auth";
import { getFirebaseConfig, LoginStatus } from "@zm-blood-components/common";

export function initFirebase() {
  firebase.initializeApp(getFirebaseConfig());
}

let loginState = false;

export function registerAuthChange(
  setLoginState: (isLoggedIn: LoginStatus) => void
) {
  firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
    if (user) {
      loginState = true;
      setLoginState(LoginStatus.LOGGED_IN);
    } else {
      loginState = false;
      setLoginState(LoginStatus.LOGGED_OUT);
    }
  });
}

export const isLoggedIn = () => loginState;
