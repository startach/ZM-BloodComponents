import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  DbCoordinator,
  DbAppointment,
  DbDonor,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows, getDate } from "../testUtils/TestUtils";
import { sampleUser } from "../testUtils/TestSamples";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetCoordinatorAppointmentsFunctionName]
);

const COORDINATOR_ID = "GetCoordinatorAppointmentsTestUser";
const DONOR_ID_1 = "GetCoordinatorAppointmentsTestDonorUser1";

const FUTURE_BOOKED = "GetCoordinatorAppointments_FutureBooked";
const FUTURE_OTHER_HOSPITAL = "GetCoordinatorAppointments_FutureOtherHospital";
const FUTURE_NOT_BOOKED = "GetCoordinatorAppointments_FutureNotBooked";
const FUTURE_DONATION_TOO_FAR = "GetCoordinatorAppointments_FutureTooFar";

const ALL_APPOINTMENT_IDS = [
  FUTURE_BOOKED,
  FUTURE_OTHER_HOSPITAL,
  FUTURE_NOT_BOOKED,
  FUTURE_DONATION_TOO_FAR,
];

const ONE_MONTH_IN_MILLIS = 60 * 60 * 24 * 30;

const reset = async () => {
  await deleteAppointmentsByIds(ALL_APPOINTMENT_IDS);
  await deleteAdmin(COORDINATOR_ID);
  await deleteDonor(DONOR_ID_1);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that does not have the right hospital throws exception", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [Hospital.ASAF_HAROFE]);

  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(action, "User not authorized to preform action");
});

test("Valid request returns booked appointment of the right hospital", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [Hospital.TEL_HASHOMER]);

  await createDonor(DONOR_ID_1);

  await saveAppointment(
    FUTURE_BOOKED,
    getDate(2),
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );
  await saveAppointment(
    FUTURE_NOT_BOOKED,
    getDate(2),
    Hospital.TEL_HASHOMER,
    ""
  );
  await saveAppointment(
    FUTURE_OTHER_HOSPITAL,
    getDate(2),
    Hospital.ASAF_HAROFE
  );
  await saveAppointment(
    FUTURE_DONATION_TOO_FAR,
    getDate(16),
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );

  const res = await callFunction(COORDINATOR_ID);

  let appointments = res.donations;
  expect(appointments).toHaveLength(1);
  expect(appointments[1].donationId).toEqual(FUTURE_NOT_BOOKED);
});

async function createUser(role: CoordinatorRole, hospitals?: Hospital[]) {
  const newAdmin: DbCoordinator = {
    id: COORDINATOR_ID,
    role,
  };

  if (hospitals) {
    newAdmin.hospitals = hospitals;
  }

  await setAdmin(newAdmin);
}

function callFunction(
  userId?: string
): Promise<FunctionsApi.GetBookedDonationsInHospitalResponse> {
  const request: FunctionsApi.GetBookedDonationsInHospitalRequest = {
    hospital: Hospital.TEL_HASHOMER,
    fromDateMillis: Date.now(),
    toDateMillis: Date.now() + ONE_MONTH_IN_MILLIS,
  };

  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}

async function saveAppointment(
  id: string,
  donationStartTime: Date,
  hospital: Hospital,
  donorId?: string
) {
  const appointment: DbAppointment = {
    id: id,
    creationTime: admin.firestore.Timestamp.fromDate(donationStartTime),
    creatorUserId: COORDINATOR_ID,
    donationStartTime: admin.firestore.Timestamp.fromDate(donationStartTime),
    hospital: hospital,
    donorId: "",
  };

  if (donorId) {
    appointment.donorId = donorId;
    appointment.bookingTime = admin.firestore.Timestamp.now();
  }

  await setAppointment(appointment);
  return appointment;
}

async function createDonor(donorId: string) {
  const donor: DbDonor = {
    id: donorId,
    ...sampleUser,
  };

  await setDonor(donor);
}
