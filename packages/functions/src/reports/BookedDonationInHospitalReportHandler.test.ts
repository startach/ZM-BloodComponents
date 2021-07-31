import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  DbCoordinator,
  DbAppointment,
  DbDonor,
  FunctionsApi,
  Hospital,
  BloodType,
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

const VALID_TEST_HOSPITAL = Hospital.BEILINSON;

const HADASA_COORDINATOR_ID = "BookedDonationsReportTestHadasaCoordinator";
const BEILINSON_COORDINATOR_ID =
  "BookedDonationsReportTestBeilinsonCoordinator";
const REGULAR_USER_ID = "BookedDonationsReportTestUser";
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
  await deleteAdmin(HADASA_COORDINATOR_ID);
  await deleteAdmin(BEILINSON_COORDINATOR_ID);
  await deleteDonor(DONOR_ID_1);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction(VALID_TEST_HOSPITAL);
  await expectAsyncThrows(action, "Unauthorized");
});

test("Non Coordinator role throws exception", async () => {
  await createDonorUser();

  const action = () => callFunction(VALID_TEST_HOSPITAL, REGULAR_USER_ID);
  await expectAsyncThrows(action, `User ${REGULAR_USER_ID} is not an admin`);
});

test("Coordinator does not have permissions for hospital throws exception", async () => {
  await createCoordinator(
    HADASA_COORDINATOR_ID,
    CoordinatorRole.HOSPITAL_COORDINATOR,
    [Hospital.HADASA]
  );

  const action = () => callFunction(VALID_TEST_HOSPITAL, HADASA_COORDINATOR_ID);
  await expectAsyncThrows(
    action,
    `Coordinator ${HADASA_COORDINATOR_ID} is not allowed to view hospital ${VALID_TEST_HOSPITAL}`
  );
});

test("Valid request returns booked appointment of the right hospital", async () => {
  await createCoordinator(
    BEILINSON_COORDINATOR_ID,
    CoordinatorRole.HOSPITAL_COORDINATOR,
    [VALID_TEST_HOSPITAL]
  );

  await createDonor(DONOR_ID_1);

  const IN_TWO_DAYS = getDate(2);
  const IN_SIXTEEN_DAYS = getDate(16);

  await saveAppointment(
    FUTURE_BOOKED,
    IN_TWO_DAYS,
    VALID_TEST_HOSPITAL,
    DONOR_ID_1
  );
  await saveAppointment(
    FUTURE_NOT_BOOKED,
    IN_TWO_DAYS,
    VALID_TEST_HOSPITAL,
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
    VALID_TEST_HOSPITAL,
    DONOR_ID_1
  );

  const res = await callFunction(VALID_TEST_HOSPITAL, BEILINSON_COORDINATOR_ID);

  const appointments = res.donationsWithDonorDetails.filter(
    (a) => a.donorId === DONOR_ID_1
  );
  expect(appointments).toHaveLength(1);
  const bookedAppointment = appointments[0];
  expect(bookedAppointment.appointmentId).toEqual(FUTURE_BOOKED);
  expect(bookedAppointment.bloodType).toEqual(sampleUser.bloodType);
  expect(bookedAppointment.donationStartTimeMillis).toEqual(
    IN_TWO_DAYS.getTime()
  );
  expect(bookedAppointment.firstName).toEqual(sampleUser.firstName);
  expect(bookedAppointment.lastName).toEqual(sampleUser.lastName);
  expect(bookedAppointment.hospital).toEqual(VALID_TEST_HOSPITAL);
  expect(bookedAppointment.phone).toEqual(sampleUser.phone);
});

async function createCoordinator(
  id: string,
  role: CoordinatorRole,
  hospitals?: Hospital[]
) {
  const newAdmin: DbCoordinator = {
    id,
    role,
  };

  if (hospitals) {
    newAdmin.hospitals = hospitals;
  }

  await setAdmin(newAdmin);
}

async function createDonorUser() {
  const newDonorUser: DbDonor = {
    id: REGULAR_USER_ID,
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    bloodType: BloodType.AB_MINUS,
    groupId: "",
    testUser: true,
  };

  await setDonor(newDonorUser);
}

function callFunction(
  hospital: Hospital,
  userId?: string
): Promise<FunctionsApi.GetBookedDonationsInHospitalResponse> {
  const request: FunctionsApi.GetBookedDonationsInHospitalRequest = {
    hospital,
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
    creatorUserId: BEILINSON_COORDINATOR_ID,
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
