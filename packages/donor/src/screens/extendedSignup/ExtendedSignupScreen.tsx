import React, { useState } from "react";
import { BloodType } from "@zm-blood-components/common";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Styles from "./_ExtendedSignup.module.scss"

interface ExtendedSignupScreenProps {
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
}

export default function ExtendedSignupScreen(props: ExtendedSignupScreenProps) {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bloodType, setBloodType] = useState("")

  const onSave = () => {
    props.onSave("Ethan", "Victor", "1996-06-17", "0501234567", BloodType.A_PLUS);
  }
  return (
    <div className={Styles["extended-signup"]}>
      <Text>{JSON.stringify(props)}</Text>
      <Input
        value={firstName}
        onChangeText={(value) => setFirstName(value)}
        label="שם פרטי" />
      <Input
        value={lastName}
        onChangeText={(value) => setLastName(value)}
        label="שם משפחה" />
      <Input
        value={phoneNumber}
        onChangeText={(value) => setPhoneNumber(value)}
        label="מספר טלפון" />
      <Input
        value={bloodType}
        onChangeText={(value) => setBloodType(value)}
        label="סוג דם" />
      <Button
        onClick={onSave}
        title={"שמירה"} />
    </div>
  );
}
