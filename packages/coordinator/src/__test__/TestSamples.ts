import { Appointment } from "../utils/types";
import { BloodType } from "@zm-blood-components/common";

export const SampleBookedAppointment: Appointment = {
  appointmentId: "bookedAppointment",
  booked: true,
  donorName: "משה כהן",
  donationStartTimeMillis: 1702198800000, // December 10, 2023 11:00:00 GMT+02:00
  donorPhoneNumber: "052-1234567",
  bookingTimeMillis: 1702036800000,
  isPastAppointment: false,
  bloodType: BloodType.AB_PLUS,
};

export const SampleAvailableAppointment: Appointment = {
  appointmentId: "availableAppointment",
  booked: false,
  donationStartTimeMillis: 1702382400000, // December 12, 2023 14:00:00 GMT+02:00
  isPastAppointment: false,
};
