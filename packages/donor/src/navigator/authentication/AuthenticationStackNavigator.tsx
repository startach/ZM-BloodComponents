import React from "react";
import {AuthenticationScreenKeys} from "./AuthenticationScreenKeys";
import {IStack} from "../AppNavigator";
import SignInScreenContainer from "../../screens/authentication/SignInScreenContainer";
import RegisterScreenContainer from "../../screens/authentication/RegisterScreenContainer";
import ResetPasswordScreenContainer from "../../screens/authentication/ResetPasswordScreenContainer";

export type AuthenticationStackParamList = {
  [AuthenticationScreenKeys.SignIn]: undefined;
  [AuthenticationScreenKeys.Register]: undefined;
  [AuthenticationScreenKeys.ResetPassword]: undefined;
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
      component={RegisterScreenContainer}
      options={{ title: "הרשמה" }}
    />,
    <Stack.Screen
      key={AuthenticationScreenKeys.ResetPassword}
      name={AuthenticationScreenKeys.ResetPassword}
      component={ResetPasswordScreenContainer}
      options={{ title: "איפוס סיסמה" }}
    />,
  ];
}
