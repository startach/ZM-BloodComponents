import { getHospitalName } from "./LocaleUtils";
import { activeHospitals } from "./HospitalUtils";

test("Active hospitals are sorted by local name", () => {
  const original = activeHospitals.map(getHospitalName);
  const sorted = [...original].sort();
  expect(original).toEqual(sorted);
});

test("No duplicates in active hospitals", () => {
  const unique = new Set(activeHospitals);
  expect(unique.size).toEqual(activeHospitals.length);
});
