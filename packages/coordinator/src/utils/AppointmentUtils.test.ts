import { BookingChange, Hospital } from "@zm-blood-components/common";
import { AppointmentApiEntry } from "@zm-blood-components/common/lib/functions-api";
import { removeDonorFromAppointment } from "./AppointmentUtils";

test("removeDonorFromAppointment", () => {
  const bookedAppointment: AppointmentApiEntry = {
    id: "id",
    donorId: "donorId",
    hospital: Hospital.BEILINSON,
    bookingTimeMillis: 123,
    donationStartTimeMillis: 456,
  };

  const res = removeDonorFromAppointment(bookedAppointment);

  expect(res.id).toEqual(bookedAppointment.id);
  expect(res.hospital).toEqual(bookedAppointment.hospital);
  expect(res.donationStartTimeMillis).toEqual(
    bookedAppointment.donationStartTimeMillis
  );

  expect(res.donorId).toEqual("");
  expect(res.bookingTimeMillis).toBeUndefined();

  expect(res.recentChangeType).toEqual(BookingChange.CANCELLED);
});
