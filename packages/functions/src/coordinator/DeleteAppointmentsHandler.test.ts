import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  CoordinatorRole,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentByIdOrThrow,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import {
  NotificationToDonor,
  sendEmailToDonor,
} from "../notifications/NotificationSender";
import { mocked } from "ts-jest/utils";
import { sampleUser } from "../testUtils/TestSamples";
import * as DonorDAL from "../dal/DonorDataAccessLayer";
import { deleteDonor } from "../dal/DonorDataAccessLayer";
import { AppointmentStatus } from "@zm-blood-components/common/src";
import { DbAppointment, DbCoordinator, DbDonor } from "../function-types";

jest.mock("../notifications/NotificationSender");
const mockedNotifier = mocked(sendEmailToDonor);

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.DeleteAppointmentsFunctionName]
);

const DONOR_ID = "DeleteAppointmentHandlerTestDonorUser";
const COORDINATOR_ID = "DeleteAppointmentHandlerTestUser";
const APPOINTMENT_ID = "DeleteAppointmentHandlerTestAppointmentId";

const reset = async () => {
  await deleteAppointmentsByIds([APPOINTMENT_ID]);
  await deleteAdmin(COORDINATOR_ID);
  await deleteDonor(DONOR_ID);
  mockedNotifier.mockClear();
};

beforeAll(reset);
afterEach(reset);

test("Unauthenticated user throws exception", async () => {
  const action = () => callFunction(APPOINTMENT_ID, false);
  await expectAsyncThrows(action, "Unauthorized");
});

test.each([true, false])(
  "User that is not coordinator throws exception",
  async () => {
    await saveAppointment();

    const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

    await expectAsyncThrows(
      action,
      "User is not a coordinator and can't edit appointments"
    );
  }
);

test("User that has wrong role throws exception", async () => {
  await saveAppointment();

  await createUser(CoordinatorRole.GROUP_COORDINATOR);

  const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    "Coordinator has no permissions for hospital"
  );
});

test("User that does not have the right hospital throws exception", async () => {
  await saveAppointment();

  await createUser(CoordinatorRole.ZM_COORDINATOR, [Hospital.TEL_HASHOMER]);

  const action = () => callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    "Coordinator has no permissions for hospital"
  );
});

test("No such appointment throws exception when only removing donor", async () => {
  await createUser(CoordinatorRole.SYSTEM_USER);

  const action = () => callFunction(APPOINTMENT_ID, true, COORDINATOR_ID);

  await expectAsyncThrows(
    action,
    `Cannot remove donor from missing appointment - ${APPOINTMENT_ID}`
  );
});

test("No such appointment fails silently", async () => {
  await createUser(CoordinatorRole.SYSTEM_USER);

  await callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);
});

test.each([true, false])(
  "Valid delete appointment request - booked: %p",
  async (booked) => {
    await saveAppointment(booked);
    if (booked) {
      await createDonor();
    }

    await createUser(CoordinatorRole.ZM_COORDINATOR, [
      Hospital.ASAF_HAROFE,
      Hospital.BEILINSON,
    ]);

    await callFunction(APPOINTMENT_ID, false, COORDINATOR_ID);

    const action = () => getAppointmentByIdOrThrow(APPOINTMENT_ID);

    await expectAsyncThrows(
      action,
      `Appointment not found. Id ${APPOINTMENT_ID}`
    );

    // Check notification is sent
    if (booked) {
      expect(mockedNotifier).toHaveBeenCalledWith(
        NotificationToDonor.APPOINTMENT_CANCELLED_BY_COORDINATOR,
        expect.objectContaining({
          appointmentId: APPOINTMENT_ID,
        }),
        expect.objectContaining({
          email: "email",
        })
      );
    } else {
      expect(mockedNotifier).toHaveBeenCalledTimes(0);
    }
  }
);

test.each([true, false])(
  "Valid remove donor request - booked: %p",
  async (booked) => {
    await saveAppointment(booked);
    if (booked) {
      await createDonor();
    }

    await createUser(CoordinatorRole.ZM_COORDINATOR, [
      Hospital.ASAF_HAROFE,
      Hospital.BEILINSON,
    ]);

    await callFunction(APPOINTMENT_ID, true, COORDINATOR_ID);

    const appointment = await getAppointmentByIdOrThrow(APPOINTMENT_ID);
    expect(appointment.id).toEqual(APPOINTMENT_ID);
    expect(appointment.donorId).toEqual("");
    expect(appointment.status).toEqual(AppointmentStatus.AVAILABLE);
    expect(appointment.bookingTime).toBeUndefined();

    // Check notification is sent
    if (booked) {
      expect(mockedNotifier).toHaveBeenCalledWith(
        NotificationToDonor.APPOINTMENT_CANCELLED_BY_COORDINATOR,
        expect.objectContaining({
          appointmentId: APPOINTMENT_ID,
        }),
        expect.objectContaining({
          email: "email",
        })
      );
    } else {
      expect(mockedNotifier).toHaveBeenCalledTimes(0);
    }
  }
);

async function createUser(role: CoordinatorRole, hospitals?: Hospital[]) {
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
  appointmentToDelete: string,
  onlyRemoveDonor: boolean,
  userId?: string
) {
  const request: FunctionsApi.DeleteAppointmentRequest = {
    appointmentId: appointmentToDelete,
    onlyRemoveDonor,
  };

  return wrapped(request, {
    auth: {
      uid: userId,
    },
  });
}

async function saveAppointment(booked?: boolean) {
  const appointment: DbAppointment = {
    id: APPOINTMENT_ID,
    creationTime: admin.firestore.Timestamp.now(),
    creatorUserId: COORDINATOR_ID,
    donationStartTime: admin.firestore.Timestamp.now(),
    hospital: Hospital.BEILINSON,
    donorId: "",
    status: booked ? AppointmentStatus.BOOKED : AppointmentStatus.AVAILABLE,
  };

  if (booked) {
    appointment.donorId = DONOR_ID;
    appointment.bookingTime = admin.firestore.Timestamp.now();
  }

  await setAppointment(appointment);
  return appointment;
}

async function createDonor() {
  const donor: DbDonor = {
    ...sampleUser,
    id: DONOR_ID,
  };

  await DonorDAL.setDonor(donor);
}
