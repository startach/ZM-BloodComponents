import { DbAppointment, Hospital } from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import * as Functions from "@zm-blood-components/functions";

const USER_ID_OF_TEST_USER = "ZWeoYpX0XsaU0OyOIoINWK4Fcdi2";
const SAMPLE_CREATING_USER = "SAMPLE_CREATING_USER";
firebaseFunctionsTest.wrap(Functions.getAvailableAppointments);

const AVAILABLE_APPOINTMENT = "sampleAvailableAppointment";
const BOOKED_APPOINTMENT = "sampleBookedFutureAppointment";
const PAST_AVAILABLE_APPOINTMENT = "samplePastAvailableAppointment";
const PAST_BOOKED_APPOINTMENT = "samplePastBookedAppointment";

test.skip("Write sample data", async () => {
  const now = new Date();
  const oneMonthFromNow = getDate(31);
  const oneMonthAgo = getDate(-31);

  const sampleAvailableAppointment: DbAppointment = {
    id: AVAILABLE_APPOINTMENT,
    creationTime: admin.firestore.Timestamp.fromDate(now),
    creatorUserId: SAMPLE_CREATING_USER,
    donationStartTime: admin.firestore.Timestamp.fromDate(oneMonthFromNow),
    hospital: Hospital.ASAF_HAROFE,
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
  await setAppointment(sampleAvailableAppointment);
  await setAppointment(sampleBookedFutureAppointment);
  await setAppointment(samplePastAvailableAppointment);
  await setAppointment(samplePastBookedAppointment);
});

test.skip("Clear sample data", async () => {
  await deleteAppointmentsByIds([
    AVAILABLE_APPOINTMENT,
    BOOKED_APPOINTMENT,
    PAST_AVAILABLE_APPOINTMENT,
    PAST_BOOKED_APPOINTMENT,
  ]);
});

function getDate(daysFromNow: number) {
  const res = new Date();
  res.setDate(res.getDate() + daysFromNow);
  return res;
}
