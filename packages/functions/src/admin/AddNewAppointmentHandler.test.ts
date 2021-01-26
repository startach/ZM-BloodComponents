import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  DbAdmin,
  AdminRole,
  DbAppointment,
  Hospital,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { Collections } from "../Collections";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentsCreatedByUserId,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(Functions.addNewAppointment);

const USER_ID = "test_user_id";
const DONATION_START_TIME = new Date(2021, 3, 11);

beforeAll(async () => {
  const appointmentsOfUser = await getAppointmentsCreatedByUserId(USER_ID);
  await deleteAppointmentsByIds(appointmentsOfUser.map((a) => a.id || ""));
});

afterEach(async () => {
  await deleteAdmin(USER_ID);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(getRequest());
  await expectAsyncThrows(
    action,
    "User must be authenticated to edit appointments"
  );
});

test("User that is not admin throws exception", async () => {
  const action = () =>
    wrapped(getRequest(), {
      auth: {
        uid: USER_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "User is not an admin and can't edit appointments"
  );
});

test("User that has wrong role throws exception", async () => {
  await createUser([AdminRole.ZM_COORDINATOR]);

  const action = () =>
    wrapped(getRequest(), {
      auth: {
        uid: USER_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "User not authorized to edit appointments of ASAF_HAROFE"
  );
});

test("User that does not have the right hospital throws exception", async () => {
  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.TEL_HASHOMER]
  );

  const action = () =>
    wrapped(getRequest(), {
      auth: {
        uid: USER_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "User not authorized to edit appointments of ASAF_HAROFE"
  );
});

test("Valid request inserts new appointments", async () => {
  await createUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.ASAF_HAROFE]
  );

  await wrapped(getRequest(), {
    auth: {
      uid: USER_ID,
    },
  });

  const newAppointmentIds = await getAppointmentIdsOfUser();
  expect(newAppointmentIds).toHaveLength(3);

  const sampleAppointment = await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .doc(newAppointmentIds[0])
    .get()
    .then((a) => a.data() as DbAppointment);
  expect(sampleAppointment.creatorUserId).toEqual(USER_ID);
  expect(sampleAppointment.donationStartTime).toEqual(
    admin.firestore.Timestamp.fromDate(DONATION_START_TIME)
  );
  expect(sampleAppointment.hospital).toEqual(Hospital.ASAF_HAROFE);

  const deleteAppointmentsWrapped = firebaseFunctionsTest.wrap(
    Functions.deleteAppointments
  );
  await deleteAppointmentsWrapped(
    { appointmentIds: newAppointmentIds },
    {
      auth: {
        uid: USER_ID,
      },
    }
  );
});

async function createUser(roles: AdminRole[], hospitals?: Hospital[]) {
  const newAdmin: DbAdmin = {
    id: USER_ID,
    phone: "test_phone",
    email: "test_email",
    roles,
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

function getRequest() {
  return {
    hospital: Hospital.ASAF_HAROFE,
    donationStartTime: DONATION_START_TIME,
    slots: 3,
  };
}
