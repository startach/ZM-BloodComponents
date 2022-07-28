import {
  AppointmentStatus,
  BookedAppointment,
  Hospital,
} from "../../../../common/src";
import { TimeFrameAfterDonationPopup } from "./TimeFrameAfterDonationUtil";

describe("Upcoming donation popup", function () {
  const tempDate = 1658944904; // A date to compare with
  const oneDayInMillis = 24 * 60 * 60 * 1000; // 1 day (24 hours) in milliseconds
  const threeDaysInMillis = 259200000; // 3 days (72 hours) in milliseconds
  const DAYS_LIMIT = 2; // 2 => 2 days => 48 hours
  const bookedAppointment = {
    id: "id",
    donationStartTimeMillis: tempDate,
    bookingTimeMillis: tempDate,
    donorId: "donorId",
    status: AppointmentStatus.BOOKED,
    hospital: Hospital.TEL_HASHOMER,
    booked: true,
  } as BookedAppointment;

  it("Should not show popup when appointment is more than 2 days (48 hours)", () => {
    expect(
      TimeFrameAfterDonationPopup({
        getCurrentDateTime: () => new Date(tempDate),
        bookedAppointment: {
          ...bookedAppointment,
          donationStartTimeMillis: tempDate + threeDaysInMillis,
        },
        daysLimit: DAYS_LIMIT,
      })
    ).toBeFalsy();
  });

  it("Should not show popup when appointment was booked 1 day ago (24 hours)", () => {
    expect(
      TimeFrameAfterDonationPopup({
        getCurrentDateTime: () => new Date(tempDate),
        bookedAppointment: {
          ...bookedAppointment,
          bookingTimeMillis: tempDate - oneDayInMillis,
        },
        daysLimit: DAYS_LIMIT,
      })
    ).toBeFalsy();
  });

  it("Should show popup", () => {
    expect(
      TimeFrameAfterDonationPopup({
        getCurrentDateTime: () => new Date(tempDate),
        bookedAppointment: {
          ...bookedAppointment,
          donationStartTimeMillis: tempDate + 100,
          bookingTimeMillis: tempDate - 2_000,
        },
        daysLimit: DAYS_LIMIT,
      })
    ).toBeTruthy();
  });
});
