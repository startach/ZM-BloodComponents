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
  Functions[FunctionsApi.GetBookedDonationsInHospitalFunctionName]
);

const COORDINATOR_ID = "BookedDonationsReportTestUser";
const DONOR_ID_1 = "BookedDonationsReportTestDonorUser1";

const FUTURE_BOOKED = "BookedDonationsReport_FutureBooked";
const FUTURE_OTHER_HOSPITAL = "BookedDonationsReport_FutureOtherHospital";
const FUTURE_NOT_BOOKED = "BookedDonationsReport_FutureNotBooked";
const FUTURE_DONATION_TOO_FAR = "BookedDonationsReport_FutureTooFar";

const ALL_APPOINTMENT_IDS = [
  FUTURE_BOOKED,
  FUTURE_OTHER_HOSPITAL,
  FUTURE_NOT_BOOKED,
  FUTURE_DONATION_TOO_FAR,
];

const FOURTEEN_DAYS_IN_MILLIS = 1000 * 60 * 60 * 24 * 14;

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

test("Valid request returns booked appointment of the right hospital", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [Hospital.TEL_HASHOMER]);

  await createDonor(DONOR_ID_1);

  const IN_TWO_DAYS = getDate(2);
  const IN_SIXTEEN_DAYS = getDate(16);

  await saveAppointment(
    FUTURE_BOOKED,
    IN_TWO_DAYS,
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );
  await saveAppointment(
    FUTURE_NOT_BOOKED,
    IN_TWO_DAYS,
    Hospital.TEL_HASHOMER,
    ""
  );
  await saveAppointment(
    FUTURE_OTHER_HOSPITAL,
    IN_TWO_DAYS,
    Hospital.ASAF_HAROFE,
    DONOR_ID_1
  );
  await saveAppointment(
    FUTURE_DONATION_TOO_FAR,
    IN_SIXTEEN_DAYS,
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );

  const res = await callFunction(COORDINATOR_ID);

  const appointments = res.donationsWithDonorDetails;
  expect(appointments).toHaveLength(1);
  const bookedAppointment = appointments[0];
  expect(bookedAppointment.appointmentId).toEqual(FUTURE_BOOKED);
  expect(bookedAppointment.bloodType).toEqual(sampleUser.bloodType);
  expect(bookedAppointment.donationStartTimeMillis).toEqual(
    IN_TWO_DAYS.getTime()
  );
  expect(bookedAppointment.firstName).toEqual(sampleUser.firstName);
  expect(bookedAppointment.lastName).toEqual(sampleUser.lastName);
  expect(bookedAppointment.hospital).toEqual(Hospital.TEL_HASHOMER);
  expect(bookedAppointment.phone).toEqual(sampleUser.phone);
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
    toDateMillis: FOURTEEN_DAYS_IN_MILLIS + Date.now(),
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
