import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { DbDonor, FunctionsApi } from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";
import { sampleUser } from "../testUtils/TestSamples";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetDonorFunctionName]
);

const ADMIN_ID = "GetDonorAdminId";
const DONOR_ID = "GetDonorTestId";

beforeAll(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAdmin(ADMIN_ID);
});

afterEach(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAdmin(ADMIN_ID);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => callTarget(DONOR_ID, undefined);
  await expectAsyncThrows(action, "Unauthorized");
});

test("User that is not the donor or admin throws exception", async () => {
  const action = () => callTarget(DONOR_ID, "otherUserId");

  await expectAsyncThrows(action, "Unauthorized getDonor request");
});

test("Invalid request throws exception", async () => {
  const action = () => callTarget("", DONOR_ID);

  await expectAsyncThrows(action, "Invalid getDonor request");
});

test("No such donor returns empty response", async () => {
  const res = await callTarget(DONOR_ID, DONOR_ID);

  expect(res.donor).toBeUndefined();
});

test("Donor request returns donor", async () => {
  await createDonor();

  const res = await callTarget(DONOR_ID, DONOR_ID);

  expect(res.donor?.id).toEqual(DONOR_ID);
});

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    ...sampleUser,
  };

  await setDonor(donor);
}

async function callTarget(donorId?: string, callingUser?: string) {
  return (await wrapped(
    { donorId: donorId },
    {
      auth: {
        uid: callingUser,
      },
    }
  )) as FunctionsApi.GetDonorResponse;
}
