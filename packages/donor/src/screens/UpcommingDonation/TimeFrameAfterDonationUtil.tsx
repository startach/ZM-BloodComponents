import { BookedAppointment, DateUtils } from "@zm-blood-components/common";
import { useState } from "react";

export interface ITimeFrameAfterDonationPopupProps {
  getCurrentDateTime: () => Date;
  bookedAppointment: BookedAppointment;
  daysLimit: number; // 1 = 24 hours, 2 = 48 hours, ...
}

export function TimeFrameAfterDonationPopup({
  getCurrentDateTime,
  bookedAppointment,
  daysLimit,
}: ITimeFrameAfterDonationPopupProps) {
  const currentDayTime = getCurrentDateTime();
  const numberOfDaysBetweenDates = DateUtils.getNumberOfDaysBetweenDates(
    bookedAppointment.donationStartTimeMillis,
    currentDayTime.getTime()
  );
  const currentDayMillis = currentDayTime.getTime();
  // Checks if the donation is in the time frame
  if (!(numberOfDaysBetweenDates <= daysLimit)) {
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
