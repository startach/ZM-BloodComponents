export enum PersonalDetailsValidation {
  VALID_FIELD = "VALID_FIELD",
  NAME_TOO_SHORT = "NAME_TOO_SHORT",
  FULL_NAME_TOO_LONG = "FULL_NAME_TOO_LONG",
  ID_INVALID = "ID_INVALID",
  ID_HAS_NANS = "ID_HAS_NANS",
  PHONE_INVALID = "PHONE_INVALID",
  PHONE_HAS_NANS = "PHONE_HAS_NANS",
  REQUIRED_FIELD = "REQUIRED_FIELD",
}

type FieldValidation =
  | PersonalDetailsValidation.VALID_FIELD
  | PersonalDetailsValidation.REQUIRED_FIELD;

export type FirstNameValidation =
  | FieldValidation
  | PersonalDetailsValidation.NAME_TOO_SHORT;

export type LastNameValidation =
  | FieldValidation
  | PersonalDetailsValidation.NAME_TOO_SHORT
  | PersonalDetailsValidation.FULL_NAME_TOO_LONG;

export type CountryIdNumberValidation =
  PersonalDetailsValidation.VALID_FIELD
  | PersonalDetailsValidation.ID_INVALID
  | PersonalDetailsValidation.ID_HAS_NANS;

export type PhoneValidation =
  | FieldValidation
  | PersonalDetailsValidation.PHONE_INVALID
  | PersonalDetailsValidation.PHONE_HAS_NANS;

export const ValidateFirstName = (firstName: string): FirstNameValidation => {
  if (!firstName) return PersonalDetailsValidation.REQUIRED_FIELD;

  if (firstName.length < 2) return PersonalDetailsValidation.NAME_TOO_SHORT;
  return PersonalDetailsValidation.VALID_FIELD;
};

export const ValidateLastName = (
  lastName: string,
  firstName: string
): LastNameValidation => {
  if (!lastName) return PersonalDetailsValidation.REQUIRED_FIELD;

  if (lastName.length < 2) return PersonalDetailsValidation.NAME_TOO_SHORT;

  if (lastName.length + firstName.length > 20)
    return PersonalDetailsValidation.FULL_NAME_TOO_LONG;

  return PersonalDetailsValidation.VALID_FIELD;
};

export const ValidateIdNumber = (id: string): CountryIdNumberValidation => {
  const allNumbersValidator = /^[0-9]*$/;
  if (!allNumbersValidator.test(id)) {
    return PersonalDetailsValidation.ID_HAS_NANS;
  }
  const formatValidator = /^\d{9}$/;
  if (id.length > 0 && !formatValidator.test(id)) {
    return PersonalDetailsValidation.ID_INVALID;
  }
  return PersonalDetailsValidation.VALID_FIELD;
};

export const ValidatePhone = (phone: string): PhoneValidation => {
  if (!phone) return PersonalDetailsValidation.REQUIRED_FIELD;

  const allNumbersValidator = /^[0-9]*$/;
  if (!allNumbersValidator.test(phone)) {
    return PersonalDetailsValidation.PHONE_HAS_NANS;
  }
  const formatValidator = /^05(?!6)\d{8}$/;
  if (phone.length > 0 && !formatValidator.test(phone)) {
    return PersonalDetailsValidation.PHONE_INVALID;
  }
  return PersonalDetailsValidation.VALID_FIELD;
};
