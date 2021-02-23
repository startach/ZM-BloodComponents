import { AvailableAppointment, Hospital } from "@zm-blood-components/common";
import * as AppointmentUtil from "./AppointmentsGrouper";
import { ToDateString } from "./DateUtil";
import { DonationSlot } from "./AppointmentsGrouper";

test("groupAndSortAvailableAppointments", () => {
  const appointments = [
    // Tel Hashomer, 02/02/2021 at 11:30
    createAppointment(Hospital.TEL_HASHOMER, 2, 11, 30, 1),
    createAppointment(Hospital.TEL_HASHOMER, 2, 11, 30, 2),

    // Tel Hashomer, 03/02/2021 at 12:45
    createAppointment(Hospital.TEL_HASHOMER, 3, 12, 45, 1),

    // Tel Hashomer, 01/02/2021 at 12:30
    createAppointment(Hospital.TEL_HASHOMER, 1, 12, 30, 1),

    // Tel Hashomer, 02/02/2021 at 10:30 (1)
    createAppointment(Hospital.TEL_HASHOMER, 2, 10, 30, 1),

    // Asaf Harofe, 02/02/2021 at 11:30
    createAppointment(Hospital.ASAF_HAROFE, 2, 11, 30, 2),
    createAppointment(Hospital.ASAF_HAROFE, 2, 11, 30, 1),

    // Tel Hashomer, 02/02/2021 at 10:30 (2)
    createAppointment(Hospital.TEL_HASHOMER, 1, 13, 30, 1),

    // Tel Hashomer, 01/02/2021 at 13:30
    createAppointment(Hospital.TEL_HASHOMER, 2, 10, 30, 2),

    // Tel Hashomer, 02/02/2021 at 10:30 (3)
    createAppointment(Hospital.TEL_HASHOMER, 2, 10, 30, 3),
  ];

  const res = AppointmentUtil.groupDonationDays(appointments);

  expect(res).toHaveLength(3);

  // Monday 01/02/2021
  expect(res[0].day).toEqual(ToDateString(new Date(2021, 2, 1)));
  const mondaySlots = res[0].donationSlots;
  expect(getAppointmentIdArrays(mondaySlots)).toEqual([
    ["1.12.30.1.TEL_HASHOMER"],
    ["1.13.30.1.TEL_HASHOMER"],
  ]);

  // Tuesday 02/02/2021
  expect(res[1].day).toEqual(ToDateString(new Date(2021, 2, 2)));
  const tuesdaySlots = res[1].donationSlots;
  expect(getAppointmentIdArrays(tuesdaySlots)).toEqual([
    [
      "2.10.30.1.TEL_HASHOMER",
      "2.10.30.2.TEL_HASHOMER",
      "2.10.30.3.TEL_HASHOMER",
    ],
    ["2.11.30.1.TEL_HASHOMER", "2.11.30.2.TEL_HASHOMER"],
    ["2.11.30.1.ASAF_HAROFE", "2.11.30.2.ASAF_HAROFE"],
  ]);

  // Wednesday 01/02/2021
  expect(res[2].day).toEqual(ToDateString(new Date(2021, 2, 3)));
  const wednesdaySlots = res[2].donationSlots;
  expect(getAppointmentIdArrays(wednesdaySlots)).toEqual([
    ["3.12.45.1.TEL_HASHOMER"],
  ]);
});

function getAppointmentIdArrays(slots: DonationSlot[]) {
  return slots.map((slot) => slot.appointmentIds.sort());
}

function createAppointment(
  hospital: Hospital,
  day: number,
  hour: number,
  minute: number,
  slotNumber: number
): AvailableAppointment {
  const date = new Date(2021, 2, day, hour, minute);

  return {
    hospital: hospital,
    id: `${day}.${hour}.${minute}.${slotNumber}.${hospital}`,
    donationStartTimeMillis: date.getTime(),
  };
}
