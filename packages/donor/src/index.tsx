import React from "react";
import { Text, View } from "react-native";
import { Hospital } from "@zm-blood-components/common";

export default function DonorApp() {
  return (
    <View>
      <Text>My favorite hospital is {Hospital.ASAF_HAROFE}</Text>
    </View>
  );
}
