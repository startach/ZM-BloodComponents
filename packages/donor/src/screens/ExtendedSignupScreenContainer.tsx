import React from "react";
import { BloodType } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import { UserDetailsContext } from "../App";

export default function ExtendedSignupScreenContainer() {
  const history = useHistory();
  const userDetails = React.useContext(UserDetailsContext);

  const onSave = (
    firstName: string,
    lastName: string,
    birthDate: string,
    phoneNumber: string,
    bloodType: BloodType
  ) => {
    FirebaseFunctions.saveDonor(
      userDetails?.userId,
      userDetails?.email,
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
