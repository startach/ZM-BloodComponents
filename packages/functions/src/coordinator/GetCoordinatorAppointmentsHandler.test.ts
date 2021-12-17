import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AppointmentStatus,
  CoordinatorRole,
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
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import * as GroupsDAL from "../dal/GroupsDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import { DbAppointment, DbCoordinator, DbDonor } from "../function-types";
import { MANUAL_DONOR_ID } from "@zm-blood-components/common/src";

jest.setTimeout(7000);

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetCoordinatorAppointmentsFunctionName]
);
const COORDINATOR_ID = "GetCoordinatorAppointmentsTestUser";
const OTHER_COORDINATOR_ID = "GetCoordinatorAppointmentsOtherUser";
const DONOR_ID_1 = "GetCoordinatorAppointmentsTestDonorUser1";
const DONOR_ID_2 = "GetCoordinatorAppointmentsTestDonorUser2";
const GROUP_NAME_1 = "GetCoordinatorAppointmentsTestgroup1";

const PAST_BOOKED = "GetCoordinatorAppointments_PastBooked";
const PAST_OTHER_HOSPITAL = "GetCoordinatorAppointments_PastOtherHospital";
const PAST_NOT_BOOKED = "GetCoordinatorAppointments_PastNotBooked";
const FUTURE_BOOKED = "GetCoordinatorAppointments_FutureBooked";
const FUTURE_OTHER_HOSPITAL = "GetCoordinatorAppointments_FutureOtherHospital";
const FUTURE_NOT_BOOKED = "GetCoordinatorAppointments_FutureNotBooked";
const IN_GROUP_1 = "GetCoordinatorAppointments_IN_GROUP_1";
const IN_GROUP_2 = "GetCoordinatorAppointments_IN_GROUP_2";
const MANUAL_OF_COORDINATOR =
  "GetCoordinatorAppointments_MANUAL_OF_COORDINATOR";
const MANUAL_NOT_OF_COORDINATOR =
  "GetCoordinatorAppointments_MANUAL_NOT_OF_COORDINATOR";

const ALL_APPOINTMENT_IDS = [
  PAST_BOOKED,
  PAST_OTHER_HOSPITAL,
  PAST_NOT_BOOKED,
  FUTURE_BOOKED,
  FUTURE_OTHER_HOSPITAL,
  FUTURE_NOT_BOOKED,
  IN_GROUP_1,
  IN_GROUP_2,
  MANUAL_OF_COORDINATOR,
  MANUAL_NOT_OF_COORDINATOR,
];

const reset = async () => {
  await deleteAppointmentsByIds(ALL_APPOINTMENT_IDS);
  await deleteAdmin(COORDINATOR_ID);
  await DonorDAL.deleteDonor(DONOR_ID_1);
  await DonorDAL.deleteDonor(DONOR_ID_2);
  const groups1 = await GroupDAL.getGroupIdsOfCoordinatorId(COORDINATOR_ID);
  groups1.forEach((groupId) => GroupDAL.deleteGroup(groupId));
};

beforeAll(reset);
afterEach(reset);
test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not coordinator throws exception", async () => {
  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    "User is not an coordinator and can't edit appointments"
  );
});

test("User that does not have the right hospital throws exception", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [Hospital.ASAF_HAROFE]);

  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    "Coordinator has no permissions for hospital"
  );
});

test("Valid request returns appointments of the right hospital", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [
    Hospital.ASAF_HAROFE,
    Hospital.TEL_HASHOMER,
  ]);

  await createDonor(DONOR_ID_1, "group1");
  await createDonor(DONOR_ID_2, "group1");

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

