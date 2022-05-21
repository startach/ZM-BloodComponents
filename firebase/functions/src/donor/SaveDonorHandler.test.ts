import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import { BloodType, FunctionsApi } from "@zm-blood-components/common";
import * as Functions from "../index";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { deleteDonor, getDonor } from "../dal/DonorDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.SaveDonorFunctionName]
);

const DONOR_ID = "SaveDonorTestId";

beforeAll(async () => {
  await deleteDonor(DONOR_ID);
});

afterEach(async () => {
  await deleteDonor(DONOR_ID);
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped(saveDonorRequest());
  await expectAsyncThrows(action, "Unauthorized");
});

test("Caller is not the donor throws exception", async () => {
  const action = () =>
    wrapped(saveDonorRequest(), {
      auth: {
        uid: "OtherUser",
      },
    });

  await expectAsyncThrows(action, "Unauthorized saveDonor request");
});

test("Valid request creates donor", async () => {
  await wrapped(saveDonorRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  const donor = await getDonor(DONOR_ID);

  expect(donor).toBeDefined();
  expect(donor?.id).toEqual(DONOR_ID);
  expect(donor?.email).toEqual("email");
  expect(donor?.phone).toEqual("phone");
  expect(donor?.firstName).toEqual("firstName");
  expect(donor?.lastName).toEqual("lastName");
  expect(donor?.birthDate).toEqual("2020-11-13");
  expect(donor?.notificationSettings?.disableEmailNotifications).toBeTruthy();
});

function saveDonorRequest(): FunctionsApi.SaveDonorRequest {
  return {
    id: DONOR_ID,
    email: "email",
    phone: "phone",
    bloodType: BloodType.A_MINUS,
    firstName: "firstName",
    lastName: "lastName",
    birthDate: "2020-11-13",
    notificationSettings: {
      disableEmailNotifications: true,
    },
  };
}
