import React, { useState } from "react";
import { BloodType } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import { useHistory } from "react-router-dom";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export default function ExtendedSignupScreenContainer() {
  const FieldNames = {
    firstName: "firstName",
    lastName: "lastName",
    phoneNumber: "phoneNumber",
    bloodType: "bloodType",
  } as const

  const history = useHistory();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bloodType, setBloodType] = useState("")
  const [areFieldsValid, setAreFieldsValid] = useState({
    [FieldNames.firstName]: true,
    [FieldNames.lastName]: true,
    [FieldNames.phoneNumber]: true,
    [FieldNames.bloodType]: true
  })

  const handleChangeField = (value: string, fieldName: string) => {
    let isFieldValid = true
    let consecutiveLetters: number;
    let overTenConsecutiveLetters: boolean;
    let fullNameLength: number;
    switch (fieldName) {
      case FieldNames.firstName:
        consecutiveLetters = value.indexOf(" ")
        overTenConsecutiveLetters = consecutiveLetters > 9 || (consecutiveLetters === -1 && value.length > 9)
        fullNameLength = value.length + lastName.length
        if (value.length === 0 || overTenConsecutiveLetters || fullNameLength > 20) {
          isFieldValid = false
        }
        setFirstName(value)
        break;
      case FieldNames.lastName:
        consecutiveLetters = value.indexOf(" ")
        overTenConsecutiveLetters = consecutiveLetters > 9 || (consecutiveLetters === -1 && value.length > 9)
        fullNameLength = value.length + firstName.length
        if (value.length === 0 || overTenConsecutiveLetters || fullNameLength > 20) {
          isFieldValid = false
        }
        setLastName(value)
        break;
      case FieldNames.phoneNumber:
       const phoneValidator = /^05(?!6)\d{8}$/
       isFieldValid = phoneValidator.test(value)
       setPhoneNumber(value)
        break;
      case FieldNames.bloodType:
        isFieldValid = Object.values(BloodType).map(value => value.toString()).includes(value)
        setBloodType(value)
        break;
    }

    setAreFieldsValid({...areFieldsValid, [fieldName]: isFieldValid})
  }

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

  return <ExtendedSignupScreen
    {...{ onSave, firstName, lastName, phoneNumber, bloodType, areFieldsValid, FieldNames, handleChangeField }}
  />;
}
