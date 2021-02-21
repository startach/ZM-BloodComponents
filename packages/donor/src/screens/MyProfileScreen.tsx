import React from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import Text from "../components/basic/Text";

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
    <div>
      <Text>{JSON.stringify(props)}</Text>
    </div>
  );
}
