import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AdminRole,
  DbAdmin,
  DbAppointment,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.DeleteAppointmentsFunctionName]
);

const COORDINATOR_ID = "DeleteAppointmentHandlerTestUser";
const APPOINTMENT_ID = "DeleteAppointmentHandlerTestAppointmentId";

const reset = async () => {
  await deleteAppointmentsByIds([APPOINTMENT_ID]);
  await deleteAdmin(COORDINATOR_ID);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction(APPOINTMENT_ID, false);
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not admin throws exception", async () => {
  await saveAppointment();

  const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    "User is not an admin and can't edit appointments"
  );
});

test("User that has wrong role throws exception", async () => {
  await saveAppointment();

  await createUser([AdminRole.ZM_COORDINATOR]);

  const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  await expectAsyncThrows(action, "User not authorized to preform action");
});

test("User that does not have the right hospital throws exception", async () => {
  await saveAppointment();

  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.TEL_HASHOMER]
  );

  const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  await expectAsyncThrows(action, "User not authorized to preform action");
});

test("No such appointment throws exception", async () => {
  await createUser([AdminRole.SYSTEM_USER]);

  const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  await expectAsyncThrows(action, "Invalid appointment id");
});

test("Valid delete appointment request", async () => {
  await saveAppointment();

  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.ASAF_HAROFE, Hospital.BEILINSON]
  );

  await callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  const appointments = await getAppointmentsByIds([APPOINTMENT_ID]);
  expect(appointments).toHaveLength(0);
});

test("Valid remove donor request", async () => {
  await saveAppointment();

  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.ASAF_HAROFE, Hospital.BEILINSON]
  );

  await callFunction(APPOINTMENT_ID, true, COORDINATOR_ID);

  const appointments = await getAppointmentsByIds([APPOINTMENT_ID]);
  expect(appointments).toHaveLength(1);
  expect(appointments[0].id).toEqual(APPOINTMENT_ID);
  expect(appointments[0].donorId).toEqual("");
  expect(appointments[0].bookingTime).toBeUndefined();
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
  appointmentToDelete: string,
  onlyRemoveDonor: boolean,
  userId?: string
) {
  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentId: appointmentToDelete,
    onlyRemoveDonor,
  };

  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}

async function saveAppointment() {
  const appointment: DbAppointment = {
    id: APPOINTMENT_ID,
    creationTime: admin.firestore.Timestamp.now(),
    creatorUserId: COORDINATOR_ID,
    donationStartTime: admin.firestore.Timestamp.now(),
    hospital: Hospital.BEILINSON,
    donorId: "DONOR_ID",
    bookingTime: admin.firestore.Timestamp.now(),
  };

  await setAppointment(appointment);
  return appointment;
}
