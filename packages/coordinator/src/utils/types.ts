import { Appointment } from "@zm-blood-components/common";

export type DonationDay = {
  appointmentSlots: AppointmentSlot[];
};

export type AppointmentSlot = {
  donationStartTimeMillis: number;
  appointments: Appointment[];
};

export type ScheduleWeek = {
  days: ScheduleDay[];
};

export type ScheduleDay = {
  dayStartTime: Date;
  cells: ScheduleCell[];
};

export type ScheduleCell = {
  cellStartTime: Date;
  appointmentsCount: number;
  bookedAppointmentsCount: number;
  onClick: (cellStartTime: Date) => void;
};
