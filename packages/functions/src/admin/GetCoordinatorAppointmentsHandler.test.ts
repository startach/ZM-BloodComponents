import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AdminRole,
  DbAdmin,
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
import { setDonor } from "../dal/DonorDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetCoordinatorAppointmentsFunctionName]
);

const COORDINATOR_ID = "GetCoordinatorAppointmentsTestUser";
const DONOR_ID_1 = "GetCoordinatorAppointmentsTestDonorUser1";
const DONOR_ID_2 = "GetCoordinatorAppointmentsTestDonorUser2";

const PAST_BOOKED = "GetCoordinatorAppointments_PastBooked";
const PAST_OTHER_HOSPITAL = "GetCoordinatorAppointments_PastOtherHospital";
const PAST_NOT_BOOKED = "GetCoordinatorAppointments_PastNotBooked";
const FUTURE_BOOKED = "GetCoordinatorAppointments_FutureBooked";
const FUTURE_OTHER_HOSPITAL = "GetCoordinatorAppointments_FutureOtherHospital";
const FUTURE_NOT_BOOKED = "GetCoordinatorAppointments_FutureNotBooked";

const ALL_APPOINTMENT_IDS = [
  PAST_BOOKED,
  PAST_OTHER_HOSPITAL,
  PAST_NOT_BOOKED,
  FUTURE_BOOKED,
  FUTURE_OTHER_HOSPITAL,
  FUTURE_NOT_BOOKED,
];

const reset = async () => {
  await deleteAppointmentsByIds(ALL_APPOINTMENT_IDS);
  await deleteAdmin(COORDINATOR_ID);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not admin throws exception", async () => {
  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    "User is not an admin and can't edit appointments"
  );
});

test("User that has wrong role throws exception", async () => {
  await createUser([AdminRole.ZM_COORDINATOR]);

  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(action, "User not authorized to preform action");
});

test("User that does not have the right hospital throws exception", async () => {
  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.ASAF_HAROFE]
  );

  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(action, "User not authorized to preform action");
});

test("Valid request returns appointments of the right hospital", async () => {
  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.ASAF_HAROFE, Hospital.TEL_HASHOMER]
  );

  await createDonor(DONOR_ID_1);
  await createDonor(DONOR_ID_2);

  await saveAppointment(
    PAST_BOOKED,
    getDate(-3),
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );
  await saveAppointment(
    PAST_OTHER_HOSPITAL,
    getDate(-2),
    Hospital.ASAF_HAROFE,
    DONOR_ID_1
  );
  await saveAppointment(PAST_NOT_BOOKED, getDate(-1), Hospital.TEL_HASHOMER);
  await saveAppointment(
    FUTURE_BOOKED,
    getDate(3),
    Hospital.TEL_HASHOMER,
    DONOR_ID_2
  );
  await saveAppointment(
    FUTURE_OTHER_HOSPITAL,
    getDate(4),
    Hospital.ASAF_HAROFE,
    DONOR_ID_2
  );
  await saveAppointment(FUTURE_NOT_BOOKED, getDate(5), Hospital.TEL_HASHOMER);

  const res = await callFunction(COORDINATOR_ID);

  let appointments = res.appointments.filter((a) =>
    ALL_APPOINTMENT_IDS.includes(a.id)
  );
  expect(appointments).toHaveLength(4);
  expect(appointments[0].id).toEqual(PAST_BOOKED);
  expect(appointments[1].id).toEqual(PAST_NOT_BOOKED);
  expect(appointments[2].id).toEqual(FUTURE_BOOKED);
  expect(appointments[3].id).toEqual(FUTURE_NOT_BOOKED);

  // May contain other donor ids of other appointments that are not part of this test
  expect(res.donorsInAppointments.map((donor) => donor.id)).toContain(
    DONOR_ID_1
  );
  expect(res.donorsInAppointments.map((donor) => donor.id)).toContain(
    DONOR_ID_2
  );
});

async function createUser(roles: AdminRole[], hospitals?: Hospital[]) {
  const newAdmin: DbAdmin = {
    id: COORDINATOR_ID,
    phone: "test_phone",
    email: "test_email",
    roles,
  };

  if (hospitals) {
    newAdmin.hospitals = hospitals;
  }

  await setAdmin(newAdmin);
}

function callFunction(
  userId?: string
): Promise<FunctionsApi.GetCoordinatorAppointmentsResponse> {
  const request: FunctionsApi.GetCoordinatorAppointmentsRequest = {
    hospital: Hospital.TEL_HASHOMER,
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
