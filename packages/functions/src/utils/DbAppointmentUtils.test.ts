import {
  AppointmentStatus,
  BookingChange,
  Hospital,
  MANUAL_DONOR_ID,
  TestSamples,
} from "@zm-blood-components/common";
import admin from "firebase-admin";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { DbAppointment, DbDonor } from "../function-types";
import {
  SampleAvailableDbAppointment,
  SampleBookedDbAppointment,
  sampleUser,
} from "../testUtils/TestSamples";
import { expectThrows } from "../testUtils/TestUtils";

const APPOINTMENT_ID = "appointmentId";
const CREATOR_ID = "CREATOR_ID";
const COORDINATOR_ID = "COORDINATOR_ID";
const START_TIME = 1644055135000;

describe("DbAppointment Utils", () => {
  test("removeDonorFromDbAppointment", () => {
    const bookedAppointment: DbAppointment = {
      id: "id",
      donorId: "donorId",
      hospital: Hospital.BEILINSON,
      bookingTime: admin.firestore.Timestamp.fromMillis(1122334455),
      donationStartTime: admin.firestore.Timestamp.fromMillis(1122558899),
      creatorUserId: CREATOR_ID,
      confirmationTime: admin.firestore.Timestamp.now(),
      creationTime: admin.firestore.Timestamp.now(),
      status: AppointmentStatus.AVAILABLE,
    };

    const res =
      DbAppointmentUtils.removeDonorFromDbAppointment(bookedAppointment);

    expect(res.id).toEqual(bookedAppointment.id);
    expect(res.creatorUserId).toEqual(bookedAppointment.creatorUserId);
    expect(res.hospital).toEqual(bookedAppointment.hospital);
    expect(res.donationStartTime).toEqual(bookedAppointment.donationStartTime);
    expect(res.creationTime).toEqual(bookedAppointment.creationTime);

    expect(res.donorId).toEqual("");
    expect(res.bookingTime).toBeUndefined();
    expect(res.confirmationTime).toBeUndefined();

    expect(res.status).toEqual(AppointmentStatus.AVAILABLE);
    expect(res.lastChangeType).toEqual(BookingChange.CANCELLED);
    expect(Date.now() - res.lastChangeTime?.toMillis()!).toBeLessThan(3_000);
  });

  test.each([true, false])(
    "completeArrivedFromDbAppointment - isNoShow: %s",
    (isNoShow) => {
      const startTime = new Date().getTime();
      const bookedAppointment: DbAppointment = {
        id: "id",
        donorId: "donorId",
        hospital: Hospital.BEILINSON,
        bookingTime: admin.firestore.Timestamp.fromMillis(1122334455),
        donationStartTime: admin.firestore.Timestamp.fromMillis(1122558899),
        creatorUserId: CREATOR_ID,
        confirmationTime: admin.firestore.Timestamp.now(),
        creationTime: admin.firestore.Timestamp.now(),
        status: AppointmentStatus.COMPLETED,
      };

      const res = DbAppointmentUtils.completeArrivedFromDbAppointment(
        bookedAppointment,
        isNoShow
      );

      expect(res.id).toEqual(bookedAppointment.id);
      expect(res.creatorUserId).toEqual(bookedAppointment.creatorUserId);
      expect(res.hospital).toEqual(bookedAppointment.hospital);
      expect(res.donationStartTime).toEqual(
        bookedAppointment.donationStartTime
      );
      expect(res.creationTime).toEqual(bookedAppointment.creationTime);
      expect(res.donorId).toEqual(bookedAppointment.donorId);
      expect(res.bookingTime).toEqual(bookedAppointment.bookingTime);
      expect(res.confirmationTime!.toMillis()).toBeGreaterThanOrEqual(
        startTime
      );
      expect(res.confirmationTime!.toMillis()).toBeLessThan(startTime + 10_000);

      expect(res.status).toEqual(
        isNoShow ? AppointmentStatus.NOSHOW : AppointmentStatus.COMPLETED
      );
      expect(res.lastChangeType).toEqual(
        isNoShow ? BookingChange.NOSHOW : BookingChange.COMPLETED
      );
      expect(Date.now() - res.lastChangeTime?.toMillis()!).toBeLessThan(3_000);
    }
  );

  test("toAvailableAppointment - valid", () => {
    const appointment: DbAppointment = {
      ...SampleAvailableDbAppointment,
      id: APPOINTMENT_ID,
      donationStartTime: admin.firestore.Timestamp.fromMillis(START_TIME),
    };

    const res = DbAppointmentUtils.toAvailableAppointment(appointment);

    expect(res.id).toEqual(APPOINTMENT_ID);
    expect(res.booked).toBeFalsy();
    expect(res.status).toEqual(AppointmentStatus.AVAILABLE);
    expect(res.hospital).toEqual(SampleAvailableDbAppointment.hospital);
    expect(res.donationStartTimeMillis).toEqual(START_TIME);
  });

  test("toAvailableAppointment - no id", () => {
    const appointment: DbAppointment = {
      ...SampleAvailableDbAppointment,
    };

    expectThrows(
      () => DbAppointmentUtils.toAvailableAppointment(appointment),
      "Invalid Available Appointment"
    );
  });

  test("toAvailableAppointment - donorId present", () => {
    const appointment: DbAppointment = {
      ...SampleAvailableDbAppointment,
      id: APPOINTMENT_ID,
      donorId: "donorId",
    };

    expectThrows(
      () => DbAppointmentUtils.toAvailableAppointment(appointment),
      "Invalid Available Appointment"
    );
  });

  test("toAvailableAppointment - Invalid status", () => {
    const appointment: DbAppointment = {
      ...SampleAvailableDbAppointment,
      id: APPOINTMENT_ID,
      status: AppointmentStatus.COMPLETED,
    };

    expectThrows(
      () => DbAppointmentUtils.toAvailableAppointment(appointment),
      "Invalid Available Appointment"
    );
  });

  test("toBookedAppointmentSync - Manual Donor", () => {
    const appointment: DbAppointment = {
      ...SampleBookedDbAppointment,
      id: APPOINTMENT_ID,
      donorId: MANUAL_DONOR_ID,
      creatorUserId: CREATOR_ID,
      assigningCoordinatorId: COORDINATOR_ID,
      donorDetails: TestSamples.SampleManualDonorDetails,
      status: AppointmentStatus.BOOKED,
      donationStartTime: admin.firestore.Timestamp.fromMillis(START_TIME),
    };

    const res = DbAppointmentUtils.toBookedAppointmentSync(
      appointment,
      () => null!
    );

    expect(res.id).toEqual(APPOINTMENT_ID);
    expect(res.donationStartTimeMillis).toEqual(START_TIME);
    expect(res.hospital).toEqual(SampleAvailableDbAppointment.hospital);
    expect(res.status).toEqual(AppointmentStatus.BOOKED);
    expect(res.booked).toBeTruthy();
    expect(res.donorId).toEqual(MANUAL_DONOR_ID);
    expect(res.firstName).toEqual(
      TestSamples.SampleManualDonorDetails.firstName
    );
    expect(res.lastName).toEqual(TestSamples.SampleManualDonorDetails.lastName);
    expect(res.fullName).toEqual(
      TestSamples.SampleManualDonorDetails.firstName +
        " " +
        TestSamples.SampleManualDonorDetails.lastName
    );
    expect(res.phone).toEqual(TestSamples.SampleManualDonorDetails.phoneNumber);
    expect(res.bloodType).toEqual(
      TestSamples.SampleManualDonorDetails.bloodType
    );
    expect(res.assigningCoordinatorId).toEqual(COORDINATOR_ID);
  });

  test("toBookedAppointmentSync - Real Donor", () => {
    const donorId = "donorId";
    const appointment: DbAppointment = {
      ...SampleBookedDbAppointment,
      id: APPOINTMENT_ID,
      donationStartTime: admin.firestore.Timestamp.fromMillis(START_TIME),
      donorId: donorId,
      creatorUserId: CREATOR_ID,
      status: AppointmentStatus.COMPLETED,
    };

    const donor: DbDonor = {
      ...sampleUser,
      id: donorId,
    };

    const res = DbAppointmentUtils.toBookedAppointmentSync(
      appointment,
      () => donor
    );

    expect(res.id).toEqual(APPOINTMENT_ID);
    expect(res.donationStartTimeMillis).toEqual(START_TIME);
    expect(res.bookingTimeMillis).toEqual(
      SampleBookedDbAppointment.bookingTime!.toMillis()
    );
    expect(res.hospital).toEqual(SampleAvailableDbAppointment.hospital);
    expect(res.status).toEqual(AppointmentStatus.COMPLETED);
    expect(res.booked).toBeTruthy();
    expect(res.donorId).toEqual(donorId);
    expect(res.firstName).toEqual(sampleUser.firstName);
    expect(res.lastName).toEqual(sampleUser.lastName);
    expect(res.fullName).toEqual(
      sampleUser.firstName + " " + sampleUser.lastName
    );
    expect(res.phone).toEqual(sampleUser.phone);
    expect(res.bloodType).toEqual(sampleUser.bloodType);
    expect(res.assigningCoordinatorId).toBeUndefined();
  });
});
