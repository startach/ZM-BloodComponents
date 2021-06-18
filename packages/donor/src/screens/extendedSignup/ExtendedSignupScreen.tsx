import { BloodType, BloodTypeUtils } from "@zm-blood-components/common";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import styles from "./ExtendedSignupScreen.module.scss";
import HeaderSection from "../../components/HeaderSection";
import { NameValidation } from "./ExtendedSignupScreenContainer";
import ZMScreen from "../../components/basic/ZMScreen";
import Picker from "../../components/basic/Picker";

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
  bloodType: ExtendedSingupField<BloodType | "">;
  onSave: () => void;
  onSignOut: () => void;
}

export default function ExtendedSignupScreen({
  firstName,
  lastName,
  phoneNumber,
  bloodType,
  onSave,
  onSignOut,
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

  return (
    <ZMScreen title={"סיום הרשמה"}>
      <HeaderSection>
        <h4>משהו אחד אחרון!</h4>
        <span>פרטים אחרונים להרשמה</span>
      </HeaderSection>
      <div className={styles.extendedSignup}>
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
        <Picker
          label={"סוג דם"}
          value={bloodType.value}
          options={BloodTypeUtils.getBloodTypeSelectOptions()}
          onChange={bloodType.onChange}
          buttonClassName={styles.bloodTypeButton}
        />
        <Button
          className={styles.button}
          onClick={onSave}
          title={"סיום הרשמה"}
          isDisabled={[firstName, lastName, phoneNumber, bloodType].some(
            (field) => !field.isValid || !field.value
          )}
        />
        <br />
        <br />
        <div className={styles.signOut}>
          <Button
            onClick={onSignOut}
            title={"התנתק"}
            variant={ButtonVariant.text}
          />
        </div>
      </div>
    </ZMScreen>
  );
}
