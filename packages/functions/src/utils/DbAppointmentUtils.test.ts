import {
  AppointmentStatus,
  BookingChange,
  Hospital,
} from "@zm-blood-components/common";
import admin from "firebase-admin";
import * as DbAppointmentUtils from "../utils/DbAppointmentUtils";
import { DbAppointment } from "../function-types";

describe("DbAppointment Utils", () => {
  test("removeDonorFromDbAppointment", () => {
    const bookedAppointment: DbAppointment = {
      id: "id",
      donorId: "donorId",
      hospital: Hospital.BEILINSON,
      bookingTime: admin.firestore.Timestamp.fromMillis(1122334455),
      donationStartTime: admin.firestore.Timestamp.fromMillis(1122558899),
      creatorUserId: "creatorUserId",
      confirmationTime: admin.firestore.Timestamp.now(),
      creationTime: admin.firestore.Timestamp.now(),
    };

    const res = DbAppointmentUtils.removeDonorFromDbAppointment(
      bookedAppointment
    );

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

  test("completeArrivedFromDbAppointment", () => {
    const startTime = new Date().getTime();
    const bookedAppointment: DbAppointment = {
      id: "id",
      donorId: "donorId",
      hospital: Hospital.BEILINSON,
      bookingTime: admin.firestore.Timestamp.fromMillis(1122334455),
      donationStartTime: admin.firestore.Timestamp.fromMillis(1122558899),
      creatorUserId: "creatorUserId",
      confirmationTime: admin.firestore.Timestamp.now(),
      creationTime: admin.firestore.Timestamp.now(),
    };

    const res = DbAppointmentUtils.completeArrivedFromDbAppointment(
      bookedAppointment
    );

    expect(res.id).toEqual(bookedAppointment.id);
    expect(res.creatorUserId).toEqual(bookedAppointment.creatorUserId);
    expect(res.hospital).toEqual(bookedAppointment.hospital);
    expect(res.donationStartTime).toEqual(bookedAppointment.donationStartTime);
    expect(res.creationTime).toEqual(bookedAppointment.creationTime);
    expect(res.donorId).toEqual(bookedAppointment.donorId);
    expect(res.bookingTime).toEqual(bookedAppointment.bookingTime);
    expect(res.confirmationTime!.toMillis()).toBeGreaterThanOrEqual(startTime);
    expect(res.confirmationTime!.toMillis()).toBeLessThan(startTime + 10_000);

    expect(res.status).toEqual(AppointmentStatus.COMPLETED);
    expect(res.lastChangeType).toEqual(BookingChange.COMPLETED);
    expect(Date.now() - res.lastChangeTime?.toMillis()!).toBeLessThan(3_000);
  });
});
