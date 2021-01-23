import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { Appointment, BloodType, Donor, Hospital } from "../Types";
import * as Functions from "../index";
import { deleteDonor, updateDonor } from "../dal/DonorDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  updateAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";

const wrapped = firebaseFunctionsTest.wrap(Functions.bookAppointment);

const DONOR_ID = "BookingAppointmentHandlerDonorId";
const APPOINTMENT_TO_BOOK_1 = "BookingAppointmentHandlerAppointment1";
const APPOINTMENT_TO_BOOK_2 = "BookingAppointmentHandlerAppointment2";
const OTHER_DONATION_OF_USER = "BookingAppointmentHandlerAppointment3";

beforeAll(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([
    APPOINTMENT_TO_BOOK_1,
    APPOINTMENT_TO_BOOK_2,
    OTHER_DONATION_OF_USER,
  ]);
});

afterEach(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([
    APPOINTMENT_TO_BOOK_1,
    APPOINTMENT_TO_BOOK_2,
    OTHER_DONATION_OF_USER,
  ]);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(bookAppointmentRequest());
  await expectAsyncThrows(
    action,
    "User must be authenticated to book donation"
  );
});

test("Donor not found throws exception", async () => {
  const action = () =>
    wrapped(bookAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "Donor not found");
});

test("No such appointments throws exception", async () => {
  await setDonor();

  const action = () =>
    wrapped(bookAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "No appointments to book");
});

test("No free appointments throws exception", async () => {
  await setDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, 10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, true, 8);

  const action = () =>
    wrapped(bookAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "No appointments to book");
});

test("No free appointments throws exception", async () => {
  await setDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, 10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, true, 8);

  const action = () =>
    wrapped(bookAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "No appointments to book");
});

test("Donor has recent donation throws exception", async () => {
  await setDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, false, 1);
  await saveAppointment(OTHER_DONATION_OF_USER, true, 3);

  const action = () =>
    wrapped(bookAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "Donor has other donations in buffer");
});

test("Valid request books appointment", async () => {
  await setDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, -10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, false, 3);

  await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_BOOK_2]);
  expect(appointment[0].donorId).toEqual(DONOR_ID);
});

async function setDonor() {
  const donor: Donor = {
    id: DONOR_ID,
    phone: "test_phone",
    email: "test_email",
    bloodType: BloodType.A_MINUS,
  };

  await updateDonor(donor);
}

async function saveAppointment(
  id: string,
  booked: boolean,
  donationWeeksFromNow: number
) {
  const startTime = new Date();
  startTime.setDate(startTime.getDate() + donationWeeksFromNow * 7);
  const appointment: Appointment = {
    id: id,
    creationTime: admin.firestore.Timestamp.fromDate(startTime),
    creatorUserId: "CreatingUserId",
    donationStartTime: admin.firestore.Timestamp.fromDate(startTime),
    hospital: Hospital.ASAF_HAROFE,
  };

  if (booked) {
    appointment.donorId = DONOR_ID;
    appointment.bookingTime = startTime;
  }

  await updateAppointment(appointment);
}

function bookAppointmentRequest() {
  return { appointmentIds: [APPOINTMENT_TO_BOOK_1, APPOINTMENT_TO_BOOK_2] };
}
