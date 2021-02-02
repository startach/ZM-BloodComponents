import React from "react";
import AppNavigator from "./navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

export default function DonorApp() {
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
