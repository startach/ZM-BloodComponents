import {
  removeDonorFromAppointment,
  removeDonorFromDbAppointment,
} from "./AppointmentUtils";
import { AppointmentApiEntry } from "./functions-api";
import { DbAppointment, Hospital } from "./types";
import firebase from "firebase";

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
});

test("removeDonorFromDbAppointment", () => {
  const bookedAppointment: DbAppointment = {
    id: "id",
    donorId: "donorId",
    hospital: Hospital.BEILINSON,
    bookingTime: firebase.firestore.Timestamp.fromMillis(1122334455),
    donationStartTime: firebase.firestore.Timestamp.fromMillis(1122558899),
    creatorUserId: "creatorUserId",
    confirmationTime: firebase.firestore.Timestamp.now(),
    creationTime: firebase.firestore.Timestamp.now(),
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
});
