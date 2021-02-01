import firebase from "firebase";
import { firebaseConfig } from "@zm-blood-components/common";

export function initFirebase(setIsLoggedIn: (loggedIn: boolean) => void) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user) {
      console.log(user.email);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });
}
