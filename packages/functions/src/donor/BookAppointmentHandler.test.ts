import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  BookingChange,
  DbAppointment,
  DbDonor,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import * as DonorDataAccessLayer from "../dal/DonorDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";
import { sampleUser } from "../testUtils/TestSamples";
import { notifyOnAppointmentBooked } from "../notifications/BookAppointmentNotifier";
import { mocked } from "ts-jest/utils";
import { BookAppointmentStatus } from "../../../common/src/functions-api";
import { AppointmentStatus } from "@zm-blood-components/common/src";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.BookAppointmentFunctionName]
);

jest.mock("../notifications/BookAppointmentNotifier");
const mockedNotifier = mocked(notifyOnAppointmentBooked);

const DONOR_ID = "BookingAppointmentHandlerDonorId";
const APPOINTMENT_TO_BOOK_1 = "BookingAppointmentHandlerAppointment1";
const APPOINTMENT_TO_BOOK_2 = "BookingAppointmentHandlerAppointment2";
const OTHER_DONATION_OF_USER = "BookingAppointmentHandlerAppointment3";

beforeAll(async () => {
  await DonorDataAccessLayer.deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([
    APPOINTMENT_TO_BOOK_1,
    APPOINTMENT_TO_BOOK_2,
    OTHER_DONATION_OF_USER,
  ]);
  mockedNotifier.mockClear();
});

afterEach(async () => {
  await DonorDataAccessLayer.deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([
    APPOINTMENT_TO_BOOK_1,
    APPOINTMENT_TO_BOOK_2,
    OTHER_DONATION_OF_USER,
  ]);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(bookAppointmentRequest());
  await expectAsyncThrows(action, "Unauthorized");
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

test("No such appointments", async () => {
  await createDonor();

  const response = await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });
  const data = response as FunctionsApi.BookAppointmentResponse;
  expect(data.status).toEqual(BookAppointmentStatus.NO_SUCH_APPOINTMENTS);
  expect(data.bookedAppointment).toBeUndefined();
});

test("No free appointments ", async () => {
  await createDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, 10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, true, 8);

  const response = await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });
  const data = response as FunctionsApi.BookAppointmentResponse;
  expect(data.status).toEqual(BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS);
  expect(data.bookedAppointment).toBeUndefined();
});

test.skip("Donor has recent donation throws exception", async () => {
  await createDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, false, 1);
  await saveAppointment(OTHER_DONATION_OF_USER, true, 3);

  const response = await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const data = response as FunctionsApi.BookAppointmentResponse;
  expect(data.status).toEqual(
    BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER
  );
  expect(data.bookedAppointment).toBeUndefined();
});

test("Valid request books appointment", async () => {
  mockedNotifier.mockReturnValue(Promise.resolve());
  await createDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, -10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, false, 3);

  const response = await wrapped(bookAppointmentRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_BOOK_2]);
  expect(appointment[0].donorId).toEqual(DONOR_ID);
  expect(appointment[0].status).toEqual(AppointmentStatus.BOOKED);

  const data = response as FunctionsApi.BookAppointmentResponse;
  expect(data.status).toEqual(BookAppointmentStatus.SUCCESS);

  const bookedAppointment = data.bookedAppointment!;
  expect(bookedAppointment.id).toEqual(APPOINTMENT_TO_BOOK_2);
  expect(bookedAppointment.donorId).toEqual(DONOR_ID);

  expect(appointment[0].lastChangeType).toEqual(BookingChange.BOOKED);
  expect(Date.now() - appointment[0]?.lastChangeTime?.toMillis()!).toBeLessThan(
    3_000
  );

  expect(bookedAppointment.recentChangeType).toEqual(BookingChange.BOOKED);

  expect(mockedNotifier).toBeCalledWith(
    appointment[0],
    expect.objectContaining({
      firstName: "firstName",
      email: "email@email.com",
    })
  );

  const updatedDonor = await DonorDataAccessLayer.getDonor(DONOR_ID);
  expect(updatedDonor?.lastBookedHospital).toEqual(Hospital.ASAF_HAROFE);
});

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    ...sampleUser,
    firstName: "firstName",
    email: "email@email.com",
  };

  await DonorDataAccessLayer.setDonor(donor);
}

async function saveAppointment(
  id: string,
  booked: boolean,
  donationWeeksFromNow: number
) {
  const startTime = new Date();
  startTime.setDate(startTime.getDate() + donationWeeksFromNow * 7);
  const time = admin.firestore.Timestamp.fromDate(startTime);
  const appointment: DbAppointment = {
    id: id,
    creationTime: time,
    creatorUserId: "CreatingUserId",
    donationStartTime: time,
    hospital: Hospital.ASAF_HAROFE,
    donorId: "",
    status: booked ? AppointmentStatus.BOOKED : AppointmentStatus.AVAILABLE,
  };

  if (booked) {
    appointment.donorId = DONOR_ID;
    appointment.bookingTime = time;
  }

  await setAppointment(appointment);
}

function bookAppointmentRequest() {
  return { appointmentIds: [APPOINTMENT_TO_BOOK_1, APPOINTMENT_TO_BOOK_2] };
}
