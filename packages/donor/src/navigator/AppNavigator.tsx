import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StackNavigationEventMap,
  StackNavigationOptions,
} from "@react-navigation/stack/lib/typescript/src/types";
import { getAuthenticationScreens } from "./authentication/AuthenticationStackNavigator";
import { getAppScreens, StackParamList } from "./app/AppStackNavigator";
import { MainNavigationKeys } from "./app/MainNavigationKeys";
import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import UpdateAppScreen from "../screens/UpdateAppScreen";
import AuthLoadingScreenContainer from "../screens/authentication/AuthLoadingScreenContainer";

export type IStack = TypedNavigator<
  StackParamList,
  StackNavigationState<StackParamList>,
  StackNavigationOptions,
  StackNavigationEventMap,
  any
>;

export default function AppStack() {
  const Stack = createStackNavigator<StackParamList>();

  return (
    <Stack.Navigator initialRouteName={MainNavigationKeys.Home}>
      {AppContainer(Stack)}
    </Stack.Navigator>
  );
}

function AppContainer(Stack: IStack) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppRequiresUpdate, setAppRequiresUpdate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isAppRequiresUpdate) {
    return (
      <Stack.Screen
        name={MainNavigationKeys.UpdateApp}
        component={UpdateAppScreen}
        options={{ header: () => null }}
      />
    );
  }

  if (isLoading) {
    return (
      <Stack.Screen
        name={MainNavigationKeys.AuthLoading}
        options={{ header: () => null }}
        component={AuthLoadingScreenContainer}
        initialParams={{
          setIsLoggedIn: (isLoggedIn: boolean) => {
            setIsLoggedIn(isLoggedIn);
            setIsLoading(false);
          },
          setAppRequiresUpdate: (isAppRequiresUpdate: boolean) => {
            setAppRequiresUpdate(isAppRequiresUpdate);
            setIsLoading(false);
          },
        }}
      />
    );
  }

  if (!isLoggedIn) {
    return getAuthenticationScreens(Stack);
  } else {
    return getAppScreens(Stack);
  }
}
