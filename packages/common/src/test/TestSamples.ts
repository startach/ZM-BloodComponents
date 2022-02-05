import {
  AppointmentStatus,
  AvailableAppointment,
  BloodType,
  BookedAppointment,
  Hospital,
} from "../types";

export const SampleBookedAppointment: BookedAppointment = {
  id: "bookedAppointment",
  booked: true,
  firstName: "משה",
  lastName: "כהן",
  fullName: "משה כהן",
  donationStartTimeMillis: 1702198800000, // December 10, 2023 11:00:00 GMT+02:00
  bookingTimeMillis: 1702036800000,
  donorId: "donorId",
  status: AppointmentStatus.BOOKED,
  hospital: Hospital.ASAF_HAROFE,
  phone: "0521234567",
  bloodType: BloodType.A_PLUS,
};

export const SampleAvailableAppointment: AvailableAppointment = {
  id: "availableAppointment",
  booked: false,
  donationStartTimeMillis: 1702382400000, // December 12, 2023 14:00:00 GMT+02:00
  status: AppointmentStatus.AVAILABLE,
  hospital: Hospital.TEL_HASHOMER,
};
