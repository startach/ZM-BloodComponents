import { isEmpty } from "lodash";
import {
  BloodType,
  BloodTypeUtils,
  InputType,
  LocaleUtils,
  Validation,
} from "@zm-blood-components/common";
import Button from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import styles from "./PersonalDetails.module.scss";
import Picker from "../../components/basic/Picker";
import { useState } from "react";
import classnames from "classnames";
import Popup from "../../components/basic/Popup";
import Illustration from "../../assets/images/whatsapp-computer.svg";
import Toggle from "../../components/basic/Toggle/Toggle";

export interface PersonalDetailsProps {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bloodType?: BloodType;
  buttonText: string;
  enableEmailNotifications?: boolean;
  showNotificationToggle: boolean;
  onSave: (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType,
    enableEmailNotifications: boolean
  ) => void;
}

export default function PersonalDetails(props: PersonalDetailsProps) {
  const [firstName, setFirstName] = useState(props.firstName || "");
  const [firstNameError, setFirstNameError] =
    useState<Validation.FirstNameValidation>(
      Validation.PersonalDetailsValidation.VALID_FIELD
    );
  const [lastName, setLastName] = useState(props.lastName || "");
  const [lastNameError, setLastNameError] =
    useState<Validation.LastNameValidation>(
      Validation.PersonalDetailsValidation.VALID_FIELD
    );
  const [phone, setPhone] = useState(props.phone || "");
  const [phoneError, setPhoneError] = useState<Validation.PhoneValidation>(
    Validation.PersonalDetailsValidation.VALID_FIELD
  );
  const [bloodType, setBloodType] = useState<BloodType | "">(
    props.bloodType || ""
  );
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(
    !!props.enableEmailNotifications
  );
  const [bloodTypePopupOpen, setBloodTypePopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const setAndValidateFirstName = (nextFirstName: string): void => {
    setFirstName(nextFirstName);
    setFirstNameError(Validation.ValidateFirstName(nextFirstName));
    // Validate long full name
    const nextLastNameError = Validation.ValidateLastName(
      lastName,
      nextFirstName
    );
    if (
      nextLastNameError ===
        Validation.PersonalDetailsValidation.FULL_NAME_TOO_LONG ||
      lastNameError === Validation.PersonalDetailsValidation.FULL_NAME_TOO_LONG
    ) {
      setLastNameError(nextLastNameError);
    }
  };

  const areAllFieldsValid = [firstNameError, lastNameError, phoneError].every(
    (e) => e === Validation.PersonalDetailsValidation.VALID_FIELD
  );
  const allFieldsHaveValue =
    !isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(phone) && bloodType;

  const onSave = () => {
    if (!areAllFieldsValid || !bloodType) {
      return;
    }

    setLoading(true);
    props.onSave(
      firstName,
      lastName,
      phone,
      bloodType,
      enableEmailNotifications
    );
  };

  return (
    <>
      <div className={styles.subtitle}>פרטים אישיים</div>
      <Input
        analytics={{ analyticsName: "first_name" }}
        value={firstName}
        onChangeText={setAndValidateFirstName}
        label="שם פרטי"
        errorMessage={LocaleUtils.getValidationErrorTranslation(firstNameError)}
      />
      <Input
        analytics={{ analyticsName: "last_name" }}
        value={lastName}
        onChangeText={(nextLastName) => {
          setLastName(nextLastName);
          setLastNameError(
            Validation.ValidateLastName(nextLastName, firstName)
          );
        }}
        label="שם משפחה"
        errorMessage={LocaleUtils.getValidationErrorTranslation(lastNameError)}
      />
      <Input
        analytics={{ analyticsName: "phone" }}
        value={phone}
        type={InputType.Phone}
        onChangeText={(nextPhone) => {
          setPhone(nextPhone);
          setPhoneError(Validation.ValidatePhone(nextPhone));
        }}
        label="מספר טלפון"
        errorMessage={LocaleUtils.getValidationErrorTranslation(phoneError)}
      />
      <div className={classnames(styles.subtitle, styles.crucialInformation)}>
        מידע חיוני לתרומה
      </div>
      <Picker
        analytics={{ analyticsName: "blood_type" }}
        label={"סוג דם"}
        value={bloodType}
        options={BloodTypeUtils.getBloodTypeSelectOptions()}
        onChange={(newType) => {
          if (newType === BloodType.NOT_SURE) {
            setBloodTypePopupOpen(true);
          }
          setBloodType(newType);
        }}
        buttonClassName={styles.bloodTypeButton}
      />

      {props.showNotificationToggle && (
        <>
          <div className={styles.subtitle}> הגדרות נוספות </div>
          <Toggle
            analytics={{ analyticsName: "approve_email_notifications" }}
            label={"קבלת תזכורות למייל"}
            value={enableEmailNotifications}
            onChange={setEnableEmailNotifications}
          />
        </>
      )}

      <div className={styles.button}>
        <Button
          analytics={{ analyticsName: "save" }}
          onClick={onSave}
          title={props.buttonText}
          isDisabled={!areAllFieldsValid || !allFieldsHaveValue}
          isLoading={loading}
        />
      </div>

      <Popup
        analytics={{ analyticsName: "blood_type_not_known" }}
        open={bloodTypePopupOpen}
        title="לא ידוע לך סוג הדם שלך?"
        buttonApproveText="חיוג למענה הממוחשב"
        onApproved={async () => {
          window.open("tel:035300400");
          setBloodTypePopupOpen(false);
        }}
        goBackText="בעצם לא צריך"
        onBack={() => setBloodTypePopupOpen(false)}
        image={Illustration}
      >
        אין שום בעיה! ניתן לברר את סוג הדם בקלות בכל זמן במענה הטלפוני הממוחשב
        בטלפון 03−5300400
      </Popup>
    </>
  );
}
