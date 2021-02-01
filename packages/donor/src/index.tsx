import React from "react";
import AppNavigator from "./navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function DonorApp() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
