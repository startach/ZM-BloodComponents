import React from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import MyProfileScreen from "./MyProfileScreen";

interface MyProfileScreenContainerProps {
  user: Donor;
}

export default function MyProfileScreenContainer(
  props: MyProfileScreenContainerProps
) {

  const onSave = (
    firstName: string,
    lastName: string,
    birthDate: string,
    phoneNumber: string,
    bloodType: BloodType
  ) => {
    FirebaseFunctions.saveDonor(
      firstName,
      lastName,
      birthDate,
      phoneNumber,
      bloodType
    );
  };

  return <MyProfileScreen onSave={onSave} user={props.user} />;
}
