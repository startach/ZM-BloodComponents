import {
  DbAppointment,
  FunctionsApi,
  Hospital,
  BookingChange,
} from "@zm-blood-components/common";
import { expectThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";
import {
  dbAppointmentToAppointmentApiEntry,
  dbAppointmentToAvailableAppointmentApiEntry,
  dbAppointmentToBookedAppointmentApiEntry,
  getRecentChangeType,
} from "./ApiEntriesConversionUtils";

const DB_APPOINTMENT_WITHOUT_ID: DbAppointment = {
  donorId: "CBA",
  creationTime: admin.firestore.Timestamp.now(),
  creatorUserId: "ABC",
  donationStartTime: admin.firestore.Timestamp.now(),
  hospital: Hospital.ASAF_HAROFE,
};

const getValidDBAppointment = (
  testNoBookingTime: boolean,
  testNoDonorId: boolean
): DbAppointment => {
  return {
    id: "1",
    donorId: testNoDonorId ? undefined : "CBA",
    creationTime: admin.firestore.Timestamp.now(),
    creatorUserId: "ABC",
    donationStartTime: admin.firestore.Timestamp.now(),
    hospital: Hospital.ASAF_HAROFE,
    bookingTime: testNoBookingTime
      ? admin.firestore.Timestamp.now()
      : undefined,
  };
};

test("DBAppointment does not have an ID", () => {
  const toAppointmentApiEntry = () =>
    dbAppointmentToAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expectThrows(toAppointmentApiEntry, "Invalid State");

  const toBookedAppointmentApiEntry = () =>
    dbAppointmentToBookedAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expectThrows(toBookedAppointmentApiEntry, "Invalid State");

  const toAvailableAppointmentApiEntry = () =>
    dbAppointmentToAvailableAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expectThrows(toAvailableAppointmentApiEntry, "Invalid State");
});

test("BookedAppointmentApiEntry is not booked", () => {
  const noBookingTimeAction = () =>
    dbAppointmentToBookedAppointmentApiEntry(
      getValidDBAppointment(true, false)
    );
  expectThrows(noBookingTimeAction, "Invalid State");

  const noDonorIdAction = () =>
    dbAppointmentToBookedAppointmentApiEntry(
      getValidDBAppointment(false, true)
    );
  expectThrows(noDonorIdAction, "Invalid State");
});

test("AvailableAppointmentApiEntry is booked", () => {
  const action = () =>
    dbAppointmentToAvailableAppointmentApiEntry(
      getValidDBAppointment(false, false)
    );
  expectThrows(action, "Invalid State");
});

test("getRecentChangeType", () => {
  const dayInMillis = 1000 * 60 * 60 * 24;

  const currentMillis = admin.firestore.Timestamp.now().toMillis();

  const halfADayAgoInMillis = currentMillis - dayInMillis / 2;

  const aDayAndAHalfAgoInMillis = currentMillis - dayInMillis * 1.5;

  const recentlyChangedBooking: DbAppointment = {
    ...getValidDBAppointment(false, false),
    lastChangeTime: admin.firestore.Timestamp.fromMillis(halfADayAgoInMillis),
    lastChangeType: BookingChange.BOOKED,
  };

  const recentlyUnchangedBooking: DbAppointment = {
    ...getValidDBAppointment(false, false),
    lastChangeTime: admin.firestore.Timestamp.fromMillis(
      aDayAndAHalfAgoInMillis
    ),
    lastChangeType: BookingChange.CANCELLED,
  };

  const recentChangeType: BookingChange = getRecentChangeType(
    recentlyChangedBooking
  );
  const recentUnChangedType: BookingChange = getRecentChangeType(
    recentlyUnchangedBooking
  );

  expect(recentChangeType).toBe(BookingChange.BOOKED);
  expect(recentUnChangedType).toBeUndefined();
});

test("Valid conversion to booked appointment", () => {
  const DBBookedAppointment = getValidDBAppointment(false, false);

  const bookedAppointment: FunctionsApi.BookedAppointmentApiEntry = dbAppointmentToBookedAppointmentApiEntry(
    DBBookedAppointment
  );

  expect(bookedAppointment).toBeDefined();
});

test("Valid conversion to available appointment", () => {
  const DBBookedAppointment = getValidDBAppointment(true, true);

  const availableAppointment: FunctionsApi.AvailableAppointmentApiEntry = dbAppointmentToAvailableAppointmentApiEntry(
    DBBookedAppointment
  );

  expect(availableAppointment).toBeDefined();
});
