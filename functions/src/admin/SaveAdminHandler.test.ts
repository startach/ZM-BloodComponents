import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { Admin, AdminRole, Hospital } from "../Types";
import * as Functions from "../index";
import {
  deleteAdmin,
  getAdmin,
  setAdmin,
} from "../firestore/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(Functions.saveAdmin);

const CALLING_USER_ID = "calling_admin_id";
const TARGET_ADMIN_ID = "new_admin_id";

beforeAll(async () => {
  await deleteAdmin(TARGET_ADMIN_ID);
});

afterEach(async () => {
  await deleteAdmin(CALLING_USER_ID);
  await deleteAdmin(TARGET_ADMIN_ID);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(getSaveAdminRequest());
  await expectAsyncThrows(action, "User must be authenticated to edit admins");
});

test("User that is not admin throws exception", async () => {
  const action = () =>
    wrapped(getSaveAdminRequest(), {
      auth: {
        uid: CALLING_USER_ID,
      },
    });

  await expectAsyncThrows(action, "User is not an admin and can't edit admins");
});

test("User that has wrong role throws exception", async () => {
  await setUser([AdminRole.ZM_COORDINATOR]);

  const action = () =>
    wrapped(getSaveAdminRequest(), {
      auth: {
        uid: CALLING_USER_ID,
      },
    });

  await expectAsyncThrows(action, "User role is not authorized to edit admins");
});

test("Valid request inserts new admin", async () => {
  await setUser([AdminRole.ZM_COORDINATOR, AdminRole.ZM_MANAGER]);

  const request = getSaveAdminRequest();
  await wrapped(request, {
    auth: {
      uid: CALLING_USER_ID,
    },
  });

  const newAdmin = await getAdmin(TARGET_ADMIN_ID);
  expect(newAdmin).toEqual(request.admin);
});

async function setUser(roles: AdminRole[]) {
  const newAdmin: Admin = {
    id: CALLING_USER_ID,
    phone: "test_phone",
    email: "test_email",
    roles,
  };

  await setAdmin(newAdmin);
}

function getSaveAdminRequest() {
  const newAdmin: Admin = {
    id: TARGET_ADMIN_ID,
    email: "target_email",
    phone: "target_phone",
    roles: [AdminRole.HOSPITAL_COORDINATOR],
    hospitals: [Hospital.TEL_HASHOMER],
  };

  return { admin: newAdmin };
}
