import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { Admin, AdminRole, Appointment, Hospital } from "../Types";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { Collections } from "../Collections";
import { setAdmin } from "../firestore/AdminDataAccessLayer";
import { getAppointmentsByUserId } from "../firestore/AppointmentDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(Functions.addNewAppointment);

const USER_ID = "test_user_id";
const DONATION_START_TIME = new Date(2021, 3, 11);

beforeAll(async () => {
  const appointmentsOfUser = await getAppointmentsByUserId(USER_ID);
  const promises = appointmentsOfUser.map(
    async (appointment) => await appointment.ref.delete()
  );
  await Promise.all(promises);
});

afterEach(async () => {
  await deleteUser();
});

test("Unauthenticated user throws exception", async () => {
  let error;
  try {
    await wrapped(getData());
  } catch (e) {
    error = e;
  }

  expect(error).toEqual(
    new Error("User must be authenticated to edit appointments")
  );
});

test("User that is not admin throws exception", async () => {
  let error;
  try {
    await wrapped(getData(), {
      auth: {
        uid: USER_ID,
      },
    });
  } catch (e) {
    error = e;
  }

  expect(error).toEqual(
    new Error("User is not an admin and can't edit appointments")
  );
});

test("User that has wrong role throws exception", async () => {
  await setUser([AdminRole.ZM_COORDINATOR]);

  let error;
  try {
    await wrapped(getData(), {
      auth: {
        uid: USER_ID,
      },
    });
  } catch (e) {
    error = e;
  }

  expect(error).toEqual(
    new Error("User not authorized to edit appointments of ASAF_HAROFE")
  );
});

test("User that does not have the right hospital throws exception", async () => {
  await setUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.TEL_HASHOMER]
  );

  let error;
  try {
    await wrapped(getData(), {
      auth: {
        uid: USER_ID,
      },
    });
  } catch (e) {
    error = e;
  }

  expect(error).toEqual(
    new Error("User not authorized to edit appointments of ASAF_HAROFE")
  );
});

test("Valid request inserts new appointments", async () => {
  await setUser(
    [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
    [Hospital.ASAF_HAROFE]
  );

  await wrapped(getData(), {
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
    .then((a) => a.data() as Appointment);
  expect(sampleAppointment.creatorUserId).toEqual(USER_ID);
  expect(sampleAppointment.donationStartTime.toDate()).toEqual(
    DONATION_START_TIME
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

async function deleteUser() {
  await admin.firestore().collection(Collections.ADMIN).doc(USER_ID).delete();
}

async function setUser(roles: AdminRole[], hospitals?: Hospital[]) {
  const newAdmin: Admin = {
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
  const res: string[] = [];

  const appointments = await getAppointmentsByUserId(USER_ID);

  appointments.forEach((app) => res.push(app.id));

  return res;
}

function getData() {
  return {
    hospital: Hospital.ASAF_HAROFE,
    donationStartTime: DONATION_START_TIME,
    slots: 3,
  };
}
