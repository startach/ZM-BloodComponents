import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AdminRole,
  BloodType,
  DbAdmin,
  DbDonor,
  FunctionsApi,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(Functions.getDonor);

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
  const action = () => wrapped(getDonorRequest());
  await expectAsyncThrows(action, "User must be authenticated to get donor");
});

test("User that is not the donor or admin throws exception", async () => {
  const action = () =>
    wrapped(getDonorRequest(), {
      auth: {
        uid: "OtherUser",
      },
    });

  await expectAsyncThrows(action, "Unauthorized getDonor request");
});

test("Invalid request throws exception", async () => {
  const action = () =>
    wrapped(
      { donorId: "" },
      {
        auth: {
          uid: DONOR_ID,
        },
      }
    );

  await expectAsyncThrows(action, "Invalid getDonor request");
});

test("No such donor throws exception", async () => {
  const action = () =>
    wrapped(getDonorRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "Donor not found");
});

test("Donor request returns donor", async () => {
  await createDonor();

  const res: DbDonor = await wrapped(getDonorRequest(), {
    auth: {
      uid: DONOR_ID,
    },
  });

  expect(res.id).toEqual(DONOR_ID);
});

test("Invalid admin throws exception", async () => {
  await createDonor();
  await createAdmin(AdminRole.HOSPITAL_COORDINATOR);

  const action = () =>
    wrapped(getDonorRequest(), {
      auth: {
        uid: ADMIN_ID,
      },
    });

  await expectAsyncThrows(action, "Unauthorized getDonor request");
});

test("Valid admin request returns donor", async () => {
  await createDonor();
  await createAdmin(AdminRole.SYSTEM_USER);

  const res: DbDonor = await wrapped(getDonorRequest(), {
    auth: {
      uid: ADMIN_ID,
    },
  });

  expect(res.id).toEqual(DONOR_ID);
});

async function createDonor() {
  const donor: DbDonor = {
    id: DONOR_ID,
    email: "email",
    phone: "phone",
    bloodType: BloodType.A_MINUS,
  };

  await setDonor(donor);
}

async function createAdmin(role: AdminRole) {
  const admin: DbAdmin = {
    id: ADMIN_ID,
    email: "email",
    phone: "phone",
    roles: [role],
  };

  await setAdmin(admin);
}

function getDonorRequest(): FunctionsApi.GetDonorRequest {
  return { donorId: DONOR_ID };
}
