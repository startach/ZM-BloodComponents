import {
  BookingChange,
  DbAppointment,
  Hospital,
} from "@zm-blood-components/common";
import admin from "firebase-admin";
import { removeDonorFromDbAppointment } from "./AppointmentDataAccessLayer";

test("removeDonorFromDbAppointment", () => {
  const bookedAppointment: DbAppointment = {
    id: "id",
    donorId: "donorId",
    hospital: Hospital.BEILINSON,
    bookingTime: admin.firestore.Timestamp.fromMillis(1122334455),
    donationStartTime: admin.firestore.Timestamp.fromMillis(1122558899),
    creatorUserId: "creatorUserId",
    confirmationTime: admin.firestore.Timestamp.now(),
    creationTime: admin.firestore.Timestamp.now(),
  };

  const res = removeDonorFromDbAppointment(bookedAppointment);

  expect(res.id).toEqual(bookedAppointment.id);
  expect(res.creatorUserId).toEqual(bookedAppointment.creatorUserId);
  expect(res.hospital).toEqual(bookedAppointment.hospital);
  expect(res.donationStartTime).toEqual(bookedAppointment.donationStartTime);
  expect(res.creationTime).toEqual(bookedAppointment.creationTime);

  expect(res.donorId).toEqual("");
  expect(res.bookingTime).toBeUndefined();
  expect(res.confirmationTime).toBeUndefined();

  expect(res.lastChangeType).toEqual(BookingChange.CANCELLED);
  expect(Date.now() - res.lastChangeTime?.toMillis()!).toBeLessThan(3_000);
});
