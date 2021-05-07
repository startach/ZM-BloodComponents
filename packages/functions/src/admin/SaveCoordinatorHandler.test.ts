import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  DbCoordinator,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import {
  deleteAdmin,
  getCoordinator,
  setAdmin,
} from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.SaveCoordinatorFunctionName]
);
const CALLING_USER_ID = "SaveAdminTestCallingUser";
const TARGET_COORDINATOR_ID = "SaveAdminTestTargetUser";

beforeAll(async () => {
  await deleteAdmin(TARGET_COORDINATOR_ID);
});

afterEach(async () => {
  await deleteAdmin(CALLING_USER_ID);
  await deleteAdmin(TARGET_COORDINATOR_ID);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(getSaveCoordinatorRequest());
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not coordinator throws exception", async () => {
  const action = () =>
    wrapped(getSaveCoordinatorRequest(), {
      auth: {
        uid: CALLING_USER_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "User is not an coordinator and can't edit coordinators"
  );
});

test("User that has wrong role throws exception", async () => {
  await createUser(CoordinatorRole.HOSPITAL_COORDINATOR);

  const action = () =>
    wrapped(getSaveCoordinatorRequest(), {
      auth: {
        uid: CALLING_USER_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "User role is not authorized to edit coordinators"
  );
});

test("Valid request inserts new coordinator", async () => {
  await createUser(CoordinatorRole.SYSTEM_USER);

  const request = getSaveCoordinatorRequest();
  await wrapped(request, {
    auth: {
      uid: CALLING_USER_ID,
    },
  });

  const newAdmin = await getCoordinator(TARGET_COORDINATOR_ID);
  expect(newAdmin).toEqual(request.coordinator);
});

async function createUser(role: CoordinatorRole) {
  const newAdmin: DbCoordinator = {
    id: CALLING_USER_ID,
    role,
  };

  await setAdmin(newAdmin);
}

function getSaveCoordinatorRequest(): FunctionsApi.SaveCoordinatorRequest {
  const newCoordinator: DbCoordinator = {
    id: TARGET_COORDINATOR_ID,
    role: CoordinatorRole.HOSPITAL_COORDINATOR,
    hospitals: [Hospital.TEL_HASHOMER],
  };

  return { coordinator: newCoordinator };
}
