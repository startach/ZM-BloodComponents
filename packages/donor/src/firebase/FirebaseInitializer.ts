import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "@zm-blood-components/common";

export function initFirebase() {
  firebase.initializeApp(firebaseConfig);
}

export function registerAuthChange(
  setIsLoggedIn: (isLoggedIn: boolean) => void
) {
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
}
