import { BloodType, BloodTypeUtils } from "@zm-blood-components/common";
import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import styles from "./PersonalDetails.module.scss";
import Picker from "../../components/basic/Picker";
import { useState } from "react";
import classnames from "classnames";

export interface PersonalDetailsProps {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bloodType?: BloodType;
  buttonText: string;
  onSave: (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType
  ) => void;
}

export default function PersonalDetails(props: PersonalDetailsProps) {
  const [firstName, setFirstName] = useState(props.firstName || "");
  const [lastName, setLastName] = useState(props.lastName || "");
  const [phone, setPhone] = useState(props.phone || "");
  const [bloodType, setBloodType] = useState<BloodType | "">(
    props.bloodType || ""
  );

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
    <>
      <div className={styles.subtitle}>פרטים אישיים</div>
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
      <div className={classnames(styles.subtitle, styles.crucialInformation)}>
        מידע חיוני לתרומה
      </div>
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
          title={props.buttonText}
          isDisabled={!areAllFieldsValid}
        />
      </div>
    </>
  );
}
