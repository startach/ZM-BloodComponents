import { BloodType, Hospital } from "./types";
import { getBloodTypeTranslation, getHospitalName } from "./LocaleUtils";

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
