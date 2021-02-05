import React from "react";
import { BloodType } from "@zm-blood-components/common";
import Text from "../components/Text";

interface ExtendedSignupScreenProps {
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
}

export default function ExtendedSignupScreen(props: ExtendedSignupScreenProps) {
  return (
    <div>
      <Text>{JSON.stringify(props)}</Text>
    </div>
  );
}
