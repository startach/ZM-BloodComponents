import React, { useState } from "react";
import { BloodType } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";

export default function ExtendedSignupScreenContainer() {
  const [firstNameInput, setFirstNameInput] = useState({
    value: "",
    isValid: true,
  });
  const [lastNameInput, setLastNameInput] = useState({
    value: "",
    isValid: true,
  });
  const [phoneNumberInput, setPhoneNumberInput] = useState({
    value: "",
    isValid: true,
  });
  const [bloodTypeInput, setBloodTypeInput] = useState({
    value: BloodType.UNSPECIFIED,
    isValid: true,
  });

  const validateName = (value: string, isFirstName: boolean) => {
    let isValid = true;
    const consecutiveLetters = value.indexOf(" ");
    const overTenConsecutiveLetters =
      consecutiveLetters > 9 || (consecutiveLetters === -1 && value.length > 9);
    const otherNameValue = isFirstName
      ? lastNameInput.value
      : firstNameInput.value;
    const fullNameLength = value.length + otherNameValue.length;
    if (
      value.length === 0 ||
      overTenConsecutiveLetters ||
      fullNameLength > 20
    ) {
      isValid = false;
    }

    return isValid;
  };

  const onSave = () => {
    FirebaseFunctions.saveDonor(
      firstNameInput.value,
      lastNameInput.value,
      "", // unused in pilot
      phoneNumberInput.value,
      bloodTypeInput.value
    );
  };

  const firstName = {
    ...firstNameInput,
    onChange: (value: string) => {
      setFirstNameInput({ value, isValid: validateName(value, true) });
    },
  };
  const lastName = {
    ...lastNameInput,
    onChange: (value: string) => {
      setLastNameInput({ value, isValid: validateName(value, false) });
    },
  };
  const phoneNumber = {
    ...phoneNumberInput,
    onChange: (value: string) => {
      const phoneValidator = /^05(?!6)\d{8}$/;
      const isValid = phoneValidator.test(value);
      setPhoneNumberInput({ value, isValid });
    },
  };
  const bloodType = {
    ...bloodTypeInput,
    onChange: (value: BloodType) => {
      setBloodTypeInput({ value, isValid: value !== BloodType.UNSPECIFIED });
    },
  };

  return (
    <ExtendedSignupScreen
      {...{
        onSave,
        firstName,
        lastName,
        phoneNumber,
        bloodType,
      }}
    />
  );
}
