import { useState } from "react";
import { BloodType, Donor } from "@zm-blood-components/common";
import ExtendedSignupScreen from "./ExtendedSignupScreen";
import * as FirebaseFunctions from "../../firebase/FirebaseFunctions";
import firebase from "firebase/app";

interface ExtendedSignupScreenContainerProps {
  updateUserInAppState: (user: Donor) => void;
}

export enum NameValidation {
  valid,
  notEnoughSpaces,
  fullNameTooLong,
}

export default function ExtendedSignupScreenContainer(
  props: ExtendedSignupScreenContainerProps
) {
  const onSignOut = () => firebase.auth().signOut();

  const [firstNameInput, setFirstNameInput] = useState({
    value: "",
    isValid: true,
    errorReason: NameValidation.valid,
  });
  const [lastNameInput, setLastNameInput] = useState({
    value: "",
    isValid: true,
    errorReason: NameValidation.valid,
  });
  const [phoneNumberInput, setPhoneNumberInput] = useState({
    value: "",
    isValid: true,
  });
  const [bloodTypeInput, setBloodTypeInput] = useState<{
    value: BloodType | "";
    isValid: boolean;
  }>({
    value: "",
    isValid: true,
  });

  const setNameFields = (value: string, isFirstName: boolean) => {
    let isValid = true;
    let errorReason = NameValidation.valid;
    const consecutiveLetters = value.indexOf(" ");
    const overTenConsecutiveLetters =
      consecutiveLetters > 9 || (consecutiveLetters === -1 && value.length > 9);
    const otherNameValue = isFirstName
      ? lastNameInput.value
      : firstNameInput.value;
    const fullNameLength = value.length + otherNameValue.length;

    if (fullNameLength > 20) {
      const firstNameValue = isFirstName ? value : firstNameInput.value;
      const lastNameValue = isFirstName ? lastNameInput.value : value;
      setFirstNameInput({
        value: firstNameValue,
        isValid: false,
        errorReason: NameValidation.fullNameTooLong,
      });
      setLastNameInput({
        value: lastNameValue,
        isValid: false,
        errorReason: NameValidation.fullNameTooLong,
      });
    } else {
      if (overTenConsecutiveLetters) {
        isValid = false;
        errorReason = NameValidation.notEnoughSpaces;
      }

      if (isFirstName) {
        setFirstNameInput({ value, isValid, errorReason });
        if (lastNameInput.errorReason === NameValidation.fullNameTooLong) {
          setLastNameInput({
            value: lastNameInput.value,
            isValid: true,
            errorReason: NameValidation.valid,
          });
        }
      } else {
        setLastNameInput({ value, isValid, errorReason });
        if (firstNameInput.errorReason === NameValidation.fullNameTooLong) {
          setFirstNameInput({
            value: firstNameInput.value,
            isValid: true,
            errorReason: NameValidation.valid,
          });
        }
      }
    }
  };

  const onSave = () => {
    if (!bloodTypeInput.value) return;

    const newUser = FirebaseFunctions.saveDonor(
      firstNameInput.value,
      lastNameInput.value,
      "", // unused in pilot
      phoneNumberInput.value,
      bloodTypeInput.value
    );
    props.updateUserInAppState(newUser);
  };

  const firstName = {
    ...firstNameInput,
    onChange: (value: string) => setNameFields(value, true),
  };
  const lastName = {
    ...lastNameInput,
    onChange: (value: string) => setNameFields(value, false),
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
    onChange: (value: BloodType | "") => {
      setBloodTypeInput({ value, isValid: value !== "" });
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
        onSignOut,
      }}
    />
  );
}
