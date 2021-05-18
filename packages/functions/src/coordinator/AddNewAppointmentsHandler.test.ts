import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  DbCoordinator,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  getAppointmentsCreatedByUserId,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.AddNewAppointmentsFunctionName]
);

const USER_ID = "AddAppointmentHandlerTestUser";
const DONATION_START_TIME_1 = new Date(2021, 3, 11, 12, 30);
const DONATION_START_TIME_2 = new Date(2021, 3, 13, 11, 45);

const reset = async () => {
  await deleteAllTestUserAppointments();
  await deleteAdmin(USER_ID);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not admin throws exception", async () => {
  const action = () => callFunction(USER_ID);

  await expectAsyncThrows(
    action,
    "User is not a coordinator and can't edit appointments"
  );
});

test("User that has wrong role throws exception", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR);

  const action = () => callFunction(USER_ID);

  await expectAsyncThrows(
    action,
    "Coordinator has no permissions for hospital"
  );
});

test("User that does not have the right hospital throws exception", async () => {
  await createUser(CoordinatorRole.GROUP_COORDINATOR, [Hospital.TEL_HASHOMER]);

  const action = () => callFunction(USER_ID);

  await expectAsyncThrows(
    action,
    "Coordinator has no permissions for hospital"
  );
});

test("Valid request inserts new appointments", async () => {
  await createUser(CoordinatorRole.ZM_COORDINATOR, [
    Hospital.ASAF_HAROFE,
    Hospital.TEL_HASHOMER,
  ]);

  await callFunction(USER_ID);

  const newAppointmentIds = await getAppointmentIdsOfUser();
  expect(newAppointmentIds).toHaveLength(5);

  const addedAppointments = await getAppointmentsByIds(newAppointmentIds);
  addedAppointments.forEach((appointment) => {
    expect(appointment.creatorUserId).toEqual(USER_ID);

    expect([Hospital.ASAF_HAROFE, Hospital.TEL_HASHOMER]).toContain(
      appointment.hospital
    );

    const expectedStartTime =
      appointment.hospital == Hospital.ASAF_HAROFE
        ? DONATION_START_TIME_1
        : DONATION_START_TIME_2;
    expect(appointment.donationStartTime).toEqual(
      admin.firestore.Timestamp.fromDate(expectedStartTime)
    );
    expect(appointment.lastChangeTime).toBeUndefined();
    expect(appointment.lastChangeType).toBeUndefined();
  });
});

async function createUser(role: CoordinatorRole, hospitals?: Hospital[]) {
  const newAdmin: DbCoordinator = {
    id: USER_ID,
    role,
  };

  if (hospitals) {
    newAdmin.hospitals = hospitals;
  }

  await setAdmin(newAdmin);
}

async function getAppointmentIdsOfUser() {
  const appointments = await getAppointmentsCreatedByUserId(USER_ID);

  return appointments.map((a) => a.id || "");
}

function callFunction(userId?: string) {
  const request: FunctionsApi.AddAppointmentsRequest = {
    slotsRequests: [
      {
        hospital: Hospital.ASAF_HAROFE,
        donationStartTimeMillis: DONATION_START_TIME_1.getTime(),
        slots: 3,
      },
      {
        hospital: Hospital.TEL_HASHOMER,
        donationStartTimeMillis: DONATION_START_TIME_2.getTime(),
        slots: 2,
      },
    ],
  };

  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}

async function deleteAllTestUserAppointments() {
  const newAppointmentIds = await getAppointmentIdsOfUser();
  await deleteAppointmentsByIds(newAppointmentIds);
}
