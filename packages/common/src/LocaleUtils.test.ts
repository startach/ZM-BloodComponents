import { BloodType, Hospital } from "./types";
import {
  getBloodTypeTranslation,
  getHospitalName,
  getValidationErrorTranslation,
} from "./LocaleUtils";
import { PersonalDetailsValidation } from "./Validation";

test("All hospitals have names", () => {
  Object.values(Hospital).map((hospital) => {
    expect(getHospitalName(hospital)).not.toEqual(hospital);
  });
});

test("All blood types have names", () => {
  Object.values(BloodType).map((bloodType) => {
    expect(getBloodTypeTranslation(bloodType)).not.toEqual(bloodType);
  });
});

test("All personal detail validations have names", () => {
  Object.values(PersonalDetailsValidation).map((personalDetailValidation) => {
    expect(getValidationErrorTranslation(personalDetailValidation)).not.toEqual(
      personalDetailValidation
    );
  });
});
