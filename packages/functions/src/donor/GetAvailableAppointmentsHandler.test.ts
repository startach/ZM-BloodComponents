import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  BloodType,
  DbAppointment,
  DbDonor,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";

const wrapped = firebaseFunctionsTest.wrap(Functions.getAvailableAppointments);

const CREATING_USER_ID = "GetAvailableAppointmentsHandlerCreatingUserId";
const DONOR_ID = "GetAvailableAppointmentsHandlerDonorId";
const PAST_APPOINTMENT = "GetAvailableAppointmentsHandlerAppointment1";
const FUTURE_NOT_AVAILABLE_APPOINTMENT =
  "GetAvailableAppointmentsHandlerAppointment2";
const AVAILABLE_APPOINTMENT = "GetAvailableAppointmentsHandlerAppointment3";

beforeAll(reset);
afterEach(reset);

async function reset() {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([
    PAST_APPOINTMENT,
    FUTURE_NOT_AVAILABLE_APPOINTMENT,
    AVAILABLE_APPOINTMENT,
  ]);
}

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped({});
  await expectAsyncThrows(action, "Unauthorized");
});

test("Donor not found throws exception", async () => {
  const action = () =>
    wrapped(
      {},
      {
        auth: {
          uid: DONOR_ID,
        },
      }
    );

  await expectAsyncThrows(action, "Donor not found");
});

test("No appointments returns empty response", async () => {
  await createDonor();

  const result = await callTarget();

  // Take only appointments created by this test,
  // since we may have other appointments in STG DB
  const availableAppointment = result.availableAppointments.filter(
    (x) =>
      x.id === AVAILABLE_APPOINTMENT ||
      x.id === PAST_APPOINTMENT ||
      x.id === FUTURE_NOT_AVAILABLE_APPOINTMENT
  );

  expect(availableAppointment).toHaveLength(0);
});

test("Only available appointment is returned", async () => {
  await createDonor();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  await saveAppointment(PAST_APPOINTMENT, yesterday, false);
  await saveAppointment(FUTURE_NOT_AVAILABLE_APPOINTMENT, tomorrow, true);
  await saveAppointment(AVAILABLE_APPOINTMENT, tomorrow, false);

  const result = await callTarget();
  const availableAppointments = result.availableAppointments.filter(
    (x) =>
      x.id === AVAILABLE_APPOINTMENT ||
      x.id === PAST_APPOINTMENT ||
      x.id === FUTURE_NOT_AVAILABLE_APPOINTMENT
  );

  expect(availableAppointments).toHaveLength(1);
  expect(availableAppointments[0].id).toEqual(AVAILABLE_APPOINTMENT);
  expect(availableAppointments[0].hospital).toEqual(Hospital.ASAF_HAROFE);
  expect(availableAppointments[0].donationStartTime).toEqual(tomorrow);
});

async function callTarget() {
  return (await wrapped(
    {},
    {
      auth: {
        uid: DONOR_ID,
      },
    }
  )) as FunctionsApi.GetAvailableAppointmentsResponse;
}

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    phone: "test_phone",
    email: "test_email",
    bloodType: BloodType.A_MINUS,
  };

  await setDonor(donor);
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
