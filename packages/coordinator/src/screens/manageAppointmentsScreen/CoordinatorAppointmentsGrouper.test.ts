import {
  BloodType,
  Donor,
  FunctionsApi,
  Hospital,
} from "@zm-blood-components/common";
import { groupAppointmentDays } from "./CoordinatorAppointmentsGrouper";

test("grouping of appointments", () => {
  const appointments: FunctionsApi.AppointmentApiEntry[] = [
    createAppointment("ap.1/2.12:20.1", 1, 2, 12, 20),
    createAppointment("ap.2/1.14:45.1", 2, 1, 14, 45),
    createAppointment("ap.2/1.13:30.1", 2, 1, 13, 30),
    createAppointment("ap.2/1.14:45.2", 2, 1, 14, 45),
    createAppointment("ap.1/2.12:20.2", 1, 2, 12, 20),
    createAppointment("ap.2/1.14:45.3", 2, 1, 14, 45),
    createAppointment("ap.2/1.13:30.2", 2, 1, 13, 30),
  ];
  const donorsInAppointments: Donor[] = [];

  // Fill data manually

  const donationDays = groupAppointmentDays(appointments, donorsInAppointments);

  // Assert
  expect(donationDays).toHaveLength(2);
  expect(donationDays[0].day).toEqual("02/01/2021");
  const slotsInDay = donationDays[0].appointmentSlots;
  expect(slotsInDay).toHaveLength(2);
  expect(slotsInDay[0].appointments).toHaveLength(2);
  expect(slotsInDay[1].appointments).toHaveLength(3);

  expect(slotsInDay[0].appointments[0].appointmentId).toEqual("ap.2/1.13:30.1");
  expect(slotsInDay[0].appointments[1].appointmentId).toEqual("ap.2/1.13:30.2");

  expect(slotsInDay[1].appointments[0].appointmentId).toEqual("ap.2/1.14:45.1");
  expect(slotsInDay[1].appointments[1].appointmentId).toEqual("ap.2/1.14:45.2");
  expect(slotsInDay[1].appointments[2].appointmentId).toEqual("ap.2/1.14:45.3");

  expect(donationDays[1].day).toEqual("01/02/2021");
  const slotsInDay2 = donationDays[1].appointmentSlots;
  expect(slotsInDay2).toHaveLength(1);
  expect(slotsInDay2[0].appointments).toHaveLength(2);

  expect(slotsInDay2[0].appointments[0].appointmentId).toEqual(
    "ap.1/2.12:20.1"
  );
  expect(slotsInDay2[0].appointments[1].appointmentId).toEqual(
    "ap.1/2.12:20.2"
  );
});

test("donor details are set in appointments", () => {
  const appointments: FunctionsApi.AppointmentApiEntry[] = [
    createAppointment("ap.2/1.14:45.1", 2, 1, 14, 45),
    createAppointment("ap.1/1.12:20.1", 1, 1, 12, 20),
  ];
  // Set donor in the second appointment
  appointments[1].donorId = "DONOR_ID";
  appointments[1].bookingTimeMillis = 1616837400000; //  Saturday, March 27, 2021 12:30:00 GMT+03:00

  const donorsInAppointments: Donor[] = [
    {
      id: "DONOR_ID",
      firstName: "first",
      lastName: "last",
      bloodType: BloodType.AB_MINUS,
      email: "email",
      phone: "phone",
      birthDate: "13/12/2000",
    },
  ];

  const donationDays = groupAppointmentDays(appointments, donorsInAppointments);

  // Assert
  expect(donationDays).toHaveLength(2);
  expect(donationDays[0].day).toEqual("01/01/2021");
  expect(donationDays[0].appointmentSlots).toHaveLength(1);
  const time1 = donationDays[0].appointmentSlots[0];
  expect(time1.appointments).toHaveLength(1);
  const slot1 = time1.appointments[0];
  expect(slot1.appointmentId).toEqual("ap.1/1.12:20.1");
  expect(slot1.booked).toBeTruthy();
  expect(slot1.donorName).toEqual("first last");
  expect(slot1.donorPhoneNumber).toEqual("phone");
  expect(slot1.bookingTimeMillis).toEqual(1616837400000);

  expect(donationDays[1].day).toEqual("02/01/2021");
  expect(donationDays[1].appointmentSlots).toHaveLength(1);
  const time2 = donationDays[1].appointmentSlots[0];
  expect(time2.appointments).toHaveLength(1);
  const slot2 = time2.appointments[0];
  expect(slot2.appointmentId).toEqual("ap.2/1.14:45.1");
  expect(slot2.booked).toBeFalsy();
  expect(slot2.donorName).toBeUndefined();
  expect(slot2.donorPhoneNumber).toBeUndefined();
  expect(slot2.bookingTimeMillis).toBeUndefined();
});

test("donor of appointment is missing", () => {
  const appointments: FunctionsApi.AppointmentApiEntry[] = [
    createAppointment("ap.1/1.12:20.1", 1, 1, 12, 20),
  ];
  // Set donor in the second appointment
  appointments[0].donorId = "DONOR_ID";
  appointments[0].bookingTimeMillis = 1616837400000; //  Saturday, March 27, 2021 12:30:00 GMT+03:00

  const donorsInAppointments: Donor[] = [];

  const donationDays = groupAppointmentDays(appointments, donorsInAppointments);

  // Assert
  expect(donationDays).toHaveLength(1);
  expect(donationDays[0].day).toEqual("01/01/2021");
  expect(donationDays[0].appointmentSlots).toHaveLength(1);
  const time1 = donationDays[0].appointmentSlots[0];
  expect(time1.appointments).toHaveLength(1);
  const slot1 = time1.appointments[0];
  expect(slot1.appointmentId).toEqual("ap.1/1.12:20.1");
  expect(slot1.booked).toBeTruthy();
  expect(slot1.donorName).toBeUndefined();
  expect(slot1.donorPhoneNumber).toBeUndefined();
  expect(slot1.bookingTimeMillis).toEqual(1616837400000);
});

function createAppointment(
  id: string,
  day: number,
  month: number,
  hour: number,
  minute: number
): FunctionsApi.AppointmentApiEntry {
  const date = new Date(2021, month - 1, day, hour, minute);

  return {
    id: id,
    donorId: "",
    bookingTimeMillis: undefined,
    hospital: Hospital.BEILINSON,
    donationStartTimeMillis: date.getTime(),
  };
}
