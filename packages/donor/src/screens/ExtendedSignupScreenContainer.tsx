import React from "react";
import { BloodType } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { useHistory } from "react-router-dom";

export default function ExtendedSignupScreenContainer() {
  const history = useHistory();

  const onSave = (
    firstName: string,
    lastName: string,
    birthDay: Date,
    phoneNumber: string,
    bloodType: BloodType
  ) => {
    console.log("Save details for", firstName, lastName);
    history.goBack();
  };

  return <ExtendedSignupScreen onSave={onSave} />;
}
