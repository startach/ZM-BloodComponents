import React from "react";
import { MainNavigationKeys } from "./MainNavigationKeys";
import { AuthenticationScreenKeys } from "../authentication/AuthenticationScreenKeys";
import { IStack } from "../AppNavigator";
import HomeScreenContainer from "../../screens/HomeScreenContainer";
import BookDonationScreenContainer from "../../screens/BookDonationScreenContainer";
import ExtendedSignupScreenContainer from "../../screens/ExtendedSignupScreenContainer";
import UpcomingDonationScreen from "../../screens/UpcomingDonationScreen";
import UpcomingDonationScreenContainer from "../../screens/UpcomingDonationScreenContainer";

export type StackParamList = {
  [MainNavigationKeys.UpdateApp]: undefined;
  [MainNavigationKeys.AuthLoading]: {
    setAppRequiresUpdate: (isAppRequiresUpdate: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
  };

  [MainNavigationKeys.Home]: undefined;
  [MainNavigationKeys.BookDonation]: undefined;
  [MainNavigationKeys.ExtendedSignup]: undefined;
  [MainNavigationKeys.UpcomingDonation]: undefined;

  [AuthenticationScreenKeys.SignIn]: undefined;
  [AuthenticationScreenKeys.Register]: undefined;
  [AuthenticationScreenKeys.ResetPassword]: undefined;
};

export function getAppScreens(AppStack: IStack) {
  return [
    <AppStack.Screen
      key={MainNavigationKeys.Home}
      name={MainNavigationKeys.Home}
      component={HomeScreenContainer}
      options={{
        title: "זכרון מנחם",
        headerTitleAlign: "center" as "center",
        animationEnabled: false, // Disables animation after AuthLoading ends
      }}
    />,
    <AppStack.Screen
      key={MainNavigationKeys.BookDonation}
      name={MainNavigationKeys.BookDonation}
      component={BookDonationScreenContainer}
      options={{ title: "קבע תרומה" }}
    />,
    <AppStack.Screen
      key={MainNavigationKeys.ExtendedSignup}
      name={MainNavigationKeys.ExtendedSignup}
      component={ExtendedSignupScreenContainer}
      options={{ title: "פרטים נוספים" }}
    />,
    <AppStack.Screen
      key={MainNavigationKeys.UpcomingDonation}
      name={MainNavigationKeys.UpcomingDonation}
      component={UpcomingDonationScreenContainer}
      options={{ title: "תרומה קרובה" }}
    />,
  ];
}
