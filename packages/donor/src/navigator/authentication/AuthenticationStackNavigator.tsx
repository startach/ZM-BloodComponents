import React from "react";
import { AuthenticationScreenKeys } from "./AuthenticationScreenKeys";
import { IStack } from "../AppNavigator";
import SignInScreenContainer from "../../screens/SignInScreenContainer";
import { View } from "react-native";

export type AuthenticationStackParamList = {
  [AuthenticationScreenKeys.SignIn]: undefined;
  [AuthenticationScreenKeys.Register]: undefined;
  [AuthenticationScreenKeys.ResetPassword]: undefined;
  [AuthenticationScreenKeys.SignInWithEmail]: undefined;
};

export function getAuthenticationScreens(Stack: IStack) {
  return [
    <Stack.Screen
      key={AuthenticationScreenKeys.SignIn}
      name={AuthenticationScreenKeys.SignIn}
      component={SignInScreenContainer}
      options={{
        title: "ברוך הבא לזכרון מנחם",
        animationEnabled: false,
      }}
    />,
    <Stack.Screen
      key={AuthenticationScreenKeys.Register}
      name={AuthenticationScreenKeys.Register}
      component={View}
      options={{ title: "הרשמה" }}
    />,
    <Stack.Screen
      key={AuthenticationScreenKeys.ResetPassword}
      name={AuthenticationScreenKeys.ResetPassword}
      component={View}
      options={{ title: "איפוס סיסמה" }}
    />,
    <Stack.Screen
      key={AuthenticationScreenKeys.SignInWithEmail}
      name={AuthenticationScreenKeys.SignInWithEmail}
      component={View}
      options={{ title: "הרשמה באמצעות דוא״ל" }}
    />,
  ];
}
