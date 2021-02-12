import React, { useState } from "react";
import { BloodType } from "@zm-blood-components/common";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select"
import Styles from "./_ExtendedSignup.module.scss"
import RadioGroup from "../../components/RadioGroup";

interface ExtendedSignupScreenProps {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  bloodType: string,
  areFieldsValid: { [key: string]: boolean },
  onSave: (
    firstName: string,
    lastName: string,
    birthDate: string, // YYYY-MM-DD
    phoneNumber: string,
    bloodType: BloodType
  ) => void;
  FieldNames: { [key: string]: string },
  handleChangeField: (value: string, fieldName: string) => void;
}

export default function ExtendedSignupScreen({
  firstName, lastName, phoneNumber, bloodType,
  areFieldsValid, onSave, FieldNames, handleChangeField
}: ExtendedSignupScreenProps) {

  const [bloodTypeExample, setBloodTypeExample] = useState(BloodType.A_MINUS)

  const Save = () => {
    onSave(
      "Ethan",
      "Victor",
      "1996-06-17",
      "0501234567",
      BloodType.A_PLUS
    );
  };
  return (
    <div className={Styles["extended-signup"]}>
      <Input
        value={firstName}
        onChangeText={(value) => handleChangeField(value, FieldNames.firstName)}
        label="שם פרטי"
        isValid={areFieldsValid[FieldNames.firstName]}
      />
      <br />
      <Input
        value={lastName}
        onChangeText={(value) => handleChangeField(value, FieldNames.lastName)}
        label="שם משפחה"
        isValid={areFieldsValid[FieldNames.lastName]}
      />
      <br />
      <Input
        value={phoneNumber}
        onChangeText={(value) => handleChangeField(value, FieldNames.phoneNumber)}
        label="מספר טלפון"
        isValid={areFieldsValid[FieldNames.phoneNumber]}
      />
      <br />
      <Select
        value={bloodType}
        onChange={(value) => handleChangeField(value, FieldNames.bloodType)}
        label="סוג דם"
        isValid={areFieldsValid[FieldNames.bloodType]}
        options={Object.values(BloodType).map((type, index) => {
          return {
            key: "ExtendedSignupScreen-" + index,
            value: type,
            label: BloodType[type]
          }
        })}
      />
      <br />
      <Button
        onClick={Save}
        title={"שמירה"}
        isDisabled={Object.values(areFieldsValid).some(value => !value)}
      />

      {
        // Examples go here
      }
  <br/>
  <br/>
      <Input type="password" variant="outlined" onChangeText={() => { }} label="ססמא" />
      <br/>
      <RadioGroup
        label="סוג דם"
        onChange={((e, value) => setBloodTypeExample(value as BloodType))}
        value={bloodTypeExample}
        name="blood-type-example"
        options={Object.values(BloodType).map((type, index) => {
          return {
            value: type,
            label: type,
            isDisabled: index % 2 === 0
          }
        })}
      />
    </div>
  );
}
