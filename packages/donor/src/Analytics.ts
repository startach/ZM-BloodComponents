import { logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { firebaseAnalytics } from "./firebase/FirebaseInitializer";
import {
  AnalyticsButtonType,
  AnalyticsEventType,
  getMixpanelConfig,
  InputType,
} from "@zm-blood-components/common";

import mixpanel from "mixpanel-browser";

const mixpanelConfig = getMixpanelConfig();
mixpanel.init(mixpanelConfig.token, { debug: mixpanelConfig.debug });

const APP_NAME = "donor";

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
  const userId = getUserId();

  mixpanel.track("screen_view", {
    user_id: userId,
    screen: path,
    screen_class: APP_NAME,
  });

  if (!firebaseAnalytics) {
    return;
  }

  logEvent(firebaseAnalytics, "screen_view", {
    user_id: userId,
    firebase_screen: path,
    firebase_screen_class: APP_NAME,
  });
}

export function reportClick(
  buttonType: AnalyticsButtonType,
  buttonName: string,
  value?: string
) {
  const userId = getUserId();
  const screen = getPath();

  mixpanel.track("click", {
    user_id: userId,
    screen: screen,
    screen_class: APP_NAME,
    type: buttonType,
    title: buttonName,
    value: value,
  });

  if (!firebaseAnalytics) {
    return;
  }

  logEvent(firebaseAnalytics, `click`, {
    user_id: userId,
    firebase_screen: screen,
    firebase_screen_class: APP_NAME,
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
  const userId = getUserId();
  const screen = getPath();

  mixpanel.track("input", {
    user_id: userId,
    screen: screen,
    screen_class: APP_NAME,
    type: inputType,
    title: inputName,
    value: value,
  });

  if (!firebaseAnalytics) {
    return;
  }

  logEvent(firebaseAnalytics, `input`, {
    user_id: userId,
    firebase_screen: screen,
    firebase_screen_class: APP_NAME,
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
  const userId = getUserId();
  const screen = getPath();

  mixpanel.track("event", {
    user_id: userId,
    screen: screen,
    screen_class: APP_NAME,
    type: otherType,
    title: otherName,
    value: otherValue,
  });

  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, `other`, {
    user_id: userId,
    firebase_screen: screen,
    firebase_screen_class: APP_NAME,
    type: otherType,
    title: otherName,
    value: otherValue,
  });
}
