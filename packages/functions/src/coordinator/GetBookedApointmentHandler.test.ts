import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  AppointmentStatus,
  BloodType,
  CoordinatorRole,
  FunctionsApi,
  Hospital,
  MANUAL_DONOR_ID,
  MinimalDonorDetailsForAppointment,
} from "@zm-blood-components/common";
import * as admin from "firebase-admin";
import * as Functions from "../index";
import { deleteAdmin, setAdmin } from "../dal/AdminDataAccessLayer";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { sampleUser } from "../testUtils/TestSamples";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";
import { DbAppointment, DbCoordinator, DbDonor } from "../function-types";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetBookedAppointment]
);

const HOSPITAL = Hospital.TEL_HASHOMER;
const DONOR_ID = "GetBookedAppointmentDonorId";
const COORDINATOR_ID = "GetBookedAppointmentCoordinator";
const APPOINTMENT_ID = "GetBookedAppointmentAppointmentId";
const TIME = 1641659400000;

describe("GetBookedAppointment", function () {
  const reset = async () => {
    await deleteAppointmentsByIds([APPOINTMENT_ID]);
    await deleteAdmin(COORDINATOR_ID);
    await deleteDonor(DONOR_ID);
  };

  beforeAll(reset);
  afterEach(reset);

  test("Unauthenticated user throws exception", async () => {
    const action = () => callFunction();
    await expectAsyncThrows(action, "Unauthorized");
  });

  test("Non Coordinator throws exception", async () => {
    const action = () => callFunction(COORDINATOR_ID);
    await expectAsyncThrows(action, `User ${COORDINATOR_ID} is not an admin`);
  });

  test("Coordinator does not have permissions for hospital throws exception", async () => {
    await createCoordinator(Hospital.ICHILOV);
    await createAppointment(AppointmentStatus.COMPLETED);

    const action = () => callFunction(COORDINATOR_ID);
    await expectAsyncThrows(
      action,
      "Coordinator has no permissions for hospital"
    );
  });

  test("Appointment is not booked throws exception", async () => {
    await createCoordinator(HOSPITAL);
    await createAppointment(AppointmentStatus.AVAILABLE);

    const action = () => callFunction(COORDINATOR_ID);
    await expectAsyncThrows(action, "Appointment is not booked");
  });

  test("No appointment throws exception", async () => {
    await createCoordinator(HOSPITAL);

    const action = () => callFunction(COORDINATOR_ID);
    await expectAsyncThrows(action, "Unexpected number of appointments");
  });

  test("Real donor is valid", async () => {
    await createCoordinator(HOSPITAL);
    const donor = await createDonor();
    await createAppointment(AppointmentStatus.COMPLETED);

    const res = await callFunction(COORDINATOR_ID);
    expect(res.bookedAppointment.appointmentId).toEqual(APPOINTMENT_ID);
    expect(res.bookedAppointment.donorId).toEqual(DONOR_ID);
    expect(res.bookedAppointment.donationStartTimeMillis).toEqual(TIME);
    expect(res.bookedAppointment.bookingTimeMillis).toEqual(TIME);
    expect(res.bookedAppointment.hospital).toEqual(HOSPITAL);
    expect(res.bookedAppointment.firstName).toEqual(donor.firstName);
    expect(res.bookedAppointment.lastName).toEqual(donor.lastName);
    expect(res.bookedAppointment.phone).toEqual(donor.phone);
    expect(res.bookedAppointment.bloodType).toEqual(donor.bloodType);
    expect(res.bookedAppointment.status).toEqual(AppointmentStatus.COMPLETED);
  });

  test("Manual donor is valid", async () => {
    await createCoordinator(HOSPITAL);
    await createAppointment(AppointmentStatus.COMPLETED, {
      phoneNumber: "manualPhone",
      firstName: "manualFirst",
      lastName: "manualLast",
      bloodType: BloodType.NOT_SURE,
    });

    const res = await callFunction(COORDINATOR_ID);
    expect(res.bookedAppointment.appointmentId).toEqual(APPOINTMENT_ID);
    expect(res.bookedAppointment.donorId).toEqual(MANUAL_DONOR_ID);
    expect(res.bookedAppointment.donationStartTimeMillis).toEqual(TIME);
    expect(res.bookedAppointment.bookingTimeMillis).toEqual(TIME);
    expect(res.bookedAppointment.hospital).toEqual(HOSPITAL);
    expect(res.bookedAppointment.firstName).toEqual("manualFirst");
    expect(res.bookedAppointment.lastName).toEqual("manualLast");
    expect(res.bookedAppointment.phone).toEqual("manualPhone");
    expect(res.bookedAppointment.bloodType).toEqual(BloodType.NOT_SURE);
    expect(res.bookedAppointment.status).toEqual(AppointmentStatus.COMPLETED);
  });

  async function createCoordinator(hospital: Hospital) {
    const coordinator: DbCoordinator = {
      id: COORDINATOR_ID,
      role: CoordinatorRole.HOSPITAL_COORDINATOR,
      hospitals: [hospital],
    };

    await setAdmin(coordinator);
  }

  async function createDonor() {
    const newDonorUser: DbDonor = {
      ...sampleUser,
      id: DONOR_ID,
      firstName: "FIRST",
      lastName: "LAST",
      bloodType: BloodType.AB_MINUS,
      testUser: true,
    };

    await setDonor(newDonorUser);
    return newDonorUser;
  }

  function callFunction(
    userId?: string
  ): Promise<FunctionsApi.GetBookedAppointmentResponse> {
    const request: FunctionsApi.GetBookedAppointmentRequest = {
      appointmentId: APPOINTMENT_ID,
    };

    return wrapped(request, {
      auth: {
        uid: userId,
      },
    });
  }

  async function createAppointment(
    status: AppointmentStatus,
    donorDetails?: MinimalDonorDetailsForAppointment
  ) {
    const appointment: DbAppointment = {
      id: APPOINTMENT_ID,
      creationTime: admin.firestore.Timestamp.fromMillis(TIME),
      creatorUserId: COORDINATOR_ID,
      donationStartTime: admin.firestore.Timestamp.fromMillis(TIME),
      bookingTime: admin.firestore.Timestamp.fromMillis(TIME),
      hospital: HOSPITAL,
      donorId: DONOR_ID,
      status: status || AppointmentStatus.BOOKED,
    };

    if (donorDetails) {
      appointment.donorId = MANUAL_DONOR_ID;
      appointment.donorDetails = donorDetails;
    }

    await setAppointment(appointment);
  }
});
