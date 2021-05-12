import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  DbCoordinator,
  DbDonor,
  FunctionsApi,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { sampleUser } from "../testUtils/TestSamples";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetDonorsFunctionName]
);

const COORDINATOR_ID = "GetDonorsFunctionNameTestCoordinator";
const DONOR_ID_1 = "GetDonorsFunctionNameTestCoordinator1";
const DONOR_ID_2 = "GetDonorsFunctionNameTestCoordinator2";
const GROUP_NAME_1 = "GetDonorsFunctionNameTestGroup1";

const reset = async () => {
  await deleteAdmin(COORDINATOR_ID);
  await DonorDAL.deleteDonor(DONOR_ID_1);
  await DonorDAL.deleteDonor(DONOR_ID_2);
  const groups = await GroupDAL.getGroupIdsOfCoordinatorId(COORDINATOR_ID);
  groups.forEach((groupId) => GroupDAL.deleteGroup(groupId));
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not admin throws exception", async () => {
  const action = () => callFunction(DONOR_ID_1);

  await expectAsyncThrows(
    action,
    "User GetDonorsFunctionNameTestCoordinator1 is not an admin"
  );
});

test("Test users are not returned", async () => {
  await createCoordinator(CoordinatorRole.SYSTEM_USER);
  await createDonor(DONOR_ID_1, GROUP_NAME_1, true);

  const response = await callFunction(COORDINATOR_ID);

  const testDonor = response.donors.filter((donor) => donor.id === DONOR_ID_1);

  expect(testDonor).toHaveLength(0);
});

test("SYSTEM_USER gets all users", async () => {
  await createCoordinator(CoordinatorRole.SYSTEM_USER);
  await createDonor(DONOR_ID_1, GROUP_NAME_1);

  const response = await callFunction(COORDINATOR_ID);

  const testDonor = response.donors.filter((donor) => donor.id === DONOR_ID_1);

  expect(testDonor).toHaveLength(1);
});

test("GROUP_COORDINATOR gets only users in group", async () => {
  await createCoordinator(CoordinatorRole.GROUP_COORDINATOR);
  const group = await GroupDAL.createGroup(GROUP_NAME_1, COORDINATOR_ID);

  await createDonor(DONOR_ID_1, group.id);
  await createDonor(DONOR_ID_2, "other_group_id");

  const response = await callFunction(COORDINATOR_ID);

  expect(response.donors).toHaveLength(1);
});

async function createCoordinator(role: CoordinatorRole) {
  const newAdmin: DbCoordinator = {
    id: COORDINATOR_ID,
    role,
  };

  await setAdmin(newAdmin);
}

async function createDonor(id: string, groupId: string, testUser?: boolean) {
  const donor: DbDonor = {
    ...sampleUser,
    id,
    groupId,
    testUser: !!testUser,
  };

  await DonorDAL.setDonor(donor);
}

function callFunction(
  userId?: string
): Promise<FunctionsApi.GetDonorsResponse> {
  const request: FunctionsApi.GetDonorsRequest = {};

  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}
