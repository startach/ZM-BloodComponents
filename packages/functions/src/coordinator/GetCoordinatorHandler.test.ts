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
import { saveTestDonor } from "../testUtils/TestSamples";
import { expectAsyncThrows } from "../testUtils/TestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetCoordinatorFunctionName]
);

const COORDINATOR_ID = "GetCoordinatorFunctionTestCoordinator";
const COORDINATOR_FIRST_NAME = "TestFirstName";
const COORDINATOR_LAST_NAME = "TestLastName";
const COORDINATOR_FULL_NAME = `${COORDINATOR_FIRST_NAME} ${COORDINATOR_LAST_NAME}`;

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

test("Hospital Coordinator gets active hospitals", async () => {
  await createCoordinator(CoordinatorRole.HOSPITAL_COORDINATOR, [
    ...HospitalUtils.activeHospitals,
    Hospital.RAMBAM, // not active
  ]);

  const response = await callFunction(COORDINATOR_ID);

  expect(response.coordinator.name).toEqual(COORDINATOR_FULL_NAME);
  expect(response.coordinator.role).toEqual(
    CoordinatorRole.HOSPITAL_COORDINATOR
  );
  expect(response.coordinator.activeHospitalsForCoordinator).toEqual(
    HospitalUtils.activeHospitals
  );
});

test("System User gets all active hospitals", async () => {
  await createCoordinator(CoordinatorRole.SYSTEM_USER);

  const response = await callFunction(COORDINATOR_ID);

  expect(response.coordinator.name).toEqual(COORDINATOR_FULL_NAME);
  expect(response.coordinator.role).toEqual(CoordinatorRole.SYSTEM_USER);
  expect(response.coordinator.activeHospitalsForCoordinator).toEqual(
    HospitalUtils.activeHospitals
  );
});

test("Group Coordinator gets no hospitals", async () => {
  await createCoordinator(CoordinatorRole.GROUP_COORDINATOR, [Hospital.HADASA]);

  const response = await callFunction(COORDINATOR_ID);

  expect(response.coordinator.name).toEqual(COORDINATOR_FULL_NAME);
  expect(response.coordinator.role).toEqual(CoordinatorRole.GROUP_COORDINATOR);
  expect(response.coordinator.activeHospitalsForCoordinator).toEqual([]);
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

  await saveTestDonor(COORDINATOR_ID, {
    firstName: COORDINATOR_FIRST_NAME,
    lastName: COORDINATOR_LAST_NAME,
  });
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
