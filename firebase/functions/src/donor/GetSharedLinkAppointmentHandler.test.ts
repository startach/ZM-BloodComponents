import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";
import {
  FunctionsApi,
  Hospital,
  AppointmentStatus,
} from "@zm-blood-components/common";
import * as Functions from "../index";
import {
  deleteAppointmentsByIds,
  setAppointment,
} from "../dal/AppointmentDataAccessLayer";
import * as admin from "firebase-admin";
import { DbAppointment } from "../function-types";
import { saveTestDonor } from "../testUtils/TestSamples";
import { deleteDonor } from "../dal/DonorDataAccessLayer";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.GetSharedLinkAppointmentFunctionName]
);

const CREATING_USER_ID = "GetAvailableAppointmentsHandlerCreatingUserId";
const DONOR_ID = "GetAvailableAppointmentsHandlerDonorId";
const SHARED_DONOR_ID = "SHARED_DONOR_ID"

const SHARE_LINK = "JUST_A_Random_Share_link";

const SHARED_APPOINTMENT = "GetAvailableAppointmentsHandlerAppointment1";
const APPOINTMENT_IN_SAME_TIME = "GetAvailableAppointmentsHandlerAppointment2";
const APPOINTMENT_IN_SAME_TIME_BOOKED = "GetAvailableAppointmentsHandlerAppointment4";
const DIFFRENT_APPOINTMENT = "GetAvailableAppointmentsHandlerAppointment3";


const ALL_TEST_APPOINTMENTS_IDS = [
    SHARED_APPOINTMENT,
    APPOINTMENT_IN_SAME_TIME,
    APPOINTMENT_IN_SAME_TIME_BOOKED,
    DIFFRENT_APPOINTMENT
];

beforeAll(reset);
afterEach(reset);

async function reset() {
  await deleteDonor(SHARED_DONOR_ID);
  await deleteDonor(DONOR_ID);
  await deleteAppointmentsByIds(ALL_TEST_APPOINTMENTS_IDS);
}

async function saveAppointment(
    id: string,
    donationStartTime: Date,
    booked: boolean,
    shared: boolean
  ) {
    const appointment: DbAppointment = {
      id: id,
      creationTime: admin.firestore.Timestamp.fromDate(donationStartTime),
      creatorUserId: CREATING_USER_ID,
      donationStartTime: admin.firestore.Timestamp.fromDate(donationStartTime),
      hospital: Hospital.ASAF_HAROFE,
      donorId: "",
      status: booked ? AppointmentStatus.BOOKED : AppointmentStatus.AVAILABLE,   
    };

    if (shared) {
      appointment.shareLink = SHARE_LINK
    }
  
    if (booked) {
      appointment.donorId = DONOR_ID;
      appointment.bookingTime = admin.firestore.Timestamp.now();
    }
  
    await setAppointment(appointment);
    return appointment;
  }

test("Returns available appointments is ascending start time order", async () => {
  await saveTestDonor(SHARED_DONOR_ID);
  await saveTestDonor(DONOR_ID);

  await saveAppointment(SHARED_APPOINTMENT, new Date(), true, true);
  await saveAppointment(APPOINTMENT_IN_SAME_TIME, new Date(), false, false);

  const appointment = (await callTarget()).appointment

  expect(appointment).not.toBeNaN();
  expect(appointment.id).toEqual(SHARED_APPOINTMENT);
  expect(appointment.shareLink).toEqual(SHARE_LINK);
});

async function callTarget() {
  return (await wrapped({donorId: SHARED_DONOR_ID, shareLink: SHARE_LINK}, {auth: {uid: SHARED_DONOR_ID}})) as FunctionsApi.GetSharedLinkAppointmentResponse;
}

