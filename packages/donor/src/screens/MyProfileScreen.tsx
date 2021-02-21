import React from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import Text from "../components/basic/Text";
import ZMScreen from "../components/basic/ZMScreen";
import Button from "../components/basic/Button";

interface MyProfileScreenProps {
  user: Donor;
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
  onSignOut: () => void;
}

export default function MyProfileScreen(props: MyProfileScreenProps) {
  const { firstName, lastName, phone, bloodType } = props.user;

  return (
    <ZMScreen hasBackButton title="פרופיל משתמש">
      <Text>שם פרטי: {firstName}</Text>
      <Text>שם משפחה: {lastName}</Text>
      <Text>טלפון: {phone}</Text>
      <Text>סוג דם: {bloodType}</Text>
      <Button onClick={props.onSignOut} title="התנתק" />
    </ZMScreen>
  );
}
