import {
  PersonalDetailsValidation,
  ValidateFirstName,
  ValidateLastName,
  ValidatePhone,
} from "./Validation";

const VALID_FIRST_NAME = "אלי";
const VALID_LAST_NAME = "כהן";
const VALID_PHONE = "0501234567";

describe("Validations", function () {
  // First Name
  test("No First Name Returns Required Field", () => {
    const firstNameValidation = ValidateFirstName("");
    expect(firstNameValidation).toEqual(
      PersonalDetailsValidation.REQUIRED_FIELD
    );
  });

  test("Short First Name Returns Name Too Short", () => {
    const firstNameValidation = ValidateFirstName("a");
    expect(firstNameValidation).toEqual(
      PersonalDetailsValidation.NAME_TOO_SHORT
    );
  });

  test("Valid First Name Returns Valid Field", () => {
    const firstNameValidation = ValidateFirstName(VALID_FIRST_NAME);
    expect(firstNameValidation).toEqual(PersonalDetailsValidation.VALID_FIELD);
  });

  // Last Name
  test("No Last Name Returns Required Field", () => {
    const lastNameValidation = ValidateLastName("", VALID_FIRST_NAME);
    expect(lastNameValidation).toEqual(
      PersonalDetailsValidation.REQUIRED_FIELD
    );
  });

  test("Short Last Name Returns Name Too Short", () => {
    const lastNameValidation = ValidateLastName("a", VALID_FIRST_NAME);
    expect(lastNameValidation).toEqual(
      PersonalDetailsValidation.NAME_TOO_SHORT
    );
  });

  test("Long Full Name Returns Full Name Too Long", () => {
    const tenCharacterName = "אריסטארכוס";
    const elevenCharacterName = "שרגורודסקין";
    expect(ValidateLastName(tenCharacterName, elevenCharacterName)).toEqual(
      PersonalDetailsValidation.FULL_NAME_TOO_LONG
    );
    expect(ValidateLastName(elevenCharacterName, tenCharacterName)).toEqual(
      PersonalDetailsValidation.FULL_NAME_TOO_LONG
    );
  });

  test("Valid Last Name Returns Valid Field", () => {
    const lastNameValidation = ValidateLastName(
      VALID_LAST_NAME,
      VALID_FIRST_NAME
    );
    expect(lastNameValidation).toEqual(PersonalDetailsValidation.VALID_FIELD);
  });

  // Phone
  test("No Phone Returns Required Field", () => {
    const phoneValidation = ValidatePhone("");
    expect(phoneValidation).toEqual(PersonalDetailsValidation.REQUIRED_FIELD);
  });

  test("Non Numerical Characters Returns Phone Has Nans", () => {
    const phoneValidation = ValidatePhone("05012345a7");
    expect(phoneValidation).toEqual(PersonalDetailsValidation.PHONE_HAS_NANS);
  });

  test("Invalid Format Returns Phone Invalid", () => {
    expect(ValidatePhone("0401234567")).toEqual(
      PersonalDetailsValidation.PHONE_INVALID
    );
    expect(ValidatePhone("050123456")).toEqual(
      PersonalDetailsValidation.PHONE_INVALID
    );
  });

  test("Valid Phone Returns Valid Field", () => {
    const phoneValidation = ValidatePhone(VALID_PHONE);
    expect(phoneValidation).toEqual(PersonalDetailsValidation.VALID_FIELD);
  });
});
