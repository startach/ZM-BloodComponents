import { Hospital } from "./types";
import { getHospitalName } from "./LocaleUtils";

test("All hospitals have names", () => {
  Object.values(Hospital).map((hospital) => {
    expect(getHospitalName(hospital)).not.toEqual(hospital);
  });
});
