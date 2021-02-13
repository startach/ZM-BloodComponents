import { Hospital } from "./types";

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
