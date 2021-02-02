import React from "react";
import { BloodType } from "@zm-blood-components/common";
import { View } from "react-native";
import Text from "../components/Text";

interface ExtendedSignupScreenProps {
  onSave: (
    firstName: string,
    lastName: string,
    birthDay: Date,
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
}

export default function (props: ExtendedSignupScreenProps) {
  return (
    <View>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
}
