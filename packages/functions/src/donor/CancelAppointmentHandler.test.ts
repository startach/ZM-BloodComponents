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
  Functions[FunctionsApi.CancelAppointmentFunctionName]
);

import { notifyOnCancelAppointment } from "../notifications/CancelAppointmentNotifier";
import { mocked } from "ts-jest/utils";
import { sampleUser } from "../testUtils/TestSamples";

jest.mock("../notifications/CancelAppointmentNotifier");
const mockedNotifier = mocked(notifyOnCancelAppointment);

const DONOR_ID = "CancelAppointmentHandlerDonorId";
const APPOINTMENT_TO_CANCEL = "CancelAppointmentHandlerAppointment";

const reset = async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_TO_CANCEL]);
  mockedNotifier.mockClear();
};

beforeAll(async () => {
  await reset();
});

afterEach(async () => {
  await reset();
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
  await createDonor();
  mockedNotifier.mockReturnValue(Promise.resolve());
  await saveAppointment(DONOR_ID);

  await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_CANCEL]);
  expect(appointment[0].donorId).toEqual("");
  expect(appointment[0].creatorUserId).toEqual("creatorUserId");

  expect(mockedNotifier).toBeCalledWith(
    expect.objectContaining({
      id: APPOINTMENT_TO_CANCEL,
    }),
    expect.objectContaining({
      firstName: "firstName",
      email: "email@email.com",
    })
  );
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
  };

  await setAppointment(appointment);
}

function bookAppointmentRequest() {
  return { appointmentId: APPOINTMENT_TO_CANCEL };
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
