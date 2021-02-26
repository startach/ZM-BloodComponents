import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  DbAppointment,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import * as admin from "firebase-admin";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetAvailableAppointmentsFunctionName]
);

const CREATING_USER_ID = "GetAvailableAppointmentsHandlerCreatingUserId";
const DONOR_ID = "GetAvailableAppointmentsHandlerDonorId";
const PAST_APPOINTMENT = "GetAvailableAppointmentsHandlerAppointment1";
const FUTURE_NOT_AVAILABLE_APPOINTMENT =
  "GetAvailableAppointmentsHandlerAppointment2";
const AVAILABLE_APPOINTMENT_1 =
  "GetAvailableAppointmentsHandlerAppointment_Available1";
const AVAILABLE_APPOINTMENT_2 =
  "GetAvailableAppointmentsHandlerAppointment_Available2";
const AVAILABLE_APPOINTMENT_3 =
  "GetAvailableAppointmentsHandlerAppointment_Available3";

const ALL_TEST_APPOINTMENTS_IDS = [
  PAST_APPOINTMENT,
  FUTURE_NOT_AVAILABLE_APPOINTMENT,
  AVAILABLE_APPOINTMENT_1,
  AVAILABLE_APPOINTMENT_2,
  AVAILABLE_APPOINTMENT_3,
];

beforeAll(reset);
afterEach(reset);

async function reset() {
  await deleteAppointmentsByIds(ALL_TEST_APPOINTMENTS_IDS);
}

test("No appointments returns empty response", async () => {
  const result = await callTarget();

  // Take only appointments created by this test,
  // since we may have other appointments in STG DB
  const availableAppointment = result.availableAppointments.filter(
    (x) =>
      x.id === AVAILABLE_APPOINTMENT_1 ||
      x.id === PAST_APPOINTMENT ||
      x.id === FUTURE_NOT_AVAILABLE_APPOINTMENT
  );

  expect(availableAppointment).toHaveLength(0);
});

test("Only available appointment is returned", async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  await saveAppointment(PAST_APPOINTMENT, yesterday, false);
  await saveAppointment(FUTURE_NOT_AVAILABLE_APPOINTMENT, tomorrow, true);
  await saveAppointment(AVAILABLE_APPOINTMENT_1, tomorrow, false);

  const result = await callTarget();
  const availableAppointments = result.availableAppointments.filter((x) =>
    ALL_TEST_APPOINTMENTS_IDS.includes(x.id)
  );

  expect(availableAppointments).toHaveLength(1);
  expect(availableAppointments[0].id).toEqual(AVAILABLE_APPOINTMENT_1);
  expect(availableAppointments[0].hospital).toEqual(Hospital.ASAF_HAROFE);
  expect(availableAppointments[0].donationStartTimeMillis).toEqual(
    tomorrow.getTime()
  );
});

test("Returns available appointments is ascending start time order", async () => {
  const in1Day = new Date();
  in1Day.setDate(in1Day.getDate() + 1);
  const in2Days = new Date();
  in2Days.setDate(in2Days.getDate() + 2);
  const in3Days = new Date();
  in3Days.setDate(in3Days.getDate() + 3);

  await saveAppointment(AVAILABLE_APPOINTMENT_1, in3Days, false);
  await saveAppointment(AVAILABLE_APPOINTMENT_2, in1Day, false);
  await saveAppointment(AVAILABLE_APPOINTMENT_3, in2Days, false);

  const result = await callTarget();
  const availableAppointments = result.availableAppointments.filter((x) =>
    ALL_TEST_APPOINTMENTS_IDS.includes(x.id)
  );

  expect(availableAppointments).toHaveLength(3);
  expect(availableAppointments[0].id).toEqual(AVAILABLE_APPOINTMENT_2);
  expect(availableAppointments[1].id).toEqual(AVAILABLE_APPOINTMENT_3);
  expect(availableAppointments[2].id).toEqual(AVAILABLE_APPOINTMENT_1);
});

async function callTarget() {
  return (await wrapped({})) as FunctionsApi.GetAvailableAppointmentsResponse;
}

async function saveAppointment(
  id: string,
  donationStartTime: Date,
  booked: boolean
) {
  const appointment: DbAppointment = {
    id: id,
    creationTime: admin.firestore.Timestamp.fromDate(donationStartTime),
    creatorUserId: CREATING_USER_ID,
    donationStartTime: admin.firestore.Timestamp.fromDate(donationStartTime),
    hospital: Hospital.ASAF_HAROFE,
    donorId: "",
  };

  if (booked) {
    appointment.donorId = DONOR_ID;
    appointment.bookingTime = admin.firestore.Timestamp.now();
  }

  await setAppointment(appointment);
  return appointment;
}
