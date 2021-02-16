import React from "react";
import { BloodType } from "@zm-blood-components/common";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Styles from "./_ExtendedSignup.module.scss";

type ExtendedSingupField<T> = {
  value: T;
  isValid: boolean;
  onChange: (value: T) => void;
};
interface ExtendedSignupScreenProps {
  firstName: ExtendedSingupField<string>;
  lastName: ExtendedSingupField<string>;
  phoneNumber: ExtendedSingupField<string>;
  bloodType: ExtendedSingupField<BloodType>;
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
        errorMessage={firstName.isValid ? undefined : " "}
      />
      <br />
      <Input
        value={lastName.value}
        onChangeText={lastName.onChange}
        label="שם משפחה"
        errorMessage={lastName.isValid? undefined : " "}
      />
      <br />
      <Input
        value={phoneNumber.value}
        onChangeText={phoneNumber.onChange}
        label="מספר טלפון"
        errorMessage={phoneNumber.isValid ? undefined : " "}
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
