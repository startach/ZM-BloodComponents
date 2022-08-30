import { getFirebaseConfig, LoginStatus } from "@zm-blood-components/common";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getPerformance } from "firebase/performance";
import { Analytics, getAnalytics } from "firebase/analytics";

export let firebaseAnalytics: Analytics | undefined;

export function initFirebase() {
  const app = initializeApp(getFirebaseConfig());
  getPerformance(app);
  if (process.env.NODE_ENV === "production") {
    firebaseAnalytics = getAnalytics();
  }
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
