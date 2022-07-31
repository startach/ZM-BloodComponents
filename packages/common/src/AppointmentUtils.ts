import { MANUAL_DONOR_ID, BookedAppointment } from "./types";
import { DateUtils } from "./index";

export function isManualDonor(donorId: string) {
  return donorId === MANUAL_DONOR_ID;
}

export function isAppointmentClosed({
  ...bookedAppointment
}: BookedAppointment) {
  const DAYS_LIMIT = 2;
  const currentDayTime = new Date();
  const numberOfDaysBetweenDates = DateUtils.getNumberOfDaysBetweenDates(
    bookedAppointment.donationStartTimeMillis,
    currentDayTime.getTime()
  );
  const currentDayMillis = currentDayTime.getTime();
  // Checks if the donation is in the time frame
  if (numberOfDaysBetweenDates > DAYS_LIMIT || numberOfDaysBetweenDates < 0) {
    return false;
  }

  // If appointment was booked more than 20s ago
  // Without this, a user could schedule on Sunday an appointment starting on Monday,
  // and then re-open the app on Monday and see the popup.
  // Here we verify that the appointment was booked very recently
  if (currentDayMillis - bookedAppointment.bookingTimeMillis > 20_000) {
    return false;
  }

  return true;
}
