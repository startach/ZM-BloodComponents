import { AppointmentStatus, BookedAppointment, Hospital } from "./index";
import { isAppointmentClosed } from "./AppointmentUtils";

describe("Upcoming donation popup", function () {
  const tempDate = 1658944904; // A date to compare with
  const oneDayInMillis = 24 * 60 * 60 * 1000; // 1 day (24 hours) in milliseconds
  const threeDaysInMillis = 259200000; // 3 days (72 hours) in milliseconds
  const bookedAppointment = {
    id: "id",
    donationStartTimeMillis: tempDate,
    bookingTimeMillis: tempDate,
    donorId: "donorId",
    status: AppointmentStatus.BOOKED,
    hospital: Hospital.TEL_HASHOMER,
    booked: true,
  } as BookedAppointment;

  it("Should not show popup when appointment is booked for more than 2 days (48 hours) in the future", () => {
    expect(
      isAppointmentClosed({
        ...bookedAppointment,
        donationStartTimeMillis: tempDate + threeDaysInMillis,
      })
    ).toBeFalsy();
  });

  it("Should not show popup when appointment was booked 1 day ago (24 hours)", () => {
    expect(
      isAppointmentClosed({
        ...bookedAppointment,
        bookingTimeMillis: tempDate - oneDayInMillis,
      })
    ).toBeFalsy();
  });

  it("Should show popup", () => {
    expect(
      isAppointmentClosed({
        ...bookedAppointment,
        donationStartTimeMillis: tempDate + 100,
        bookingTimeMillis: tempDate - 2_000,
      })
    ).toBeTruthy();
  });
});
