import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { FunctionsApi } from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";
import { sampleUser } from "../testUtils/TestSamples";
import { DbDonor } from "../function-types";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.SaveInCalanderFunctionName]
);

const ADMIN_ID = "SaveCalanderAdminId";
const DONOR_ID = "SaveCalanderTestId";

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

  await expectAsyncThrows(action, "Unauthorized saveInCalander request");
});

test("Invalid request throws exception", async () => {
  const action = () => callTarget("", DONOR_ID);

  await expectAsyncThrows(action, "Invalid saveInCalander request");
});

test("No such donor returns empty response", async () => {
  const res = await callTarget(DONOR_ID, DONOR_ID);

  expect(res.status).toEqual(FunctionsApi.SaveInCalanderStatus.DONOR_NOT_FOUND);
});

test("Donor request returns donor", async () => {
  await createDonor();

  const res = await callTarget(DONOR_ID, DONOR_ID);

  expect(res.status).toEqual(FunctionsApi.SaveInCalanderStatus.SUCCESS);
});

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    ...sampleUser,
    email: "yedidya03@gmail.com"
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
  )) as FunctionsApi.SaveInCalanderResponse;
}
