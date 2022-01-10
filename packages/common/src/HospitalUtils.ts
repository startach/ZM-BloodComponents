import { Hospital, SelectOption } from "./types";
import { LocaleUtils } from "./index";

export type HospitalOptionKey = Hospital | typeof ALL_HOSPITALS_SELECT | "";

export const activeHospitals = [
  Hospital.ICHILOV,
  Hospital.BEILINSON,
  Hospital.HADASA_EIN_KEREM,
  Hospital.SOROKA,
  Hospital.TEL_HASHOMER,
];

export const ALL_HOSPITALS_SELECT = "ALL";

export function getAllHospitalOptions(
  hospitals: Hospital[]
): SelectOption<HospitalOptionKey>[] {
  const options: SelectOption<HospitalOptionKey>[] = getHospitalOptions(
    hospitals,
    "בחר"
  );

  if (hospitals.length > 1) {
    options.push({ label: "הכל", key: "הכל", value: ALL_HOSPITALS_SELECT });
  }

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
