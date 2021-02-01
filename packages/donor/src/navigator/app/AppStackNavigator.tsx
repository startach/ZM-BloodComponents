import React from "react";
import { MainNavigationKeys } from "./MainNavigationKeys";
import { AuthenticationScreenKeys } from "../authentication/AuthenticationScreenKeys";
import { IStack } from "../AppNavigator";
import HomeScreen from "../../screens/HomeScreen";

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
  [AuthenticationScreenKeys.SignInWithEmail]: undefined;
};

export function getAppScreens(AppStack: IStack) {
  return [
    <AppStack.Screen
      key={MainNavigationKeys.Home}
      name={MainNavigationKeys.Home}
      component={HomeScreen}
      options={{
        title: "זכרון מנחם",
        headerTitleAlign: "center" as "center",
        animationEnabled: false, // Disables animation after AuthLoading ends
      }}
    />,
  ];
}
