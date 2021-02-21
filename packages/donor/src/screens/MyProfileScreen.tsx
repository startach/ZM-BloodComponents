import React from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import Text from "../components/basic/Text";
import ZMScreen from "../components/basic/ZMScreen";

interface MyProfileScreenProps {
  user?: Donor;
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
}

export default function MyProfileScreen(props: MyProfileScreenProps) {
  return (
    <ZMScreen hasBackButton title="פרופיל משתמש">
      <Text>{JSON.stringify(props)}</Text>
    </ZMScreen>
  );
}
