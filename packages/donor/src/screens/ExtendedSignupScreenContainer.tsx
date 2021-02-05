import React from "react";
import { BloodType, FunctionsApi } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "firebase/functions";
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
    saveDonor(
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

  console.log(userDetails);

  return <ExtendedSignupScreen onSave={onSave} />;
}

function saveDonor(
  userId: string | undefined,
  email: string | undefined,
  firstName: string,
  lastName: string,
  birthDate: Date,
  phoneNumber: string,
  bloodType: BloodType
) {
  if (!userId || !email) {
    console.error("User not authenticated");
    return;
  }

  const saveDonorFunction = firebase
    .functions()
    .httpsCallable(FunctionsApi.SaveDonorFunctionName);

  const request: FunctionsApi.SaveDonorRequest = {
    id: userId,
    firstName,
    lastName,
    phone: phoneNumber,
    email,
    bloodType,
    birthDate,
  };

  saveDonorFunction(request).catch((e) => console.error(e));
}
