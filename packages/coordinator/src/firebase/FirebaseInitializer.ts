import {
  getFirebaseConfig,
  LoginStatus,
  Collections,
  CoordinatorUpdate,
} from "@zm-blood-components/common";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

export function initFirebase() {
  initializeApp(getFirebaseConfig());
}

export function registerAuthChange(
  setLoginState: (isLoggedIn: LoginStatus) => void,
  onCoordinatorUpdate: (update: CoordinatorUpdate) => void
) {
  onAuthStateChanged(getAuth(), async (user: User | null) => {
    if (user) {
      setLoginState(LoginStatus.LOGGED_IN);
      listenToCoordinatorUpdates(onCoordinatorUpdate);
    } else {
      setLoginState(LoginStatus.LOGGED_OUT);
    }
  });
}

function listenToCoordinatorUpdates(
  onCoordinatorUpdate: (update: CoordinatorUpdate) => void
) {
  const db = getFirestore();
  onSnapshot(doc(db, Collections.UPDATES, "coordinatorUpdates"), (doc) => {
    const data = doc.data() as CoordinatorUpdate;
    onCoordinatorUpdate(data);
  });
}
