import { DbAppointment } from "../function-types";
import {
  validateBookAppointment,
  ValidBookAppointment,
  ValidBookAppointmentResponse,
} from "./BookAppointmentHelper";
import * as admin from "firebase-admin";
import {
  AppointmentStatus,
  BloodType,
  Hospital,
  MANUAL_DONOR_ID,
  FunctionsApi,
  MinimalDonorDetailsForAppointment,
} from "@zm-blood-components/common";

const DONOR_ID = "DONOR_ID";

let TEST_START_TIMESTAMP: FirebaseFirestore.Timestamp;

beforeAll(() => {
  TEST_START_TIMESTAMP = admin.firestore.Timestamp.now();
});

function APPOINTMENT_TO_BOOK(status: AppointmentStatus): DbAppointment {
  return {
    creationTime: TEST_START_TIMESTAMP,
    creatorUserId: "",
    donationStartTime: TEST_START_TIMESTAMP,
    hospital: Hospital.ASAF_HAROFE,
    status,
    donorId: "",
  };
}

describe("Book Appointment Helper", () => {
  test("No appointment to book throws exception", () => {
    const action = () => validateBookAppointment([], "");
    expect(action).toThrow("No such appointments");
  });

  test("No available appointment to book returns NO_AVAILABLE_APPOINTMENTS", () => {
    const nonAvailableAppointments = [
      APPOINTMENT_TO_BOOK(AppointmentStatus.BOOKED),
      APPOINTMENT_TO_BOOK(AppointmentStatus.COMPLETED),
      APPOINTMENT_TO_BOOK(AppointmentStatus.CONFIRMED),
      APPOINTMENT_TO_BOOK(AppointmentStatus.NOSHOW),
    ];

    const data = validateBookAppointment(nonAvailableAppointments, "");

    expect(data.status).toEqual(
      FunctionsApi.BookAppointmentStatus.NO_AVAILABLE_APPOINTMENTS
    );
    expect(data).not.toHaveProperty("appointment");
  });

  test("No donor details returns DONOR_DETAILS_REQUIRED", () => {
    const data = validateBookAppointment(
      [APPOINTMENT_TO_BOOK(AppointmentStatus.AVAILABLE)],
      MANUAL_DONOR_ID,
      DONOR_ID,
      undefined
    );

    expect(data.status).toEqual(
      FunctionsApi.BookAppointmentStatus.DONOR_DETAILS_REQUIRED
    );
    expect(data).not.toHaveProperty("appointment");
  });

  test("Valid request with existing donor validates booking", () => {
    const appointments = [
      APPOINTMENT_TO_BOOK(AppointmentStatus.BOOKED),
      APPOINTMENT_TO_BOOK(AppointmentStatus.COMPLETED),
      APPOINTMENT_TO_BOOK(AppointmentStatus.CONFIRMED),
      APPOINTMENT_TO_BOOK(AppointmentStatus.NOSHOW),
      APPOINTMENT_TO_BOOK(AppointmentStatus.AVAILABLE),
    ];

    const res = validateBookAppointment(
      appointments,
      DONOR_ID,
      DONOR_ID,
      undefined
    );
    const data = res as ValidBookAppointment;

    expect(data.status).toEqual(FunctionsApi.BookAppointmentStatus.SUCCESS);
    expect(data.appointment).toEqual(
      APPOINTMENT_TO_BOOK(AppointmentStatus.AVAILABLE)
    );
  });

  test("Valid request with manual donor validates booking", () => {
    const minimalDonorDetailsForAppointment: MinimalDonorDetailsForAppointment =
      {
        firstName: "a",
        lastName: "b",
        phoneNumber: "050",
        bloodType: BloodType.AB_MINUS,
      };

    const res = validateBookAppointment(
      [APPOINTMENT_TO_BOOK(AppointmentStatus.AVAILABLE)],
      DONOR_ID,
      DONOR_ID,
      minimalDonorDetailsForAppointment
    );

    const data = res as ValidBookAppointment;

    expect(data.status).toEqual(FunctionsApi.BookAppointmentStatus.SUCCESS);
    expect(data.appointment).toEqual(
      APPOINTMENT_TO_BOOK(AppointmentStatus.AVAILABLE)
    );
  });
});
