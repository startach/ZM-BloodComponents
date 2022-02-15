import { logEvent } from "firebase/analytics";
import { firebaseAnalytics } from "./firebase/FirebaseInitializer";

export function reportScreen(path: string) {
  if (!firebaseAnalytics) {
    return;
  }
  console.log("screen/" + path);
  logEvent(firebaseAnalytics, "screen" + path, { debug_mode: true });
}

export function reportClick(path: string, buttonName: string) {
  if (!firebaseAnalytics) {
    return;
  }
  console.log(`click/${path}/${buttonName}`);
  logEvent(firebaseAnalytics, `click/${path}/${buttonName}`);
}
