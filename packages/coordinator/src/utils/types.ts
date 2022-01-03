import { BloodType, BookingChange } from "@zm-blood-components/common";

export type SortFunction<T> = (a: T, b: T) => number;

export type DonationDay = {
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

export type ScheduleWeek = {
  days: ScheduleDay[];
};

export type ScheduleDay = {
  cells: ScheduleCell[];
};

export type ScheduleCell = {
  cellStartTime: Date;
  appointmentsCount: number;
  bookedAppointmentsCount: number;
  onClick: (cellStartTime: Date) => void;
};
