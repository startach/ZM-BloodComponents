import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AppointmentStatus,
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
import { DbAppointment, DbDonor } from "../function-types";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.DonorSwapAppointmentFunctionName]
);

const SWAP_TEST_HOSPITAL = Hospital.RAMBAM;
const CREATOR_USER_ID = "SwapAppointmentHandlerCreatorUserId";
const DONOR_ID = "SwapAppointmentHandlerDonorId1";
const OTHER_DONOR_ID = "SwapAppointmentHandlerDonorId2";
const APPOINTMENT_TO_BOOK_1 = "SwapAppointmentHandlerAppointment1";
const APPOINTMENT_TO_BOOK_2 = "SwapAppointmentHandlerAppointment2";
const OTHER_DONATION_OF_USER = "SwapAppointmentHandlerAppointment3";
const APPOINTMENT_TO_CANCEL = "SwapAppointmentHandlerAppointment4";

beforeAll(async () => {
  await reset();
});

afterEach(async () => {
  await reset();
});

const defaultInitialization = async (
  createBookableAppointment: boolean,
  createCancellableAppointment: boolean
) => {
  const functionsToInitialize = [createDonor()];

  if (createBookableAppointment) {
    functionsToInitialize.push(saveAppointment(APPOINTMENT_TO_BOOK_2, 10));
  }

  if (createCancellableAppointment) {
    functionsToInitialize.push(
      saveAppointment(APPOINTMENT_TO_CANCEL, 1, DONOR_ID)
    );
  }

  await Promise.all(functionsToInitialize);
};
describe("Donor Swap Appointment Handler", () => {
  // Test Booking

  test("Unauthenticated user throws exception", async () => {
    const action = () => wrapped(swapAppointmentRequest());
    await expectAsyncThrows(action, "Unauthorized");
  });

  test("Donor not found throws exception", async () => {
    await saveAppointment(APPOINTMENT_TO_BOOK_1, 3);
    await saveAppointment(APPOINTMENT_TO_CANCEL, 1, DONOR_ID);
    const action = () => swapAppointmentAuthenticatedRequest();

    await expectAsyncThrows(action, "Donor not found");
  });

  test("No such appointments", async () => {
    await defaultInitialization(false, true);

    const action = () => swapAppointmentAuthenticatedRequest();
    await expectAsyncThrows(action, "No such appointments");
  });

  test("No free appointments ", async () => {
    await defaultInitialization(false, true);
    await saveAppointment(APPOINTMENT_TO_BOOK_1, 10, OTHER_DONOR_ID);
    await saveAppointment(APPOINTMENT_TO_BOOK_2, 8, OTHER_DONOR_ID);

    const response = await swapAppointmentAuthenticatedRequest([
      APPOINTMENT_TO_BOOK_1,
      APPOINTMENT_TO_BOOK_2,
    ]);

    const data = response as FunctionsApi.SwapAppointmentResponse;
    expect(data.status).toEqual(
      FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS
    );
    expect(data.bookedAppointment).toBeUndefined();
  });

  test.skip("Donor has recent donation throws exception", async () => {
    await defaultInitialization(true, true);
    await saveAppointment(OTHER_DONATION_OF_USER, 3, DONOR_ID);

    const response = await swapAppointmentAuthenticatedRequest([
      APPOINTMENT_TO_BOOK_1,
      OTHER_DONATION_OF_USER,
    ]);

    const data = response as FunctionsApi.SwapAppointmentResponse;
    expect(data.status).toEqual(
      FunctionsApi.BookAppointmentStatus.HAS_OTHER_DONATION_IN_BUFFER
    );
    expect(data.bookedAppointment).toBeUndefined();
  });

  // Test Cancellation

  test("No such appointments throws exception", async () => {
    await defaultInitialization(true, false);

    const action = () => swapAppointmentAuthenticatedRequest();

    await expectAsyncThrows(action, "Appointment Undefined");
  });

  test("Donor is not booked on this appointment throws exception", async () => {
    await defaultInitialization(true, false);
    await saveAppointment(APPOINTMENT_TO_CANCEL, 1, OTHER_DONOR_ID);

    const action = () => swapAppointmentAuthenticatedRequest();

    await expectAsyncThrows(
      action,
      "Appointment to be deleted is not booked by donor"
    );
  });

  // Test Swap

  test("Valid request swaps appointment", async () => {
    await defaultInitialization(true, true);

    const response = await swapAppointmentAuthenticatedRequest();

    const [appointments, updatedDonor] = await Promise.all([
      getAppointmentsByIds([APPOINTMENT_TO_CANCEL, APPOINTMENT_TO_BOOK_2]),
      DonorDataAccessLayer.getDonor(DONOR_ID),
    ]);

    expect(appointments).toHaveLength(2);

    const appointmentToCancel = appointments.find(
      (app) => app.id === APPOINTMENT_TO_CANCEL
    );

    expect(appointmentToCancel?.donorId).toEqual("");
    expect(appointmentToCancel?.status).toEqual(AppointmentStatus.AVAILABLE);
    expect(appointmentToCancel?.creatorUserId).toEqual(CREATOR_USER_ID);

    const bookedAppointment = appointments.find(
      (app) => app.id === APPOINTMENT_TO_BOOK_2
    );

    expect(bookedAppointment?.donorId).toEqual(DONOR_ID);
    expect(bookedAppointment?.status).toEqual(AppointmentStatus.BOOKED);
    expect(bookedAppointment?.lastChangeType).toEqual(BookingChange.BOOKED);
    expect(
      Date.now() - bookedAppointment?.lastChangeTime?.toMillis()!
    ).toBeLessThan(10_000);

    const data = response as FunctionsApi.SwapAppointmentResponse;
    expect(data.status).toEqual(FunctionsApi.BookAppointmentStatus.SUCCESS);

    const returnedBookedAppointment = data.bookedAppointment!;
    expect(returnedBookedAppointment.id).toEqual(APPOINTMENT_TO_BOOK_2);
    expect(returnedBookedAppointment.donorId).toEqual(DONOR_ID);
    expect(returnedBookedAppointment.recentChangeType).toEqual(
      BookingChange.BOOKED
    );

    expect(updatedDonor?.lastBookedHospital).toEqual(SWAP_TEST_HOSPITAL);
  });
});

