import { Hospital, BloodType } from "./types";

export function getHospitalName(hospital: Hospital) {
  switch (hospital) {
    case Hospital.TEL_HASHOMER:
      return "תל השומר";
    case Hospital.ASAF_HAROFE:
      return "אסף הרופא";

    default:
      console.error("No hospital name for", hospital);
      return hospital;
  }
}
export const BloodTypeTranslations = {
  [BloodType.AB_MINUS]: "AB-",
  [BloodType.AB_PLUS]: "AB+",
  [BloodType.A_MINUS]: "A-",
  [BloodType.A_PLUS]: "A+",
  [BloodType.B_MINUS]: "B-",
  [BloodType.B_PLUS]: "B+",
  [BloodType.O_MINUS]: "O-",
  [BloodType.O_PLUS]: "O+",
  [BloodType.UNSPECIFIED]: "סוג דם",
};
