import React, { useEffect } from "react";
import AppNavigator from "./navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, I18nManager } from "react-native";

export function initRtl() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

export default function DonorApp() {
  useEffect(() => initRtl(), []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
});