async function reset() {
  await DonorDataAccessLayer.deleteDonor(DONOR_ID);
  await DonorDataAccessLayer.deleteDonor(OTHER_DONOR_ID);
  await deleteAppointmentsByIds([
    APPOINTMENT_TO_BOOK_1,
    APPOINTMENT_TO_BOOK_2,
    OTHER_DONATION_OF_USER,
    APPOINTMENT_TO_CANCEL,
  ]);
}

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
  donationWeeksFromNow: number,
  donorId?: string
) {
  const startTime = new Date();
  startTime.setDate(startTime.getDate() + donationWeeksFromNow * 7);
  const time = admin.firestore.Timestamp.fromDate(startTime);
  const appointment: DbAppointment = {
    id: id,
    creationTime: time,
    creatorUserId: CREATOR_USER_ID,
    donationStartTime: time,
    hospital: SWAP_TEST_HOSPITAL,
    donorId: donorId ?? "",
    status: donorId ? AppointmentStatus.BOOKED : AppointmentStatus.AVAILABLE,
    bookingTime: time,
  };

  await setAppointment(appointment);
}

function swapAppointmentRequest(
  bookAppointmentIds?: string[],
  cancelAppointmentId?: string
): FunctionsApi.SwapAppointmentRequest {
  return {
    bookAppointmentIds: bookAppointmentIds ?? [
      APPOINTMENT_TO_BOOK_1,
      APPOINTMENT_TO_BOOK_2,
    ],
    cancelAppointmentId: cancelAppointmentId ?? APPOINTMENT_TO_CANCEL,
  };
}

function swapAppointmentAuthenticatedRequest(
  bookAppointmentIds?: string[],
  cancelAppointmentId?: string
) {
  return wrapped(
    swapAppointmentRequest(bookAppointmentIds, cancelAppointmentId),
    {
      auth: {
        uid: DONOR_ID,
      },
    }
  );
}
