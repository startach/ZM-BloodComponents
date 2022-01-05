import { BookedAppointment, DateUtils } from "@zm-blood-components/common";

export function shouldDisplaySameDayDonationPopup(
  now: Date,
  bookedAppointment: BookedAppointment
) {
  const donationStartTime = new Date(bookedAppointment.donationStartTimeMillis);
  const bookingTime = new Date(bookedAppointment.bookingTimeMillis);
  if (!DateUtils.isSameDay(now, donationStartTime)) {
    return false;
  }

  // If appointment was booked more than 20s ago
  // Without this, a user could schedule on Sunday an appointment starting on Monday,
  // and then re-open the app on Monday and see the popup.
  // Here we verify that the appointment was booked very recently
  if (now.getTime() - bookingTime.getTime() > 20_000) {
    return false;
  }

  return true;
}
