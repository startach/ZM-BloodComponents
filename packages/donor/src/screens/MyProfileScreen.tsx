import React from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import Text from "../components/Text";

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
  // TODO show loading spinner until donor is defined

  return (
    <div>
      <Text>{JSON.stringify(props)}</Text>
    </div>
  );
}
