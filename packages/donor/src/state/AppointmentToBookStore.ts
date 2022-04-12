import { makeAutoObservable } from "mobx";
import { Donor, Hospital, DateUtils } from "@zm-blood-components/common";

const MIN_DAYS_BETWEEN_DONATIONS = 30;

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

  isDonationValidForDonor(donor: Donor): boolean {
    const daysBetweenLastDonorDonationToSlot =
      donor.lastCompletedDonationTimeMillis &&
      DateUtils.getNumberOfDaysBetweenDates(
        this.donationStartTimeMillis,
        donor.lastCompletedDonationTimeMillis
      );
    const isAppointmentTooCloseToLastDonation =
      daysBetweenLastDonorDonationToSlot
        ? daysBetweenLastDonorDonationToSlot > MIN_DAYS_BETWEEN_DONATIONS
        : false;

    return isAppointmentTooCloseToLastDonation;
  }
}
