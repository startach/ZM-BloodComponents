import {
  DbAppointment,
  Hospital,
  DbDonor,
  BloodType,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import * as Functions from "../index";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";

const USER_ID_OF_TEST_USER = "ZWeoYpX0XsaU0OyOIoINWK4Fcdi2";
const SAMPLE_CREATING_USER = "SAMPLE_CREATING_USER";
firebaseFunctionsTest.wrap(Functions.getAvailableAppointments);

const AVAILABLE_APPOINTMENT = "sampleAvailableAppointment";
const AVAILABLE_APPOINTMENT_2 = "sampleAvailableAppointment2";
const BOOKED_APPOINTMENT = "sampleBookedFutureAppointment";
const PAST_AVAILABLE_APPOINTMENT = "samplePastAvailableAppointment";
const PAST_BOOKED_APPOINTMENT = "samplePastBookedAppointment";

/*
 * Util to add mocked data to DB for client work
 */

test.skip("Write sample data", async () => {
  const now = new Date();
  const oneMonthFromNow = getDate(31);
  const oneWeekFromNow = getDate(7);
  const oneMonthAgo = getDate(-31);

  const sampleAvailableAppointment: DbAppointment = {
    id: AVAILABLE_APPOINTMENT,
    creationTime: admin.firestore.Timestamp.fromDate(now),
    creatorUserId: SAMPLE_CREATING_USER,
    donationStartTime: admin.firestore.Timestamp.fromDate(oneMonthFromNow),
    hospital: Hospital.ASAF_HAROFE,
    donorId: "",
  };

  const sampleAvailableAppointment2: DbAppointment = {
    id: AVAILABLE_APPOINTMENT_2,
    creationTime: admin.firestore.Timestamp.fromDate(now),
    creatorUserId: SAMPLE_CREATING_USER,
    donationStartTime: admin.firestore.Timestamp.fromDate(oneWeekFromNow),
    hospital: Hospital.TEL_HASHOMER,
    donorId: "",
  };

  const sampleBookedFutureAppointment: DbAppointment = {
    id: BOOKED_APPOINTMENT,
    creationTime: admin.firestore.Timestamp.fromDate(now),
    creatorUserId: SAMPLE_CREATING_USER,
    donationStartTime: admin.firestore.Timestamp.fromDate(oneMonthFromNow),
    hospital: Hospital.ASAF_HAROFE,
    donorId: USER_ID_OF_TEST_USER,
  };

  const samplePastAvailableAppointment: DbAppointment = {
    id: PAST_AVAILABLE_APPOINTMENT,
    creationTime: admin.firestore.Timestamp.fromDate(oneMonthAgo),
    creatorUserId: SAMPLE_CREATING_USER,
    donationStartTime: admin.firestore.Timestamp.fromDate(oneMonthAgo),
    hospital: Hospital.ASAF_HAROFE,
    donorId: "",
  };

  const samplePastBookedAppointment: DbAppointment = {
    id: PAST_BOOKED_APPOINTMENT,
    creationTime: admin.firestore.Timestamp.fromDate(oneMonthAgo),
    creatorUserId: SAMPLE_CREATING_USER,
    donationStartTime: admin.firestore.Timestamp.fromDate(oneMonthAgo),
    hospital: Hospital.ASAF_HAROFE,
    donorId: USER_ID_OF_TEST_USER,
  };

  const promises: Promise<any>[] = [];
  promises.push(setAppointment(sampleAvailableAppointment));
  promises.push(setAppointment(sampleAvailableAppointment2));
  promises.push(setAppointment(sampleBookedFutureAppointment));
  promises.push(setAppointment(samplePastAvailableAppointment));
  promises.push(setAppointment(samplePastBookedAppointment));

  const donor: DbDonor = {
    id: USER_ID_OF_TEST_USER,
    email: "email",
    phone: "phone",
    bloodType: BloodType.A_MINUS,
    firstName: "ירון",
    lastName: "מלין",
    birthDate: "2020-11-13",
    testUser: false,
  };

  promises.push(setDonor(donor));

  await Promise.all(promises);
});

test.skip("Clear sample data", async () => {
  await deleteAppointmentsByIds([
    AVAILABLE_APPOINTMENT,
    BOOKED_APPOINTMENT,
    PAST_AVAILABLE_APPOINTMENT,
    PAST_BOOKED_APPOINTMENT,
  ]);

  await deleteDonor(USER_ID_OF_TEST_USER);
});

function getDate(daysFromNow: number) {
  const res = new Date();
  res.setDate(res.getDate() + daysFromNow);
  return res;
}
