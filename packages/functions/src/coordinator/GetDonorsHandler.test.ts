import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { sampleUser } from "../testUtils/TestSamples";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import * as GroupDAL from "../dal/GroupsDataAccessLayer";
import { DbCoordinator, DbDonor } from "../function-types";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetDonorsFunctionName]
);

const COORDINATOR_ID = "GetDonorsFunctionNameTestCoordinator";
const DONOR_ID_1 = "GetDonorsFunctionNameTestCoordinator1";
const DONOR_ID_2 = "GetDonorsFunctionNameTestCoordinator2";
const DONOR_ID_3 = "GetDonorsFunctionNameTestCoordinator3";
const ALL_DONOR_IDS = [DONOR_ID_1, DONOR_ID_2, DONOR_ID_3];
const GROUP_NAME_1 = "GetDonorsFunctionNameTestGroup1";

const reset = async () => {
  await deleteAdmin(COORDINATOR_ID);
  await DonorDAL.deleteDonor(DONOR_ID_1);
  await DonorDAL.deleteDonor(DONOR_ID_2);
  await DonorDAL.deleteDonor(DONOR_ID_3);
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
  expect(response.donors[0].id).toEqual(DONOR_ID_1);
});

test("HOSPITAL_COORDINATOR gets only users that had a donation in their hospitals", async () => {
  await createCoordinator(CoordinatorRole.HOSPITAL_COORDINATOR, [
    Hospital.TEL_HASHOMER,
    Hospital.HADASA_EIN_KEREM,
  ]);

  await createDonorWithHospital(DONOR_ID_1, Hospital.TEL_HASHOMER);
  await createDonorWithHospital(DONOR_ID_2, Hospital.ASAF_HAROFE);
  await createDonorWithHospital(DONOR_ID_3, Hospital.HADASA_EIN_KEREM);

  const response = await callFunction(COORDINATOR_ID);

  const relevantDonors = response.donors.filter((x) =>
    ALL_DONOR_IDS.includes(x.id)
  );
  expect(relevantDonors).toHaveLength(2);
  expect(relevantDonors[0].id).toEqual(DONOR_ID_1);
  expect(relevantDonors[1].id).toEqual(DONOR_ID_3);
});

async function createCoordinator(
  role: CoordinatorRole,
  hospitals?: Hospital[]
) {
  const newCoordinator: DbCoordinator = {
    id: COORDINATOR_ID,
    role,
  };

  if (hospitals) {
    newCoordinator.hospitals = hospitals;
  }

  await setAdmin(newCoordinator);
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

async function createDonorWithHospital(id: string, hospital: Hospital) {
  const donor: DbDonor = {
    ...sampleUser,
    id,
    lastBookedHospital: hospital,
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
