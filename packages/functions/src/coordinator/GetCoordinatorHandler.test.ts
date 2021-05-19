import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  DbCoordinator,
  FunctionsApi,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetCoordinatorFunctionName]
);

const COORDINATOR_ID = "GetCoordinatorFunctionTestCoordinator";

const reset = async () => {
  await deleteAdmin(COORDINATOR_ID);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not admin throws exception", async () => {
  const action = () => callFunction(COORDINATOR_ID);

  await expectAsyncThrows(action, "User is not a coordinator");
});

test("Hospital Coordinator gets its hospitals", async () => {
  await createCoordinator(CoordinatorRole.HOSPITAL_COORDINATOR, [
    Hospital.BEILINSON,
    Hospital.HADASA,
  ]);

  const response = await callFunction(COORDINATOR_ID);

  expect(response.role).toEqual(CoordinatorRole.HOSPITAL_COORDINATOR);
  expect(response.hospitals).toEqual([Hospital.BEILINSON, Hospital.HADASA]);
});

test("System User gets all active hospitals", async () => {
  await createCoordinator(CoordinatorRole.SYSTEM_USER);

  const response = await callFunction(COORDINATOR_ID);

  expect(response.role).toEqual(CoordinatorRole.SYSTEM_USER);
  expect(response.hospitals).toEqual(HospitalUtils.activeHospitals);
});

test("Group Coordinator gets no hospitals", async () => {
  await createCoordinator(CoordinatorRole.GROUP_COORDINATOR, [
    Hospital.ASAF_HAROFE,
  ]);

  const response = await callFunction(COORDINATOR_ID);

  expect(response.role).toEqual(CoordinatorRole.GROUP_COORDINATOR);
  expect(response.hospitals).toEqual([]);
});

async function createCoordinator(
  role: CoordinatorRole,
  hospitals?: Hospital[]
) {
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
  userId?: string
): Promise<FunctionsApi.GetCoordinatorResponse> {
  const request: FunctionsApi.GetCoordinatorRequest = {};
  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}
