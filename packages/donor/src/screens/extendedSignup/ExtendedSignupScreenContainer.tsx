import React from "react";
import { BloodType } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export default function ExtendedSignupScreenContainer() {
  const history = useHistory();

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
    history.goBack();
  };

  return <ExtendedSignupScreen onSave={onSave} />;
}