test("Valid request all returns appointments of the right hospital", async () => {
  await createUser(CoordinatorRole.HOSPITAL_COORDINATOR, [
    Hospital.ASAF_HAROFE,
    Hospital.TEL_HASHOMER,
  ]);

  await createDonor(DONOR_ID_1, "group1");
  await createDonor(DONOR_ID_2, "group1");

  await saveAppointment(
    PAST_BOOKED,
    getDate(-3),
    Hospital.ASAF_HAROFE,
    DONOR_ID_1
  );
  await saveAppointment(
    PAST_OTHER_HOSPITAL,
    getDate(-2),
    Hospital.ICHILOV,
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
    Hospital.BEILINSON,
    DONOR_ID_2
  );
  await saveAppointment(FUTURE_NOT_BOOKED, getDate(5), Hospital.TEL_HASHOMER);
  const res = await callFunction(COORDINATOR_ID, undefined, true);
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

test("Valid request returns appointments with right time filtering", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [Hospital.TEL_HASHOMER]);

  await createDonor(DONOR_ID_1, "group1");
  await createDonor(DONOR_ID_2, "group1");

  await saveAppointment(
    PAST_BOOKED,
    getDate(-20),
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );
  await saveAppointment(
    PAST_OTHER_HOSPITAL,
    getDate(-15),
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );
  await saveAppointment(PAST_NOT_BOOKED, getDate(-1), Hospital.TEL_HASHOMER);
  await saveAppointment(
    FUTURE_BOOKED,
    getDate(3),
    Hospital.TEL_HASHOMER,
    DONOR_ID_2
  );
  await saveAppointment(FUTURE_NOT_BOOKED, getDate(35), Hospital.TEL_HASHOMER);

  const res = await callFunction(COORDINATOR_ID, 14);

  let appointments = res.appointments.filter((a) =>
    ALL_APPOINTMENT_IDS.includes(a.id)
  );
  expect(appointments).toHaveLength(3);
  expect(appointments[0].id).toEqual(PAST_NOT_BOOKED);
  expect(appointments[1].id).toEqual(FUTURE_BOOKED);
  expect(appointments[2].id).toEqual(FUTURE_NOT_BOOKED);
});

test("Valid request for group coordinator returns only users in group", async () => {
  await createUser(CoordinatorRole.GROUP_COORDINATOR);
  const group = await GroupsDAL.createGroup(GROUP_NAME_1, COORDINATOR_ID);

  await createDonor(DONOR_ID_1, group.id);
  await createDonor(DONOR_ID_2, "OTHER_GROUP");

  await saveAppointment(
    IN_GROUP_1,
    getDate(-3),
    Hospital.TEL_HASHOMER,
    DONOR_ID_1
  );

  await saveAppointment(
    IN_GROUP_2,
    getDate(-3),
    Hospital.TEL_HASHOMER,
    DONOR_ID_2
  );

  await saveAppointment(
    MANUAL_OF_COORDINATOR,
    getDate(-3),
    Hospital.TEL_HASHOMER,
    MANUAL_DONOR_ID,
    COORDINATOR_ID
  );

  await saveAppointment(
    MANUAL_NOT_OF_COORDINATOR,
    getDate(-3),
    Hospital.TEL_HASHOMER,
    MANUAL_DONOR_ID,
    OTHER_COORDINATOR_ID
  );

  const res = await callFunction(COORDINATOR_ID);

  let appointments = res.appointments.filter((a) =>
    ALL_APPOINTMENT_IDS.includes(a.id)
  );
  expect(appointments).toHaveLength(2);

  // May contain other donor ids of other appointments that are not part of this test
  expect(appointments[0].id).toEqual(IN_GROUP_1);
  expect(appointments[1].id).toEqual(MANUAL_OF_COORDINATOR);
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
  userId?: string,
  earliestTimeDays?: number,
  all?: boolean
): Promise<FunctionsApi.GetCoordinatorAppointmentsResponse> {
  const earliestStartTimeMillis = earliestTimeDays
    ? new Date().getTime() - earliestTimeDays * 24 * 60 * 60 * 1000
    : undefined;

  let request: FunctionsApi.GetCoordinatorAppointmentsRequest = {
    hospital: Hospital.TEL_HASHOMER,
    earliestStartTimeMillis,
  };

  if (all) {
    request.hospital = "all";
  }

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
  donorId?: string,
  assigningCoordinatorId?: string
) {
  const appointment: DbAppointment = {
    id: id,
    creationTime: admin.firestore.Timestamp.fromDate(donationStartTime),
    creatorUserId: COORDINATOR_ID,
    donationStartTime: admin.firestore.Timestamp.fromDate(donationStartTime),
    hospital: hospital,
    donorId: "",
    status: AppointmentStatus.AVAILABLE,
  };
  if (donorId) {
    appointment.donorId = donorId;
    appointment.bookingTime = admin.firestore.Timestamp.now();
    appointment.status = AppointmentStatus.BOOKED;
  }
  if (donorId === MANUAL_DONOR_ID) {
    appointment.assigningCoordinatorId = assigningCoordinatorId;
  }
  await setAppointment(appointment);
  return appointment;
}

async function createDonor(donorId: string, groupId: string) {
  const donor: DbDonor = {
    ...sampleUser,
    id: donorId,
    groupId: groupId,
  };

  await DonorDAL.setDonor(donor);
}
