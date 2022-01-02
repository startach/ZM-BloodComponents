import CoordinatorHeader from "../../components/CoordinatorHeader";
import Input from "../../components/Input";
import { useState } from "react";
import styles from "./BookManualDonationScreen.module.scss";
import { BloodType, BloodTypeUtils } from "@zm-blood-components/common";
import Picker from "../../components/Picker";
import Button, { ButtonVariant } from "../../components/Button";
import { useHistory } from "react-router-dom";

export interface BookManualDonationScreenProps {
  onSave: (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType
  ) => void;
}

export default function BookManualDonationScreen(
  props: BookManualDonationScreenProps
) {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bloodType, setBloodType] = useState(BloodType.NOT_SURE);

  const history = useHistory();

  const onSave = () => {
    let valid = true;
    if (!firstName) {
      setFirstNameError("שדה חובה");
      valid = false;
    } else if (firstName.length < 2) {
      setFirstNameError("הקלט אינו תקין");
      valid = false;
    }
    if (!lastName) {
      setLastNameError("שדה חובה");
      valid = false;
    } else if (lastName.length < 2) {
      setLastNameError("הקלט אינו תקין");
      valid = false;
    }
    if (!phone) {
      setPhoneError("שדה חובה");
      valid = false;
    }

    const isPhoneNumberAllNumbers = /^[0-9]*$/.test(phone);
    const phoneValidator = /^05(?!6)\d{8}$/;
    const isValidPhone = phoneValidator.test(phone);
    if (!isPhoneNumberAllNumbers) {
      setPhoneError("יש להזין ספרות בלבד");
      valid = false;
    } else if (phone.length > 0 && !isValidPhone) {
      setPhoneError("מספר הטלפון אינו תקין");
      valid = false;
    }

    if (valid) {
      props.onSave(firstName, lastName, phone, bloodType);
    }
  };

  return (
    <div>
      <CoordinatorHeader title={"הוספה ידנית של תורם"} hasBackButton />

      <div className={styles.content}>
        <div className={styles.subtitle}>פרטים אישיים</div>
        <Input
          label="שם פרטי"
          value={firstName}
          onChangeText={(newValue) => {
            setFirstName(newValue);
            setFirstNameError("");
          }}
          errorMessage={firstNameError}
        />
        <Input
          label="שם משפחה"
          value={lastName}
          onChangeText={(newValue) => {
            setLastName(newValue);
            setLastNameError("");
          }}
          errorMessage={lastNameError}
        />
        <Input
          label="טלפון נייד"
          value={phone}
          onChangeText={(newValue) => {
            setPhone(newValue);
            setPhoneError("");
          }}
          errorMessage={phoneError}
        />

        <Picker
          label={"סוג דם"}
          options={BloodTypeUtils.getBloodTypeSelectOptions()}
          value={bloodType}
          onChange={(newValue) => {
            setBloodType(newValue);
          }}
        />

        <Button
          title={"אישור והמשך"}
          onClick={onSave}
          className={styles.button}
        />
        <Button
          title={"ביטול"}
          onClick={() => history.goBack()}
          className={styles.button}
          variant={ButtonVariant.outlined}
          color={"default"}
        />
      </div>
    </div>
  );
}
