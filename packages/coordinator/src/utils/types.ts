import { BloodType, BookingChange } from "@zm-blood-components/common";

export type SortFunction<T> = (a: T, b: T) => number;

export type DonationDay = {
  day: string;
  appointmentSlots: AppointmentSlot[];
};

export type AppointmentSlot = {
  donationStartTimeMillis: number;
  appointments: Appointment[];
};

export type Appointment = {
  appointmentId: string;
  booked: boolean;
  donorName?: string;
  donationStartTimeMillis: number;
  donorPhoneNumber?: string;
  bookingTimeMillis?: number;
  recentChangeType?: BookingChange;
  isPastAppointment: boolean;
  bloodType?: BloodType;
};
