import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AppointmentStatus,
  BookingChange,
  CoordinatorRole,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import { deleteDonor, setDonor, getDonor } from "../dal/DonorDataAccessLayer";
import {
  deleteAppointmentsByIds,
  getAppointmentByIdOrThrow,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import * as admin from "firebase-admin";
import { sampleUser } from "../testUtils/TestSamples";
import { DbAppointment, DbCoordinator, DbDonor } from "../function-types";
import { deleteAdmin, setCoordinator } from "../dal/AdminDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.CompleteAppointmentFunctionName]
);

const DONOR_ID = "CompleteAppointmentHandlerDonorId";
const COORDINATOR_ID = "CompleteAppointmentHandlerCoordinatorId";
const APPOINTMENT_TO_COMPLETE = "CompleteAppointmentHandlerAppointment";
const HOSPITAL = Hospital.TEL_HASHOMER;

const reset = async () => {
  await deleteDonor(DONOR_ID);
  await deleteAdmin(COORDINATOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_TO_COMPLETE]);
};

beforeAll(async () => {
  await reset();
});

afterEach(async () => {
  await reset();
});

test("Unauthenticated user throws exception", async () => {
  const action = () => wrapped({ appointmentId: APPOINTMENT_TO_COMPLETE });
  await expectAsyncThrows(action, "Unauthorized");
});

test("Donor not found throws exception", async () => {
  const action = () =>
    wrapped(
      { appointmentId: "" },
      {
        auth: {
          uid: DONOR_ID,
        },
      }
    );

  await expectAsyncThrows(action, "No appointment to complete");
});

test("No such appointments throws exception", async () => {
  const action = () =>
    wrapped(
      { appointmentId: APPOINTMENT_TO_COMPLETE },
      {
        auth: {
          uid: DONOR_ID,
        },
      }
    );

  await expectAsyncThrows(
    action,
    `Appointment not found. Id ${APPOINTMENT_TO_COMPLETE}`
  );
});

test("Donor is not booked on this appointment throws exception", async () => {
  await saveAppointment("OTHER_DONOR");

  const action = () =>
    wrapped(completeAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "Appointment to be completed is not booked by donor"
  );
});

test("Coordinator is not for this hospital throws exception", async () => {
  await saveAppointment(DONOR_ID);
  await createCoordinator(Hospital.ASAF_HAROFE);

  const action = () =>
    wrapped(completeAppointmentRequest(true, true), {
      auth: {
        uid: COORDINATOR_ID,
      },
    });

  await expectAsyncThrows(
    action,
    "Coordinator has no permissions for hospital"
  );
});

test.each([
  AppointmentStatus.AVAILABLE,
  AppointmentStatus.COMPLETED,
  AppointmentStatus.NOSHOW,
])("Appointment has invalid status - %s", async (status) => {
  await saveAppointment(DONOR_ID, status);

  const action = () =>
    wrapped(completeAppointmentRequest(), {
      auth: {
        uid: DONOR_ID,
      },
    });

  await expectAsyncThrows(action, "Invalid appointment status - " + status);
});

test("Valid request when caller is a coordinator", async () => {
  await createDonor();
  await saveAppointment(DONOR_ID);
  await createCoordinator(HOSPITAL);

  await wrapped(completeAppointmentRequest(true, true), {
    auth: {
      uid: COORDINATOR_ID,
    },
  });

  const appointment = await getAppointmentByIdOrThrow(APPOINTMENT_TO_COMPLETE);
  expect(appointment.donationDoneTimeMillis).toBeTruthy();
  expect(appointment.status).toEqual(AppointmentStatus.NOSHOW);
  expect(appointment.lastChangeType).toEqual(BookingChange.NOSHOW);
  expect(appointment.creatorUserId).toEqual(COORDINATOR_ID);
});

test.each([true, false])(
  "Valid request complete appointment. is no show - %s",
  async (isNoShow) => {
    await createDonor();
    await saveAppointment(DONOR_ID);

    await wrapped(completeAppointmentRequest(isNoShow), {
      auth: {
        uid: DONOR_ID,
      },
    });

    const appointment = await getAppointmentByIdOrThrow(
      APPOINTMENT_TO_COMPLETE
    );
    expect(appointment.donationDoneTimeMillis).toBeTruthy();
    expect(appointment.status).toEqual(
      isNoShow ? AppointmentStatus.NOSHOW : AppointmentStatus.COMPLETED
    );
    expect(appointment.lastChangeType).toEqual(
      isNoShow ? BookingChange.NOSHOW : BookingChange.COMPLETED
    );
    expect(appointment.creatorUserId).toEqual(COORDINATOR_ID);
  }
);

test("Donor last Completed Appointment shouldt be updated when appointment is completed", async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  await createDonor({
    lastCompletedDonationTime: admin.firestore.Timestamp.fromDate(tomorrow),
  });
  await saveAppointment(DONOR_ID);
  await createCoordinator(HOSPITAL);
  const isNoShow = false;

  await wrapped(completeAppointmentRequest(isNoShow, true), {
    auth: {
      uid: COORDINATOR_ID,
    },
  });

  const donor = await getDonor(DONOR_ID);
  expect(donor?.lastCompletedDonationTime).toEqual(
    admin.firestore.Timestamp.fromDate(tomorrow)
  );
});

test("Donor last Completed Appointment is updated", async () => {
  await createDonor();
  await saveAppointment(DONOR_ID);
  await createCoordinator(HOSPITAL);
  const isNoShow = false;

  await wrapped(completeAppointmentRequest(isNoShow, true), {
    auth: {
      uid: COORDINATOR_ID,
    },
  });

  const donor = await getDonor(DONOR_ID);
  expect(donor?.lastCompletedDonationTime).toBeTruthy();
});

async function saveAppointment(
  donorId: string,
  status = AppointmentStatus.BOOKED
) {
  const time = admin.firestore.Timestamp.now();
  const appointment: DbAppointment = {
    id: APPOINTMENT_TO_COMPLETE,
    creationTime: time,
    creatorUserId: COORDINATOR_ID,
    donationStartTime: time,
    hospital: HOSPITAL,
    donorId: donorId,
    bookingTime: time,
    status: status,
    lastChangeType: BookingChange.BOOKED,
  };

  await setAppointment(appointment);
}

function completeAppointmentRequest(
  isNoshow?: boolean,
  callFromCoordinator?: boolean
): FunctionsApi.CompleteAppointmentRequest {
  return {
    appointmentId: APPOINTMENT_TO_COMPLETE,
    isNoshow: !!isNoshow,
    callFromCoordinator,
  };
}

async function createDonor(customFields?: Partial<DbDonor>) {
  const donor: DbDonor = {
    id: DONOR_ID,
    ...sampleUser,
    firstName: "firstName",
    email: "email@email.com",
    ...customFields,
  };

  await setDonor(donor);
}

async function createCoordinator(hospital: Hospital) {
  const coordinator: DbCoordinator = {
    id: COORDINATOR_ID,
    role: CoordinatorRole.HOSPITAL_COORDINATOR,
    hospitals: [hospital],
  };

  await setCoordinator(coordinator);
}
