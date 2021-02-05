import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig, UserDetails } from "@zm-blood-components/common";

export function initFirebase() {
  firebase.initializeApp(firebaseConfig);
}

export function registerAuthChange(
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  setUserDetails: (userDetails: UserDetails) => void
) {
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user) {
      setIsLoggedIn(true);
      setUserDetails({ userId: user.uid, email: user.email || undefined });
    } else {
      setIsLoggedIn(false);
    }
  });
}
