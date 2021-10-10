import * as Functions from "../index";
import { expectAsyncThrows } from "../testUtils/TestUtils";
import { deleteDonor, getDonor } from "../dal/DonorDataAccessLayer";
import { saveTestDonor } from "../testUtils/TestSamples";
import "../testUtils/FirebaseTestUtils";
import { Request } from "firebase-functions/lib/providers/https";
import * as express from "express";
import * as admin from "firebase-admin";
import { DbAppointment } from "../function-types";
import { AppointmentStatus, Hospital } from "@zm-blood-components/common/src";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";

const DONOR_ID = "CompleteUserId";
const APPOINTMENT_ID = "CompleteAppointmentID";

beforeAll(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_ID]);
});

afterEach(async () => {
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds([APPOINTMENT_ID]);
});

test("No Donor id throws exception", async () => {
  await expectAsyncThrows(() => callTarget("Test", ""), "Invalid donor id");
});

test("No method throws exception", async () => {
  await expectAsyncThrows(
    () => callTarget("", "Donor"),
    "Invalid appointment id"
  );
});

test("Valid request to complete", async () => {
  await saveTestDonor(DONOR_ID);
  await saveAppointment(DONOR_ID);

  await callTarget(APPOINTMENT_ID, DONOR_ID);

  const appointment = await getAppointmentsByIds([APPOINTMENT_ID]);
  expect(appointment[0].status).toEqual(AppointmentStatus.COMPLETED);
});

async function callTarget(appointmentId: string, donorId: string) {
  // @ts-ignore
  const request = {
    query: {
      appointmentId,
      donorId,
    },
  } as Request;

  // @ts-ignore
  const response = {
    send: (x) => expect(x).toEqual("הפגישה סומנה בהצלחה"),
  } as express.Response;

  return Functions.completeAppointmentApiHandler(request, response);
}

async function saveAppointment(donorId: string) {
  const time = admin.firestore.Timestamp.now();
  const appointment: DbAppointment = {
    id: APPOINTMENT_ID,
    creationTime: time,
    creatorUserId: "creatorUserId",
    donationStartTime: time,
    hospital: Hospital.ASAF_HAROFE,
    donorId: donorId,
    bookingTime: time,
    status: AppointmentStatus.BOOKED,
  };

  await setAppointment(appointment);
}
