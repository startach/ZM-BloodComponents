import { Hospital, SelectOption } from "./types";
import { LocaleUtils } from "./index";

export const activeHospitals = [
  Hospital.ICHILOV,
  Hospital.BEILINSON,
  Hospital.HADASA_EIN_KEREM,
  Hospital.SOROKA,
  Hospital.TEL_HASHOMER,
];

export const ALL_HOSPITALS_SELECT = "ALL";

export function getAllHospitalOptions(
  hospitals: Hospital[],
  allLable: string,
  defaultLabel?: string
): SelectOption<Hospital | typeof ALL_HOSPITALS_SELECT | "">[] {
  let options: SelectOption<Hospital | typeof ALL_HOSPITALS_SELECT | "">[] =
    getHospitalOptions(hospitals, defaultLabel);
  options.push({ label: allLable, key: allLable, value: ALL_HOSPITALS_SELECT });

  return options;
}

// If defaultLabel, will add an option with value ""
export function getHospitalOptions(
  hospitals: Hospital[],
  defaultLabel?: string
) {
  const options: SelectOption<Hospital | "">[] =
    hospitals.map(hospitalToOption);

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
