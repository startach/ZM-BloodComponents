import { BloodType, BloodTypeUtils } from "@zm-blood-components/common";
import Button, { ButtonVariant } from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import styles from "./ExtendedSignupScreen.module.scss";
import ZMScreen from "../../components/basic/ZMScreen";
import Picker from "../../components/basic/Picker";
import { useState } from "react";

export interface ExtendedSignupScreenProps {
  onSave: (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType
  ) => void;
  onSignOut: () => void;
}

export default function ExtendedSignupScreen(props: ExtendedSignupScreenProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState<BloodType | "">("");

  const [lastNameError, setLastNameError] =
    useState<string | undefined>(undefined);

  const phoneValidator = /^05(?!6)\d{8}$/;
  const isValidPhone = phoneValidator.test(phone);
  const areAllFieldsValid = !lastNameError && isValidPhone && bloodType;

  const setLastNameAndValidate = (newLastName: string) => {
    if (firstName.length + lastName.length > 20) {
      setLastNameError("השם המלא ארוך מ-20 תווים");
    } else {
      setLastNameError("");
    }

    setLastName(newLastName);
  };

  const onSave = () => {
    if (!areAllFieldsValid || !bloodType) {
      return;
    }

    props.onSave(firstName, lastName, phone, bloodType);
  };

  return (
    <ZMScreen title={"סיום הרשמה"} className={styles.extendedSignup}>
      <div className={styles.infoText}>
        תודה שבחרת להירשם כתורמ/ת. רגע לפני שתוכל/י לקבוע תור לתרומה ולהציל
        חיים,
        <div className={styles.infoTextBold}>אנחנו צריכים כמה פרטים עליך:</div>
      </div>
      <Input value={firstName} onChangeText={setFirstName} label="שם פרטי" />
      <Input
        value={lastName}
        onChangeText={setLastNameAndValidate}
        label="שם משפחה"
        errorMessage={lastNameError}
      />
      <Input
        value={phone}
        onChangeText={setPhone}
        label="מספר טלפון"
        errorMessage={
          phone.length > 0 && !isValidPhone
            ? "מספר הטלפון אינו תקין"
            : undefined
        }
      />
      <Picker
        label={"סוג דם"}
        value={bloodType}
        options={BloodTypeUtils.getBloodTypeSelectOptions()}
        onChange={setBloodType}
        buttonClassName={styles.bloodTypeButton}
      />
      <div className={styles.button}>
        <Button
          onClick={onSave}
          title={"סיום הרשמה"}
          isDisabled={!areAllFieldsValid}
        />
      </div>
      <div className={styles.signOut}>
        <Button
          onClick={props.onSignOut}
          title={"התנתק"}
          variant={ButtonVariant.text}
        />
      </div>
    </ZMScreen>
  );
}
