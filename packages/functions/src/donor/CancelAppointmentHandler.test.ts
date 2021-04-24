import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  BookingChange,
  DbAppointment,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteDonor } from "../dal/DonorDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";
import firebase from "firebase";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.CancelAppointmentFunctionName]
);

const DONOR_ID = "CancelAppointmentHandlerDonorId";
const APPOINTMENT_TO_CANCEL = "CancelAppointmentHandlerAppointment";

beforeAll(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_TO_CANCEL]);
});

afterEach(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_TO_CANCEL]);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped({ appointmentId: APPOINTMENT_TO_CANCEL });
  await expectAsyncThrows(action, "Unauthorized");
});

test("Donor not found throws exception", async () => {
  const action = () =>
    wrapped(
      { appointmentId: "" },
      {
        auth: {
          uid: DONOR_ID,
        },
      }
    );

  await expectAsyncThrows(action, "No appointment to cancel");
});

test("No such appointments throws exception", async () => {
  const action = () =>
    wrapped(
      { appointmentId: APPOINTMENT_TO_CANCEL },
      {
        auth: {
          uid: DONOR_ID,
        },
      }
    );

  await expectAsyncThrows(action, "Appointment not found");
});

test("Donor is not booked on this appointment throws exception", async () => {
  await saveAppointment("OTHER_DONOR");

  const action = () =>
    wrapped(bookAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "Appointment to be deleted is not booked by donor"
  );
});

test("Valid request cancells appointment", async () => {
  await saveAppointment(DONOR_ID);

  await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_CANCEL]);
  expect(appointment[0].donorId).toEqual("");
  expect(appointment[0].creatorUserId).toEqual("creatorUserId");
});

async function saveAppointment(donorId: string) {
  const time = admin.firestore.Timestamp.now();
  const appointment: DbAppointment = {
    id: APPOINTMENT_TO_CANCEL,
    creationTime: time,
    creatorUserId: "creatorUserId",
    donationStartTime: time,
    hospital: Hospital.ASAF_HAROFE,
    donorId: donorId,
    bookingTime: time,
    lastChangeTime: firebase.firestore.Timestamp.now(),
    lastChangeType: BookingChange.BOOKED,
  };

  await setAppointment(appointment);
}

function bookAppointmentRequest() {
  return { appointmentId: APPOINTMENT_TO_CANCEL };
}
