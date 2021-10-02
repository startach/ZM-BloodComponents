import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AppointmentStatus,
  BookingChange,
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
import { sampleUser } from "../testUtils/TestSamples";
import { DbAppointment, DbDonor } from "../function-types";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.CompleteAppointmentFunctionName]
);

const DONOR_ID = "CompleteAppointmentHandlerDonorId";
const APPOINTMENT_TO_COMPLETE = "CompleteAppointmentHandlerAppointment";

const reset = async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_TO_COMPLETE]);
};

beforeAll(async () => {
  await reset();
});

afterEach(async () => {
  await reset();
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped({ appointmentId: APPOINTMENT_TO_COMPLETE });
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

  await expectAsyncThrows(action, "No appointment to complete");
});

test("No such appointments throws exception", async () => {
  const action = () =>
    wrapped(
      { appointmentId: APPOINTMENT_TO_COMPLETE },
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
    wrapped(completeAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "Appointment to be completed is not booked by donor"
  );
});

test("Valid request complete appointment", async () => {
  await createDonor();
  await saveAppointment(DONOR_ID);

  await wrapped(completeAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_COMPLETE]);
  expect(appointment[0].donationDoneTimeMillis).toBeTruthy();
  expect(appointment[0].status).toEqual(AppointmentStatus.COMPLETED);
  expect(appointment[0].lastChangeType).toEqual(BookingChange.COMPLETED);
  expect(appointment[0].creatorUserId).toEqual("creatorUserId");
});

async function saveAppointment(donorId: string) {
  const time = admin.firestore.Timestamp.now();
  const appointment: DbAppointment = {
    id: APPOINTMENT_TO_COMPLETE,
    creationTime: time,
    creatorUserId: "creatorUserId",
    donationStartTime: time,
    hospital: Hospital.ASAF_HAROFE,
    donorId: donorId,
    bookingTime: time,
    status: AppointmentStatus.BOOKED,
    lastChangeType: BookingChange.BOOKED,
  };

  await setAppointment(appointment);
}

function completeAppointmentRequest() {
  return { appointmentId: APPOINTMENT_TO_COMPLETE };
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
