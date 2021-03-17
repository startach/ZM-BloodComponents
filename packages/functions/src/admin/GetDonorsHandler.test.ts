import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { FunctionsApi } from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetDonorsFunctionName]
);

const COORDINATOR_ID = "GetDonorsFunctionNameTestCoordinator";

const reset = async () => {
  await deleteAdmin(COORDINATOR_ID);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

// test("User that is not admin throws exception", async () => {
//   const action = () => callFunction(USER_ID);
//
//   await expectAsyncThrows(
//       action,
//       "User is not an admin and can't edit appointments"
//   );
// });
//
// test("User that has wrong role throws exception", async () => {
//   await createUser([AdminRole.ZM_COORDINATOR]);
//
//   const action = () => callFunction(USER_ID);
//
//   await expectAsyncThrows(action, "User not authorized to preform action");
// });
//
// test("User that does not have the right hospital throws exception", async () => {
//   await createUser(
//       [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
//       [Hospital.TEL_HASHOMER]
//   );
//
//   const action = () => callFunction(USER_ID);
//
//   await expectAsyncThrows(action, "User not authorized to preform action");
// });
//
// test("Valid request inserts new appointments", async () => {
//   await createUser(
//       [AdminRole.ZM_COORDINATOR, AdminRole.HOSPITAL_COORDINATOR],
//       [Hospital.ASAF_HAROFE, Hospital.TEL_HASHOMER]
//   );
//
//   await callFunction(USER_ID);
//
//   const newAppointmentIds = await getAppointmentIdsOfUser();
//   expect(newAppointmentIds).toHaveLength(5);
//
//   const addedAppointments = await getAppointmentsByIds(newAppointmentIds);
//   addedAppointments.forEach((appointment) => {
//     expect(appointment.creatorUserId).toEqual(USER_ID);
//
//     expect([Hospital.ASAF_HAROFE, Hospital.TEL_HASHOMER]).toContain(
//         appointment.hospital
//     );
//
//     const expectedStartTime =
//         appointment.hospital == Hospital.ASAF_HAROFE
//             ? DONATION_START_TIME_1
//             : DONATION_START_TIME_2;
//     expect(appointment.donationStartTime).toEqual(
//         admin.firestore.Timestamp.fromDate(expectedStartTime)
//     );
//   });
// });
//
// async function createUser(roles: AdminRole[], hospitals?: Hospital[]) {
//   const newAdmin: DbAdmin = {
//     id: USER_ID,
//     phone: "test_phone",
//     email: "test_email",
//     roles,
//   };
//
//   if (hospitals) {
//     newAdmin.hospitals = hospitals;
//   }
//
//   await setAdmin(newAdmin);
// }
//
// async function getAppointmentIdsOfUser() {
//   const appointments = await getAppointmentsCreatedByUserId(USER_ID);
//
//   return appointments.map((a) => a.id || "");
// }

function callFunction(userId?: string) {
  const request: FunctionsApi.GetDonorsRequest = {};

  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}
