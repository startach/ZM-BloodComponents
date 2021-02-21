import React, { useState } from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../firebase/FirebaseFunctions";
import MyProfileScreen from "./MyProfileScreen";
import firebase from "firebase/app";
import "firebase/auth";

interface MyProfileScreenContainerProps {
  user: Donor;
}

export default function MyProfileScreenContainer(
  props: MyProfileScreenContainerProps
) {
  const [user] = useState<Donor>(props.user);
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

  const onSignOut = () => firebase.auth().signOut();

  return <MyProfileScreen onSave={onSave} user={user} onSignOut={onSignOut} />;
}
