import { TestSamples } from "@zm-blood-components/common";
import { DbAppointment } from "../function-types";
import { validateCancelAppointment } from "./CancelAppointmentHelper";
import * as admin from "firebase-admin";

const DONOR_ID = "DONOR_ID";

function APPOINTMENT_TO_CANCEL(donorId: string): DbAppointment {
  return {
    ...TestSamples.SampleBookedAppointment,
    creationTime: admin.firestore.Timestamp.now(),
    creatorUserId: "",
    donationStartTime: admin.firestore.Timestamp.now(),
    donorId,
  };
}

describe("Cancel Appointment Helper", () => {
  test("No appointment to cancel throws exception", () => {
    const action = () => validateCancelAppointment(undefined, DONOR_ID);

    expect(action).toThrow("Appointment Undefined");
  });

  test("No provided donorId throws exception", () => {
    const action = () =>
      validateCancelAppointment(APPOINTMENT_TO_CANCEL(DONOR_ID), "");

    expect(action).toThrow("Appointment to be deleted is not booked by donor");
  });

  test("No donorId in appointment throws exception", () => {
    const action = () =>
      validateCancelAppointment(APPOINTMENT_TO_CANCEL(""), DONOR_ID);

    expect(action).toThrow("Appointment to be deleted is not booked by donor");
  });

  test("Valid cancellation returns void", () => {
    const action = () =>
      validateCancelAppointment(APPOINTMENT_TO_CANCEL(DONOR_ID), DONOR_ID);

    expect(action).not.toThrow();
  });
});
