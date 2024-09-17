import Input from "../../components/Input";
import { useState } from "react";
import styles from "./BookManualDonationScreen.module.scss";
import {
  BloodType,
  BloodTypeUtils,
  DateUtils,
  LocaleUtils,
  Validation,
} from "@zm-blood-components/common";
import Picker from "../../components/Picker";
import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import { isEmpty } from "lodash";

export interface BookManualDonationScreenProps {
  donationStartTime: Date;
  onSave: (
    firstName: string,
    lastName: string,
    phone: string,
    bloodType: BloodType,
    countryIdNumber?: string
  ) => void;
}

export default function BookManualDonationScreen(
  props: BookManualDonationScreenProps
) {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] =
    useState<Validation.FirstNameValidation>(
      Validation.PersonalDetailsValidation.VALID_FIELD
    );
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] =
    useState<Validation.LastNameValidation>(
      Validation.PersonalDetailsValidation.VALID_FIELD
    );
  const [countryIdNumber, setCountryIdNumber] = useState("");
  const [countryIdNumberError, setCountryIdNumberError] =
    useState<Validation.CountryIdNumberValidation>(
      Validation.PersonalDetailsValidation.VALID_FIELD
    );
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<Validation.PhoneValidation>(
    Validation.PersonalDetailsValidation.VALID_FIELD
  );
  const [bloodType, setBloodType] = useState(BloodType.NOT_SURE);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const doAllFieldsHaveValue =
    !isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(phone);

  const areAllFieldsValid = [firstNameError, lastNameError, phoneError].every(
    (e) => e === Validation.PersonalDetailsValidation.VALID_FIELD
  );

  const onSave = () => {
    if (!doAllFieldsHaveValue || !areAllFieldsValid) {
      return;
    }
    setLoading(true);
    props.onSave(firstName, lastName, phone, bloodType, countryIdNumber);
  };

  const fullTime = props.donationStartTime.toLocaleDateString(
    "he-He",
    DateUtils.LongDateFormat
  );

  return (
    <CoordinatorScreen
      headerProps={{
        title: "הוספה ידנית של תורם",
        variant: HeaderVariant.SECONDARY,
        hasBackButton: true,
        stickyComponent: (
          <div className={styles.donationStartTime}>{fullTime}</div>
        ),
      }}
    >
      <div className={styles.divider} />
      <div className={styles.content}>
        <div className={styles.subtitle}>פרטים אישיים</div>
        <Input
          label="שם פרטי"
          value={firstName}
          onChangeText={setAndValidateFirstName}
          errorMessage={LocaleUtils.getValidationErrorTranslation(
            firstNameError
          )}
        />
        <Input
          label="שם משפחה"
          value={lastName}
          onChangeText={(nextLastName) => {
            setLastName(nextLastName);
            setLastNameError(
              Validation.ValidateLastName(nextLastName, firstName)
            );
          }}
          errorMessage={LocaleUtils.getValidationErrorTranslation(
            lastNameError
          )}
        />
        <Input
          label="טלפון נייד"
          value={phone}
          onChangeText={(nextPhone) => {
            setPhone(nextPhone);
            setPhoneError(Validation.ValidatePhone(nextPhone));
          }}
          errorMessage={LocaleUtils.getValidationErrorTranslation(phoneError)}
        />
        <Input
          label="תעודת זהות"
          value={countryIdNumber}
          onChangeText={(nextIdNumber) => {
            setCountryIdNumber(nextIdNumber);
            setCountryIdNumberError(Validation.ValidateIdNumber(nextIdNumber));
          }}
          errorMessage={LocaleUtils.getValidationErrorTranslation(
            countryIdNumberError
          )}
        />
        <Picker
          label={"סוג דם"}
          options={BloodTypeUtils.getBloodTypeSelectOptions()}
          value={bloodType}
          onChange={(newValue) => {
            setBloodType(newValue);
          }}
        />

        <div className={styles.buttons}>
          <Button
            title={"אישור והמשך"}
            onClick={onSave}
            isLoading={loading}
            isDisabled={!areAllFieldsValid || !doAllFieldsHaveValue}
          />
          <Button
            title={"ביטול"}
            onClick={() => navigate(-1)}
            variant={ButtonVariant.outlined}
            isDisabled={loading}
          />
        </div>
      </div>
    </CoordinatorScreen>
  );
}
