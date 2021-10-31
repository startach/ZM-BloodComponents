import { getFirebaseConfig, LoginStatus } from "@zm-blood-components/common";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

export function initFirebase() {
  initializeApp(getFirebaseConfig());
}

export function registerAuthChange(
  setLoginState: (isLoggedIn: LoginStatus) => void
) {
  onAuthStateChanged(getAuth(), async (user: User | null) => {
    if (user) {
      setLoginState(LoginStatus.LOGGED_IN);
    } else {
      setLoginState(LoginStatus.LOGGED_OUT);
    }
  });
}
