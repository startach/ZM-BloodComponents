import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "./firebase/FirebaseInitializer";

export function reportScreen(path: string) {
  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, "screen_view", {
    firebase_screen: path,
    firebase_screen_class: "donor_screen",
  });
}

export function reportClick(path: string, buttonName: string) {
  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, `button_click`, {
    firebase_screen: path,
    firebase_screen_class: "donor_screen",
    name: buttonName,
  });
}