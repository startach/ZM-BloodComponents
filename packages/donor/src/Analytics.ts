import { logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { firebaseAnalytics } from "./firebase/FirebaseInitializer";
import {
  AnalyticsButtonType,
  AnalyticsEventType,
  InputType,
} from "@zm-blood-components/common";

function getUserId() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user?.uid;
}

function getPath() {
  const location = window.location;
  return location.pathname;
}

export function reportScreen(path: string) {
  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, "screen_view", {
    user_id: getUserId(),
    firebase_screen: path,
    firebase_screen_class: "donor",
  });
}

export function reportClick(
  buttonType: AnalyticsButtonType,
  buttonName: string,
  value?: string
) {
  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, `click`, {
    user_id: getUserId(),
    firebase_screen: getPath(),
    firebase_screen_class: "donor",
    type: buttonType,
    title: buttonName,
    value: value,
  });
}

export function reportInput(
  inputType: InputType,
  inputName: string,
  value?: string
) {
  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, `input`, {
    user_id: getUserId(),
    firebase_screen: getPath(),
    firebase_screen_class: "donor",
    type: inputType,
    title: inputName,
    value: value,
  });
}

export function reportEvent(
  otherType: AnalyticsEventType,
  otherName: string,
  otherValue?: string
) {
  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, `other`, {
    user_id: getUserId(),
    firebase_screen: getPath(),
    firebase_screen_class: "donor",
    type: otherType,
    title: otherName,
    value: otherValue,
  });
}
