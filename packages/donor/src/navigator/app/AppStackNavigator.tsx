import React from "react";
import { MainNavigationKeys } from "./MainNavigationKeys";
import { AuthenticationScreenKeys } from "../authentication/AuthenticationScreenKeys";
import { IStack } from "../AppNavigator";
import HomeScreenContainer from "../../screens/HomeScreenContainer";

export type StackParamList = {
  [MainNavigationKeys.UpdateApp]: undefined;
  [MainNavigationKeys.AuthLoading]: {
    setAppRequiresUpdate: (isAppRequiresUpdate: boolean) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
  };
  [MainNavigationKeys.Home]: undefined;

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
  ];
}
