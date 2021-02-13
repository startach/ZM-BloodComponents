import firebase from "firebase/app";
import "firebase/auth";
import { Donor, firebaseConfig } from "@zm-blood-components/common";
import * as FirebaseFunctions from "./FirebaseFunctions";

export function initFirebase() {
  firebase.initializeApp(firebaseConfig);
}

export function registerAuthChange(
  onFinishedLoading: (isLoggedIn: boolean, user?: Donor) => void
) {
  firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
    if (user) {
      FirebaseFunctions.getDonor().then((donor) => {
        if (donor) {
          onFinishedLoading(true, donor);
        } else {
          console.error(
            "Could not read user ",
            firebase.auth().currentUser?.uid
          );
          onFinishedLoading(false);
          firebase.auth().signOut();
        }
      });
    } else {
      onFinishedLoading(false);
    }
  });
}
