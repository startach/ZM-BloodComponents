import React from "react";
import { BloodType } from "@zm-blood-components/common";
import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import Select from "../../components/basic/Select";
import Styles from "./ExtendedSignupScreen.module.scss";
import HeaderSection from "../../components/HeaderSection";

enum NameValidation {
  valid,
  notEnoughSpaces,
  fullNameTooLong,
}

type ExtendedSingupField<T> = {
  value: T;
  isValid: boolean;
  onChange: (value: T) => void;
  errorReason?: NameValidation;
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
  let firstNameErrorMessage: string = "";
  let lastNameErrorMessage: string = "";

  if (!firstName.isValid) {
    firstNameErrorMessage =
      firstName.errorReason === NameValidation.fullNameTooLong
        ? "השם המלא ארוך מ20 תווים"
        : "השם הראשון ארוך מדי";
  }

  if (!lastName.isValid) {
    lastNameErrorMessage =
      lastName.errorReason === NameValidation.fullNameTooLong
        ? "השם המלא ארוך מ20 תווים"
        : "שם המשפחה ארוך מדי";
  }

  const bloodTypeTranslations = {
    [BloodType.AB_MINUS]: "AB-",
    [BloodType.AB_PLUS]: "AB+",
    [BloodType.A_MINUS]: "A-",
    [BloodType.A_PLUS]: "A+",
    [BloodType.B_MINUS]: "B-",
    [BloodType.B_PLUS]: "B+",
    [BloodType.O_MINUS]: "O-",
    [BloodType.O_PLUS]: "O+",
    [BloodType.UNSPECIFIED]: "סוג דם",
  };

  return (
    <div>
      <HeaderSection>
        <h4>משהו אחד אחרון!</h4>
        <span>פרטים אחרונים להרשמה</span>
      </HeaderSection>
      <div className={Styles["extended-signup"]}>
        <Input
          value={firstName.value}
          onChangeText={firstName.onChange}
          label="שם פרטי"
          errorMessage={firstName.isValid ? undefined : firstNameErrorMessage}
        />
        <Input
          value={lastName.value}
          onChangeText={lastName.onChange}
          label="שם משפחה"
          errorMessage={lastName.isValid ? undefined : lastNameErrorMessage}
        />
        <Input
          value={phoneNumber.value}
          onChangeText={phoneNumber.onChange}
          label="מספר טלפון"
          errorMessage={
            phoneNumber.isValid ? undefined : "מספר הטלפון אינו תקין"
          }
        />
        <Select
          value={bloodType.value}
          onChange={bloodType.onChange}
          label="סוג דם"
          isValid={bloodType.isValid}
          options={Object.values(BloodType).map((type, index) => {
            return {
              key: "ExtendedSignupScreen-" + index,
              value: type,
              label: bloodTypeTranslations[BloodType[type]],
            };
          })}
          errorMessage={bloodType.isValid ? undefined : "נא לבחור סוג דם"}
        />
        <Button
          onClick={onSave}
          title={"סיום הרשמה"}
          isDisabled={[firstName, lastName, phoneNumber, bloodType].some(
            (field) => !field.isValid || !field.value
          )}
          isFullWidth
        />
      </div>
    </div>
  );
}
