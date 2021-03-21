import { Hospital, SelectOption } from "./types";
import { LocaleUtils } from "./index";

const activeHospitals = [Hospital.BEILINSON, Hospital.HADASA];

export function getAllHospitalOptions(defaultLabel?: string) {
  return getHospitalOptions(activeHospitals, defaultLabel);
}

// If defaultLabel, will add an option with value ""
export function getHospitalOptions(
  hospitals: Hospital[],
  defaultLabel?: string
) {
  const options: SelectOption<Hospital | "">[] = hospitals.map(
    hospitalToOption
  );
  if (defaultLabel) {
    options.unshift({ label: defaultLabel, key: defaultLabel, value: "" });
  }
  return options;
}

function hospitalToOption(hospital: Hospital): SelectOption<Hospital> {
  return {
    label: LocaleUtils.getHospitalName(hospital),
    value: hospital,
    key: hospital,
  };
}
