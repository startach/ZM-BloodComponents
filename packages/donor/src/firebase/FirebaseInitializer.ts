import { getFirebaseConfig, LoginStatus } from "@zm-blood-components/common";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export function initFirebase() {
  initializeApp(getFirebaseConfig());
}

let loginState = false;

export function registerAuthChange(
  setLoginState: (isLoggedIn: LoginStatus) => void
) {
  onAuthStateChanged(getAuth(), async (user: User | null) => {
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
