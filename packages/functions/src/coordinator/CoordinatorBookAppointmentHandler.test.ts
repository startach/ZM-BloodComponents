import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  BookingChange,
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
import {
  AppointmentStatus,
  MANUAL_DONOR_ID,
  MinimalDonorDetailsForAppointment,
} from "@zm-blood-components/common/src";
import { DbAppointment, DbDonor } from "../function-types";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.CoordinatorBookAppointmentFunctionName]
);

jest.mock("../notifications/BookAppointmentNotifier");
const mockedNotifier = mocked(notifyOnAppointmentBooked);

const DONOR_ID = "CoordinatorBookingAppointmentHandlerDonorId";
const COORDINATOR_ID = "CoordinatorBookingAppointmentHandlerCoordinatorId";
const MANUAL_DONOR_DETAILS: MinimalDonorDetailsForAppointment = {
  firstName: "donorname",
  phoneNumber: "0502222222",
};
const APPOINTMENT_TO_BOOK_1 =
  "CoordinatorBookingAppointmentHandlerAppointment1";
const APPOINTMENT_TO_BOOK_2 =
  "CoordinatorBookingAppointmentHandlerAppointment2";
const OTHER_DONATION_OF_USER =
  "CoordinatorBookingAppointmentHandlerAppointment3";

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
  const action = () => wrapped(bookAppointmentRequest(false));
  await expectAsyncThrows(action, "Unauthorized");
});

test("Donor not found throws exception", async () => {
  await saveAppointment(APPOINTMENT_TO_BOOK_2, false, 3);
  const action = () =>
    wrapped(bookAppointmentRequest(false), {
      auth: {
        uid: COORDINATOR_ID,
      },
    });

  await expectAsyncThrows(action, "Donor not found");
});

test("No such appointments", async () => {
  await createDonor();
  const response = await wrapped(bookAppointmentRequest(false), {
    auth: {
      uid: COORDINATOR_ID,
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

  const response = await wrapped(bookAppointmentRequest(false), {
    auth: {
      uid: COORDINATOR_ID,
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

  const response = await wrapped(bookAppointmentRequest(false), {
    auth: {
      uid: COORDINATOR_ID,
    },
  });

  const data = response as FunctionsApi.BookAppointmentResponse;
  expect(data.status).toEqual(
    BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER
  );
  expect(data.bookedAppointment).toBeUndefined();
});

test("Valid request books appointment with registered donor", async () => {
  mockedNotifier.mockReturnValue(Promise.resolve());
  await createDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, -10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, false, 3);

  const response = await wrapped(bookAppointmentRequest(false), {
    auth: {
      uid: COORDINATOR_ID,
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

test("Valid manual donor request books appointment with manual donor", async () => {
  mockedNotifier.mockReturnValue(Promise.resolve());
  await createDonor();
  await saveAppointment(APPOINTMENT_TO_BOOK_1, true, -10);
  await saveAppointment(APPOINTMENT_TO_BOOK_2, false, 3);

  const response = await wrapped(
    bookAppointmentRequest(true, MANUAL_DONOR_DETAILS),
    {
      auth: {
        uid: COORDINATOR_ID,
      },
    }
  );

  const appointment = await getAppointmentsByIds([APPOINTMENT_TO_BOOK_2]);
  expect(appointment[0].donorId).toEqual(MANUAL_DONOR_ID);
  expect(appointment[0].assigningCoordinatorId).toEqual(COORDINATOR_ID);
  expect(appointment[0].status).toEqual(AppointmentStatus.BOOKED);

  const data = response as FunctionsApi.BookAppointmentResponse;
  expect(data.status).toEqual(BookAppointmentStatus.SUCCESS);

  const bookedAppointment = data.bookedAppointment!;
  expect(bookedAppointment.id).toEqual(APPOINTMENT_TO_BOOK_2);
  expect(bookedAppointment.donorId).toEqual(MANUAL_DONOR_ID);
  expect(bookedAppointment.donorDetails).toEqual(MANUAL_DONOR_DETAILS);

  expect(appointment[0].lastChangeType).toEqual(BookingChange.BOOKED);
  expect(Date.now() - appointment[0]?.lastChangeTime?.toMillis()!).toBeLessThan(
    3_000
  );

  expect(bookedAppointment.recentChangeType).toEqual(BookingChange.BOOKED);
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
  donationWeeksFromNow: number,
  isManual?: boolean
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

  if (isManual) {
    appointment.donorId = MANUAL_DONOR_ID;
    appointment.assigningCoordinatorId = COORDINATOR_ID;
    appointment.donorDetails = MANUAL_DONOR_DETAILS;
  }

  await setAppointment(appointment);
}

function bookAppointmentRequest(
  isManual: boolean,
  donorDetails?: MinimalDonorDetailsForAppointment
) {
  return {
    appointmentIds: [APPOINTMENT_TO_BOOK_1, APPOINTMENT_TO_BOOK_2],
    donorDetails: isManual ? donorDetails : undefined,
    donorId: isManual ? MANUAL_DONOR_ID : DONOR_ID,
  };
}
