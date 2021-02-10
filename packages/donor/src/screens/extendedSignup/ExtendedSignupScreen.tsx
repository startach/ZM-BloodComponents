import React from "react";
import { BloodType } from "@zm-blood-components/common";
import Text from "../../components/Text";
import Styles from "./_ExtendedSignup.module.scss";

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
  const onSave = () => {
    props.onSave(
      "Ethan",
      "Victor",
      "1996-06-17",
      "0501234567",
      BloodType.A_PLUS
    );
  };
  return (
    <div>
      <Text>{JSON.stringify(props)}</Text>
      <div className={Styles["experiment"]}>Hello!</div>
      <button onClick={onSave}>Save </button>
    </div>
  );
}
