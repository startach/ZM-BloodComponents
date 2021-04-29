import {
  DbAppointment,
  FunctionsApi,
  Hospital,
  BookingChange,
} from "@zm-blood-components/common";
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
    donorId: testNoDonorId ? "" : "CBA",
    creationTime: admin.firestore.Timestamp.now(),
    creatorUserId: "ABC",
    donationStartTime: admin.firestore.Timestamp.now(),
    hospital: Hospital.ASAF_HAROFE,
    bookingTime: testNoBookingTime
      ? undefined
      : admin.firestore.Timestamp.now(),
  };
};

test("DBAppointment does not have an ID", () => {
  const toAppointmentApiEntry = () =>
    dbAppointmentToAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expect(toAppointmentApiEntry).toThrow("Invalid State");

  const toBookedAppointmentApiEntry = () =>
    dbAppointmentToBookedAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expect(toBookedAppointmentApiEntry).toThrow("Invalid State");

  const toAvailableAppointmentApiEntry = () =>
    dbAppointmentToAvailableAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expect(toAvailableAppointmentApiEntry).toThrow("Invalid State");
});

test("BookedAppointmentApiEntry is not booked", () => {
  const noBookingTimeAction = () =>
    dbAppointmentToBookedAppointmentApiEntry(
      getValidDBAppointment(true, false)
    );
  expect(noBookingTimeAction).toThrow("Invalid State");

  const noDonorIdAction = () =>
    dbAppointmentToBookedAppointmentApiEntry(
      getValidDBAppointment(false, true)
    );
  expect(noDonorIdAction).toThrow("Invalid State");
});

test("AvailableAppointmentApiEntry is booked", () => {
  const action = () =>
    dbAppointmentToAvailableAppointmentApiEntry(
      getValidDBAppointment(false, false)
    );
  expect(action).toThrow("Invalid State");
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

  const recentChangeType: BookingChange | undefined = getRecentChangeType(
    recentlyChangedBooking
  );
  const recentUnChangedType: BookingChange | undefined = getRecentChangeType(
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
