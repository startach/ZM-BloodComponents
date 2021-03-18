import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { DbAdmin, DbDonor, FunctionsApi } from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { sampleUser } from "../testUtils/TestSamples";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetDonorsFunctionName]
);

const COORDINATOR_ID = "GetDonorsFunctionNameTestCoordinator";
const DONOR_ID = "GetDonorsFunctionNameTestCoordinator";

const reset = async () => {
  await deleteAdmin(COORDINATOR_ID);
  await deleteDonor(DONOR_ID);
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction();
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not admin throws exception", async () => {
  const action = () => callFunction(DONOR_ID);

  await expectAsyncThrows(
    action,
    "User GetDonorsFunctionNameTestCoordinator is not an admin"
  );
});

test("All donors are returned", async () => {
  await createCoordinator();
  await createDonor();

  const response = await callFunction(COORDINATOR_ID);

  const testDonor = response.donors.filter((donor) => donor.id === DONOR_ID);

  expect(testDonor).toHaveLength(1);
});

async function createCoordinator() {
  const newAdmin: DbAdmin = {
    id: COORDINATOR_ID,
    phone: "test_phone",
    email: "test_email",
    roles: [],
  };

  await setAdmin(newAdmin);
}

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    ...sampleUser,
  };

  await setDonor(donor);
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
