import React from "react";
import { BloodType } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { INavigation } from "../interfaces/INavigation";
import { MainNavigationKeys } from "../navigator/app/MainNavigationKeys";

export default function (
  props: INavigation<MainNavigationKeys.ExtendedSignup>
) {
  const onSave = (
    firstName: string,
    lastName: string,
    birthDay: Date,
    phoneNumber: string,
    bloodType: BloodType
  ) => {
    console.log("Save details for", firstName, lastName);
    props.navigation.goBack();
  };

  return <ExtendedSignupScreen onSave={onSave} />;
}
