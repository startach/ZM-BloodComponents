import {
  AppointmentStatus,
  BloodType,
  BookingChange,
  FunctionsApi,
  Hospital,
  MANUAL_DONOR_ID,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import {
  dbAppointmentToAppointmentApiEntry,
  dbAppointmentToAvailableAppointmentApiEntry,
  dbAppointmentToBookedAppointmentApiEntry,
  dbDonorToDonor,
  getRecentChangeType,
} from "./ApiEntriesConversionUtils";
import { sampleUser } from "../testUtils/TestSamples";
import { DbAppointment, DbDonor } from "../function-types";

const DONOR_ID = "DONOR_ID";
const APPOINTMENT_ID = "APPOINTMENT_ID";
const DB_APPOINTMENT_WITHOUT_ID: DbAppointment = {
  donorId: DONOR_ID,
  creationTime: admin.firestore.Timestamp.now(),
  creatorUserId: "ABC",
  donationStartTime: admin.firestore.Timestamp.now(),
  hospital: Hospital.ASAF_HAROFE,
  status: AppointmentStatus.BOOKED,
};

const getValidDBAppointment = (
  testNoBookingTime: boolean,
  testNoDonorId: boolean
): DbAppointment => {
  return {
    id: "1",
    donorId: testNoDonorId ? "" : DONOR_ID,
    creationTime: admin.firestore.Timestamp.now(),
    creatorUserId: "ABC",
    donationStartTime: admin.firestore.Timestamp.now(),
    hospital: Hospital.ASAF_HAROFE,
    bookingTime: testNoBookingTime
      ? undefined
      : admin.firestore.Timestamp.now(),
    status: testNoDonorId
      ? AppointmentStatus.AVAILABLE
      : AppointmentStatus.BOOKED,
  };
};

test("DbDonor is converted to Donor", () => {
  const dbDonor: DbDonor = {
    id: "donorId",
    ...sampleUser,
    notificationSettings: {
      disableEmailNotifications: true,
    },
  };

  const res = dbDonorToDonor(dbDonor);
  expect(res).toEqual(dbDonor);
});

test("NotificationSettings are added to donor without any", () => {
  const dbDonor: DbDonor = {
    id: "donorId",
    ...sampleUser,
  };

  const res = dbDonorToDonor(dbDonor);
  expect(res).toEqual({
    ...dbDonor,
    notificationSettings: {
      disableEmailNotifications: false,
    },
  });
});

test("DBAppointment does not have an ID", () => {
  const toAppointmentApiEntry = () =>
    dbAppointmentToAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID, []);
  expect(toAppointmentApiEntry).toThrow("Invalid State");

  const toBookedAppointmentApiEntry = () =>
    dbAppointmentToBookedAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expect(toBookedAppointmentApiEntry).toThrow("Invalid State");

  const toAvailableAppointmentApiEntry = () =>
    dbAppointmentToAvailableAppointmentApiEntry(DB_APPOINTMENT_WITHOUT_ID);
  expect(toAvailableAppointmentApiEntry).toThrow("Invalid State");
});

test("AppointmentApiEntry has donor name when donor is a regular donor", () => {
  const appointment: DbAppointment = {
    ...DB_APPOINTMENT_WITHOUT_ID,
    id: APPOINTMENT_ID,
  };
  const res = dbAppointmentToAppointmentApiEntry(appointment, [
    {
      ...sampleUser,
      id: DONOR_ID,
    },
  ]);
  expect(res.id).toEqual(APPOINTMENT_ID);
  expect(res.donorName).toEqual(
    sampleUser.firstName + " " + sampleUser.lastName
  );
});

test("AppointmentApiEntry has donor name when donor is a manual donor", () => {
  const appointment: DbAppointment = {
    ...DB_APPOINTMENT_WITHOUT_ID,
    id: APPOINTMENT_ID,
    donorId: MANUAL_DONOR_ID,
    donorDetails: {
      firstName: "AAAA",
      lastName: "BB",
      phoneNumber: "123",
      bloodType: BloodType.NOT_SURE,
    },
  };
  const res = dbAppointmentToAppointmentApiEntry(appointment, []);
  expect(res.id).toEqual(APPOINTMENT_ID);
  expect(res.donorName).toEqual("AAAA BB");
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

  const bookedAppointment: FunctionsApi.BookedAppointmentApiEntry =
    dbAppointmentToBookedAppointmentApiEntry(DBBookedAppointment);

  expect(bookedAppointment).toBeDefined();
});

test("Valid conversion to available appointment", () => {
  const DBBookedAppointment = getValidDBAppointment(true, true);

  const availableAppointment: FunctionsApi.AvailableAppointmentApiEntry =
    dbAppointmentToAvailableAppointmentApiEntry(DBBookedAppointment);

  expect(availableAppointment).toBeDefined();
});
