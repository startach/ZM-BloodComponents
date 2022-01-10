import {
  AppointmentStatus,
  BookedAppointment,
  Hospital,
} from "../../../../common/src";
import { shouldDisplaySameDayDonationPopup } from "./SameDayDonationUtil";

describe("Upcoming donation popup", function () {
  const now = 1641229200000;
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const bookedAppointment: BookedAppointment = {
    id: "id",
    donationStartTimeMillis: now,
    bookingTimeMillis: now,
    donorId: "donorId",
    status: AppointmentStatus.BOOKED,
    hospital: Hospital.TEL_HASHOMER,
  };

  it("should not show popup when appointment is for the next day", () => {
    expect(
      shouldDisplaySameDayDonationPopup(new Date(now), {
        ...bookedAppointment,
        donationStartTimeMillis: now + oneDayInMillis,
      })
    ).toBeFalsy();
  });

  it("should not show popup when appointment was booked 1 day ago", () => {
    expect(
      shouldDisplaySameDayDonationPopup(new Date(now), {
        ...bookedAppointment,
        bookingTimeMillis: now - oneDayInMillis,
      })
    ).toBeFalsy();
  });

  it("should show popup", () => {
    expect(
      shouldDisplaySameDayDonationPopup(new Date(now), {
        ...bookedAppointment,
        donationStartTimeMillis: now + 100,
        bookingTimeMillis: now - 2_000,
      })
    ).toBeTruthy();
  });
});
