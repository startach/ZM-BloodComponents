import React from "react";
import { BloodType } from "@zm-blood-components/common";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Styles from "./_ExtendedSignup.module.scss";

type ExtendedSingupField = {
  value: string;
  isValid: boolean;
  onChange: (value: any) => void;
};
interface ExtendedSignupScreenProps {
  firstName: ExtendedSingupField;
  lastName: ExtendedSingupField;
  phoneNumber: ExtendedSingupField;
  bloodType: ExtendedSingupField;
  onSave: () => void;
}

export default function ExtendedSignupScreen({
  firstName,
  lastName,
  phoneNumber,
  bloodType,
  onSave,
}: ExtendedSignupScreenProps) {
  return (
    <div className={Styles["extended-signup"]}>
      <Input
        value={firstName.value}
        onChangeText={firstName.onChange}
        label="שם פרטי"
        isValid={firstName.isValid}
      />
      <br />
      <Input
        value={lastName.value}
        onChangeText={lastName.onChange}
        label="שם משפחה"
        isValid={lastName.isValid}
      />
      <br />
      <Input
        value={phoneNumber.value}
        onChangeText={phoneNumber.onChange}
        label="מספר טלפון"
        isValid={phoneNumber.isValid}
      />
      <br />
      <Select
        value={bloodType.value}
        onChange={bloodType.onChange}
        label="סוג דם"
        isValid={bloodType.isValid}
        options={Object.values(BloodType).map((type, index) => {
          return {
            key: "ExtendedSignupScreen-" + index,
            value: type,
            label: BloodType[type],
          };
        })}
      />
      <br />
      <Button
        onClick={onSave}
        title={"שמירה"}
        isDisabled={[firstName, lastName, phoneNumber, bloodType].some(
          (field) => !field.isValid
        )}
      />
    </div>
  );
}
