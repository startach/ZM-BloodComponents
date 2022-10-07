import { AppointmentStatus, BloodType, Hospital } from "./types";
import { PersonalDetailsValidation } from "./Validation";

export function getHospitalName(hospital: Hospital) {
  switch (hospital) {
    case Hospital.TEL_HASHOMER:
      return "תל השומר";
    case Hospital.ASAF_HAROFE:
      return "אסף הרופא";
    case Hospital.BEILINSON:
      return "בילינסון";
    case Hospital.ICHILOV:
      return "איכילוב";
    case Hospital.RAMBAM:
      return 'רמב"ם';
    case Hospital.SOROKA:
      return "סורוקה";
    case Hospital.HADASA_EIN_KEREM:
      return "הדסה עין כרם";

    default:
      console.error("No hospital name for", hospital);
      return hospital;
  }
}
export const getBloodTypeTranslation = (bloodType: BloodType) => {
  switch (bloodType) {
    case BloodType.AB_MINUS:
      return "AB-";
    case BloodType.AB_PLUS:
      return "AB+";
    case BloodType.A_MINUS:
      return "A-";
    case BloodType.A_PLUS:
      return "A+";
    case BloodType.B_MINUS:
      return "B-";
    case BloodType.B_PLUS:
      return "B+";
    case BloodType.O_MINUS:
      return "O-";
    case BloodType.O_PLUS:
      return "O+";
    case BloodType.NOT_SURE:
      return "לא ידוע";

    default:
      console.error("No blood type name for", bloodType);
      return bloodType;
  }
};

export const getStatusTranslation = (
  status: AppointmentStatus,
  startTimeMillis: number
) => {
  const isPastAppointment = startTimeMillis < Date.now();

  switch (status) {
    case AppointmentStatus.AVAILABLE:
      return "פנוי";
    case AppointmentStatus.BOOKED:
      return isPastAppointment ? "אין מידע" : "מוזמן";
    case AppointmentStatus.COMPLETED:
      return "הושלם";
    case AppointmentStatus.CONFIRMED:
      return "אישר הגעה";
    case AppointmentStatus.NOSHOW:
      return "לא הגיע";

    default:
      console.error("No status translation for ", status);
      return status;
  }
};

export const getValidationErrorTranslation = (
  errorType: PersonalDetailsValidation | undefined
) => {
  switch (errorType) {
    case PersonalDetailsValidation.NAME_TOO_SHORT:
      return "שם אינו תקין";
    case PersonalDetailsValidation.FULL_NAME_TOO_LONG:
      return "השם המלא ארוך מ-20 תווים";
    case PersonalDetailsValidation.PHONE_INVALID:
      return "מספר הטלפון אינו תקין";
    case PersonalDetailsValidation.PERSONALID_INVALID:
      return "מספר תעודת הזהות אינו תקין";
    case PersonalDetailsValidation.PHONE_HAS_NANS:
    case PersonalDetailsValidation.PERSONALID_HAS_NANS:
      return "יש להזין ספרות בלבד";
    case PersonalDetailsValidation.REQUIRED_FIELD:
      return "שדה חובה";
    case PersonalDetailsValidation.VALID_FIELD:
      return "";
    default:
      return "השדה אינו תקין";
  }
};
