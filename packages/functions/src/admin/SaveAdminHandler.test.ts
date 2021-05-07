import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  DbCoordinator,
  CoordinatorRole,
  Hospital,
  FunctionsApi,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import {
  deleteAdmin,
  getCoordinator,
  setAdmin,
} from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.SaveAdminFunctionName]
);
const CALLING_USER_ID = "SaveAdminTestCallingUser";
const TARGET_ADMIN_ID = "SaveAdminTestTargetUser";

beforeAll(async () => {
  await deleteAdmin(TARGET_ADMIN_ID);
});

afterEach(async () => {
  await deleteAdmin(CALLING_USER_ID);
  await deleteAdmin(TARGET_ADMIN_ID);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(getSaveAdminRequest());
  await expectAsyncThrows(action, "Unauthorized");
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
  await createUser([]);

  const action = () =>
    wrapped(getSaveAdminRequest(), {
      auth: {
        uid: CALLING_USER_ID,
      },
    });

  await expectAsyncThrows(action, "User role is not authorized to edit admins");
});

test("Valid request inserts new admin", async () => {
  await createUser([
    CoordinatorRole.ZM_COORDINATOR,
    CoordinatorRole.ZM_MANAGER,
  ]);

  const request = getSaveAdminRequest();
  await wrapped(request, {
    auth: {
      uid: CALLING_USER_ID,
    },
  });

  const newAdmin = await getCoordinator(TARGET_ADMIN_ID);
  expect(newAdmin).toEqual(request.admin);
});

async function createUser(roles: CoordinatorRole[]) {
  const newAdmin: DbCoordinator = {
    id: CALLING_USER_ID,
    phone: "test_phone",
    email: "test_email",
    roles,
  };

  await setAdmin(newAdmin);
}

function getSaveAdminRequest() {
  const newAdmin: DbCoordinator = {
    id: TARGET_ADMIN_ID,
    email: "target_email",
    phone: "target_phone",
    roles: [CoordinatorRole.HOSPITAL_COORDINATOR],
    hospitals: [Hospital.TEL_HASHOMER],
  };

  return { admin: newAdmin };
}
