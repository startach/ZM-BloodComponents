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

  // If appointment was booked more than 10s ago
  if (now.getTime() - bookingTime.getTime() > 10_000) {
    return false;
  }

  return true;
}
