import { makeAutoObservable } from "mobx";
import { DonationSlotToBook } from "../navigation/app/LoggedInRouter";
import { Hospital } from "@zm-blood-components/common";

export class AppointmentToBookStore {
  hospital: Hospital = Hospital.BEILINSON; // Just random value
  donationStartTimeMillis = -1;
  appointmentIds: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  hasBookedAppointment() {
    return this.appointmentIds.length > 0;
  }

  cancelAppointment() {
    this.appointmentIds = [];
    this.donationStartTimeMillis = -1;
  }

  setAppointmentToBook(slot: DonationSlotToBook) {
    this.hospital = slot.hospital;
    this.donationStartTimeMillis = slot.donationStartTimeMillis;
    this.appointmentIds = slot.appointmentIds;
  }
}
