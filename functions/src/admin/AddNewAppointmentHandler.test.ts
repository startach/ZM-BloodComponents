import * as firebaseFunctionsTest from "firebase-functions-test";
import { AdminRole, Appointment, Hospital } from "../Types";
import * as admin from "firebase-admin";
import * as Funcations from "../index";
import { Collections } from "../Collections";

const firebaseConfig = {
  apiKey: "AIzaSyC6EDL8gMkZc3GGzGveMqWe5zvAr5DNiL4",
  authDomain: "blood-components.firebaseapp.com",
  databaseURL: "https://blood-components.firebaseio.com",
  projectId: "blood-components",
  storageBucket: "blood-components.appspot.com",
  messagingSenderId: "388223113819",
  appId: "1:388223113819:web:1273570a12add0fedafd7e",
  measurementId: "G-K6NM078FWD",
};

const serviceAccountKeyPath = "./blood-components-c3ca9f3e6e03.json";
const firebaseTest = firebaseFunctionsTest(
  firebaseConfig,
  serviceAccountKeyPath
);
const wrapped = firebaseTest.wrap(Funcations.addNewAppointment);

const USER_ID = "test_user_id";
const DONATION_START_TIME = new Date(2021, 3, 11);

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
    new Error("User must be authenticated to add new appointments")
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

  const wrapped = firebaseTest.wrap(Funcations.addNewAppointment);

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

  const wrapped = firebaseTest.wrap(Funcations.addNewAppointment);

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

  const deleteAppointmentsWrapped = firebaseTest.wrap(
    Funcations.deleteAppointments
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

async function setUser(role: AdminRole[], hospitals?: Hospital[]) {
  await admin
    .firestore()
    .collection(Collections.ADMIN)
    .doc(USER_ID)
    .set({
      role,
      hospitals: hospitals || null,
    });
}

async function getAppointmentIdsOfUser() {
  const res: string[] = [];
  const appointments = await admin
    .firestore()
    .collection(Collections.APPOINTMENTS)
    .where("creatorUserId", "==", USER_ID)
    .get();

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
