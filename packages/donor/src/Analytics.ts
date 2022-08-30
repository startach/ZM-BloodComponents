import { logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { firebaseAnalytics } from "./firebase/FirebaseInitializer";
import {
  AnalyticsButtonType,
  AnalyticsEventType,
  getMixpanelConfig,
  InputType,
  AnalyticsReportType,
  AnalyticsSubTypes,
} from "@zm-blood-components/common";

import mixpanel from "mixpanel-browser";

const APP_NAME = "donor";

type AnalyticsBasicData = {
  user_id: string | undefined;
  screen: string;
  screen_class: typeof APP_NAME;
  reportType: AnalyticsReportType;
};

type AnalyticsFullData = AnalyticsBasicData & {
  reportSubType: AnalyticsSubTypes;
  value?: string;
};

const USE_ANALYTICS = process.env.NODE_ENV === "production";

if (USE_ANALYTICS) {
  const mixpanelConfig = getMixpanelConfig();
  mixpanel.init(mixpanelConfig.token, { debug: mixpanelConfig.debug });
}

const mixpanelConfig = getMixpanelConfig();
mixpanel.init(mixpanelConfig.token, { debug: mixpanelConfig.debug });

function getUserId() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user?.uid;
}

function getPath() {
  const location = window.location;
  return location.pathname;
}

const getBasicData = (type: AnalyticsReportType): AnalyticsBasicData => {
  return {
    user_id: firebaseAnalytics && getUserId(),
    screen: getPath(),
    screen_class: APP_NAME,
    reportType: type,
  };
};

export function reportScreen(path: string) {
  if (!USE_ANALYTICS) return;

  const reportName = `${path}_${AnalyticsReportType.ScreenView}`;
  const basicData: AnalyticsBasicData = getBasicData(
    AnalyticsReportType.ScreenView
  );

  mixpanel.track(reportName, basicData);

  if (!firebaseAnalytics) {
    return;
  }

  logEvent(firebaseAnalytics, reportName, basicData);
}

export function reportClick(
  buttonType: AnalyticsButtonType,
  buttonName: string,
  value?: string | boolean
) {
  if (!USE_ANALYTICS) return;

  const reportName = buttonName + AnalyticsReportType.Click;
  const reportData: AnalyticsFullData = {
    ...getBasicData(AnalyticsReportType.Click),
    reportSubType: buttonType,
    value: `${value}`,
  };

  mixpanel.track(reportName, reportData);

  if (!firebaseAnalytics) {
    return;
  }

  logEvent(firebaseAnalytics, reportName, reportData);
}

export function reportInput(
  inputType: InputType,
  inputName: string,
  value?: string | boolean
) {
  if (!USE_ANALYTICS) return;

  const reportName = inputName + AnalyticsReportType.Input;
  const reportData: AnalyticsFullData = {
    ...getBasicData(AnalyticsReportType.Input),
    reportSubType: inputType,
    value: `${value}`,
  };

  mixpanel.track(reportName, reportData);

  if (!firebaseAnalytics) {
    return;
  }

  logEvent(firebaseAnalytics, reportName, reportData);
}

export function reportEvent(
  otherType: AnalyticsEventType,
  otherName: string,
  otherValue?: string
) {
  if (!USE_ANALYTICS) return;

  const reportName = otherName + AnalyticsReportType.Event;
  const reportData: AnalyticsFullData = {
    ...getBasicData(AnalyticsReportType.Event),
    reportSubType: otherType,
    value: otherValue,
  };

  mixpanel.track(reportName, reportData);

  if (!firebaseAnalytics) {
    return;
  }
  logEvent(firebaseAnalytics, reportName, reportData);
}
