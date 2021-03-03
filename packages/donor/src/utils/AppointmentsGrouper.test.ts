import {
  AvailableAppointment,
  Hospital,
  DateUtils,
} from "@zm-blood-components/common";
import * as AppointmentUtil from "./AppointmentsGrouper";
import { DonationSlot } from "./AppointmentsGrouper";

test("groupAndSortAvailableAppointments", () => {
  const appointments = [
    // Tel Hashomer, 02/03/2021 at 11:30
    createAppointment(Hospital.TEL_HASHOMER, 2, 2, 11, 30, 1),
    createAppointment(Hospital.TEL_HASHOMER, 2, 2, 11, 30, 2),

    // Tel Hashomer, 03/03/2021 at 12:45
    createAppointment(Hospital.TEL_HASHOMER, 3, 2, 12, 45, 1),

    // Tel Hashomer, 01/03/2021 at 12:30
    createAppointment(Hospital.TEL_HASHOMER, 28, 1, 12, 30, 1),

    // Tel Hashomer, 02/03/2021 at 10:30 (1)
    createAppointment(Hospital.TEL_HASHOMER, 2, 2, 10, 30, 1),

    // Asaf Harofe, 02/03/2021 at 11:30
    createAppointment(Hospital.ASAF_HAROFE, 2, 2, 11, 30, 2),
    createAppointment(Hospital.ASAF_HAROFE, 2, 2, 11, 30, 1),

    // Tel Hashomer, 02/03/2021 at 10:30 (2)
    createAppointment(Hospital.TEL_HASHOMER, 28, 1, 13, 30, 1),

    // Tel Hashomer, 01/03/2021 at 13:30
    createAppointment(Hospital.TEL_HASHOMER, 2, 2, 10, 30, 2),

    // Tel Hashomer, 02/03/2021 at 10:30 (3)
    createAppointment(Hospital.TEL_HASHOMER, 2, 2, 10, 30, 3),
  ];

  const res = AppointmentUtil.groupDonationDays(appointments);

  expect(res).toHaveLength(3);

  // Sunday 28/03/2021
  expect(res[0].day).toEqual(DateUtils.ToDateString(new Date(2021, 1, 28)));
  const sundaySlots = res[0].donationSlots;
  expect(getAppointmentIdArrays(sundaySlots)).toEqual([
    ["28/2.12.30.1.TEL_HASHOMER"],
    ["28/2.13.30.1.TEL_HASHOMER"],
  ]);

  // Tuesday 02/03/2021
  expect(res[1].day).toEqual(DateUtils.ToDateString(new Date(2021, 2, 2)));
  const tuesdaySlots = res[1].donationSlots;
  expect(getAppointmentIdArrays(tuesdaySlots)).toEqual([
    [
      "2/3.10.30.1.TEL_HASHOMER",
      "2/3.10.30.2.TEL_HASHOMER",
      "2/3.10.30.3.TEL_HASHOMER",
    ],
    ["2/3.11.30.1.TEL_HASHOMER", "2/3.11.30.2.TEL_HASHOMER"],
    ["2/3.11.30.1.ASAF_HAROFE", "2/3.11.30.2.ASAF_HAROFE"],
  ]);

  // Wednesday 01/03/2021
  expect(res[2].day).toEqual(DateUtils.ToDateString(new Date(2021, 2, 3)));
  const wednesdaySlots = res[2].donationSlots;
  expect(getAppointmentIdArrays(wednesdaySlots)).toEqual([
    ["3/3.12.45.1.TEL_HASHOMER"],
  ]);
});

function getAppointmentIdArrays(slots: DonationSlot[]) {
  return slots.map((slot) => slot.appointmentIds.sort());
}

function createAppointment(
  hospital: Hospital,
  day: number,
  month: number,
  hour: number,
  minute: number,
  slotNumber: number
): AvailableAppointment {
  const date = new Date(2021, month, day, hour, minute);

  return {
    hospital: hospital,
    id: `${day}/${month + 1}.${hour}.${minute}.${slotNumber}.${hospital}`,
    donationStartTimeMillis: date.getTime(),
  };
}
