import { makeAutoObservable } from "mobx";
import { Hospital } from "@zm-blood-components/common";

export type DonationSlotToBook = {
  hospital: Hospital;
  donationStartTimeMillis: number;
  appointmentIds: string[];
};

export class AppointmentToBookStore {
  hospital: Hospital = Hospital.BEILINSON; // Just random value
  donationStartTimeMillis = -1;
  appointmentIds: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  hasAppointmentToBook() {
    return this.appointmentIds.length > 0;
  }

  clear() {
    this.appointmentIds = [];
    this.donationStartTimeMillis = -1;
  }

  setAppointmentToBook(slot: DonationSlotToBook) {
    this.hospital = slot.hospital;
    this.donationStartTimeMillis = slot.donationStartTimeMillis;
    this.appointmentIds = slot.appointmentIds;
  }
}
