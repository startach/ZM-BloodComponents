import * as admin from "firebase-admin";
import * as Functions from "../index";
import {
  AppointmentStatus,
  BookingChange,
  FunctionsApi,
  Hospital
} from "@zm-blood-components/common/src";
import { DbAppointment, DbDonor } from "../function-types";
import {
  deleteAppointmentsByIds,
  getAppointmentsByIds,
  setAppointment
} from "../dal/AppointmentDataAccessLayer";
import { deleteDonor, setDonor } from "../dal/DonorDataAccessLayer";
import { sampleUser } from "../testUtils/TestSamples";
import { mocked } from "ts-jest/utils";
import {
  NotificationToDonor,
  sendEmailToDonor
} from "../notifications/NotificationSender";
import { SendConfirmationReminders } from "./CronJobs";
import firebaseFunctionsTest from "../testUtils/FirebaseTestUtils";

const wrapped = firebaseFunctionsTest.wrap(
  Functions[FunctionsApi.BookAppointmentFunctionName]
);

jest.mock("../notifications/NotificationSender");
const mockedNotifier = mocked(sendEmailToDonor);

const DONORS = [
  "SendConfirmationBookedDonorId",
  "SendConfirmationAvailableDonorId",
  "SendConfirmationOutOfRangeDonorId"
];
const APPOINTMENTS = [
  "SendConfirmationBookedAppointment",
  "SendConfirmationAvailableAppointment",
  "SendConfirmationOutOfRangeAppointment"
];

const reset = async () => {
  for (let i = 0; i < DONORS.length; i++) {
    await deleteDonor(DONORS[i]);
  }
  await deleteAppointmentsByIds(APPOINTMENTS);
};

beforeAll(async () => {
  await reset();
});

afterEach(async () => {
  await reset();
});

test("run on all appointments", async () => {
  await createDonor(DONORS[0]);
  await createDonor(DONORS[1]);
  await createDonor(DONORS[2]);
  const now = new Date(2021, 3, 8, 14, 23);
  const lastHour = new Date(now);
  lastHour.setHours(lastHour.getHours());
  await saveAppointment(
    DONORS[0],
    APPOINTMENTS[0],
    AppointmentStatus.BOOKED,
    admin.firestore.Timestamp.fromDate(lastHour)
  );

  await saveAppointment(
    DONORS[1],
    APPOINTMENTS[1],
    AppointmentStatus.AVAILABLE,
    admin.firestore.Timestamp.fromDate(lastHour)
  );
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  await saveAppointment(
    DONORS[2],
    APPOINTMENTS[2],
    AppointmentStatus.BOOKED,
    admin.firestore.Timestamp.fromDate(yesterday)
  );
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours()+1)
  nextHour.setMinutes(0)
  const start = new Date(nextHour);
  const end = new Date(nextHour);

  end.setMinutes(0);
  end.setSeconds(0);
  end.setMilliseconds(0);
  start.setHours(start.getHours() - 1);
  start.setMinutes(0);
  start.setSeconds(0);
  start.setMilliseconds(0);

  await SendConfirmationReminders(
    new Date(start),
    new Date(end)
  );
  expect(mockedNotifier).toHaveBeenCalledTimes(1);
  expect(mockedNotifier).toHaveBeenCalledWith(
    NotificationToDonor.DONATION_CONFIRMATION,
    expect.objectContaining({
      appointmentId: APPOINTMENTS[0]
    }),
    expect.objectContaining({
      id: DONORS[0]
    })
  );
});

async function saveAppointment(
  donorId: string,
  appointmentId: string,
  status: AppointmentStatus,
  time: FirebaseFirestore.Timestamp
) {
  const appointment: DbAppointment = {
    id: appointmentId,
    creationTime: time,
    creatorUserId: "creatorUserId",
    donationStartTime: time,
    hospital: Hospital.ASAF_HAROFE,
    donorId: donorId,
    bookingTime: time,
    status: status,
    lastChangeType: BookingChange.BOOKED
  };

  await setAppointment(appointment);
}

async function createDonor(donorId: string) {
  const donor: DbDonor = {
    id: donorId,
    ...sampleUser,
    firstName: "firstName",
    email: "email@email.com"
  };

  await setDonor(donor);
}
