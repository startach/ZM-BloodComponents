import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  DbAppointment,
  DbDonor,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.ConfirmAppointmentFunctionName]
);

import { sampleUser } from "../testUtils/TestSamples";

const DONOR_ID = "ConfirmAppointmentHandlerDonorId";
const APPOINTMENT_TO_CONFIRM = "ConfirmAppointmentHandlerAppointment";

const reset = async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_TO_CONFIRM]);
};

beforeAll(async () => {
  await reset();
});

afterEach(async () => {
  await reset();
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped({ appointmentId: APPOINTMENT_TO_CONFIRM });
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

  await expectAsyncThrows(action, "No appointment to confirm");
});

test("No such appointments throws exception", async () => {
  const action = () =>
    wrapped(
      { appointmentId: APPOINTMENT_TO_CONFIRM },
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
    wrapped(confirmAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "Appointment to be confirmed is not booked by donor"
  );
});

test("Valid request confirm appointment", async () => {
  await createDonor();
  await saveAppointment(DONOR_ID);

  await wrapped(confirmAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_CONFIRM]);
  expect(appointment[0].donationDoneTimeMillis).toBeTruthy();
  expect(appointment[0].creatorUserId).toEqual("creatorUserId");
});

async function saveAppointment(donorId: string) {
  const time = admin.firestore.Timestamp.now();
  const appointment: DbAppointment = {
    id: APPOINTMENT_TO_CONFIRM,
    creationTime: time,
    creatorUserId: "creatorUserId",
    donationStartTime: time,
    hospital: Hospital.ASAF_HAROFE,
    donorId: donorId,
    bookingTime: time,
  };

  await setAppointment(appointment);
}

function confirmAppointmentRequest() {
  return { appointmentId: APPOINTMENT_TO_CONFIRM };
}

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    ...sampleUser,
    firstName: "firstName",
    email: "email@email.com",
  };

  await setDonor(donor);
}
