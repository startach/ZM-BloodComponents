import React, { useState } from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import MyProfileScreen from "./MyProfileScreen";

interface MyProfileScreenContainerProps {
  user: Donor;
}

export default function MyProfileScreenContainer(
  props: MyProfileScreenContainerProps
) {
  const [user] = useState<Donor>({
    id: "2",
    firstName: "מרואן",
    lastName: "ריזק",
    birthDate: "1991-11-10",
    phone: "0509018870",
    bloodType: BloodType.AB_MINUS,
    email: "zm@gmail.com",
  });

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

  return <MyProfileScreen onSave={onSave} user={user} />;
}
