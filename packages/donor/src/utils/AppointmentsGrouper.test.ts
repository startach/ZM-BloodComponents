import {
  AvailableAppointment,
  DateUtils,
  Hospital,
} from "@zm-blood-components/common";
import * as AppointmentUtil from "./AppointmentsGrouper";

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

  // Result should have 3 days
  expect(res).toHaveLength(3);

  // Sunday 28/03/2021
  const sunday = res[0];
  expect(sunday.day).toEqual(DateUtils.ToDateString(new Date(2021, 1, 28)));
  // Sunday should have only 1 hospital
  expect(sunday.hospitalSlots).toHaveLength(1);
  const sundaySlots = sunday.hospitalSlots[0];
  expect(getAppointmentIdArrays(sundaySlots)).toEqual([
    ["28/2.12.30.1.TEL_HASHOMER"],
    ["28/2.13.30.1.TEL_HASHOMER"],
  ]);

  // Tuesday 02/03/2021
  const tuesday = res[1];
  expect(tuesday.day).toEqual(DateUtils.ToDateString(new Date(2021, 2, 2)));
  // Tuesday should have 2 hospital
  expect(tuesday.hospitalSlots).toHaveLength(2);

  const tuesdayTelHashomer = tuesday.hospitalSlots.filter(
    (x) => x.hospital === Hospital.TEL_HASHOMER
  )[0];
  expect(getAppointmentIdArrays(tuesdayTelHashomer)).toEqual([
    [
      "2/3.10.30.1.TEL_HASHOMER",
      "2/3.10.30.2.TEL_HASHOMER",
      "2/3.10.30.3.TEL_HASHOMER",
    ],
    ["2/3.11.30.1.TEL_HASHOMER", "2/3.11.30.2.TEL_HASHOMER"],
  ]);

  const tuesdayAsafHarofe = tuesday.hospitalSlots.filter(
    (x) => x.hospital === Hospital.ASAF_HAROFE
  )[0];
  expect(getAppointmentIdArrays(tuesdayAsafHarofe)).toEqual([
    ["2/3.11.30.1.ASAF_HAROFE", "2/3.11.30.2.ASAF_HAROFE"],
  ]);

  // Wednesday 01/03/2021
  const wednesday = res[2];
  expect(wednesday.day).toEqual(DateUtils.ToDateString(new Date(2021, 2, 3)));
  // Sunday should have only 1 hospital
  expect(sunday.hospitalSlots).toHaveLength(1);
  const wednesdaySlots = wednesday.hospitalSlots[0];
  expect(getAppointmentIdArrays(wednesdaySlots)).toEqual([
    ["3/3.12.45.1.TEL_HASHOMER"],
  ]);
});

function getAppointmentIdArrays(
  hospitalDaySlots: AppointmentUtil.HospitalDaySlots
) {
  return hospitalDaySlots.slots.map((slot) => slot.appointmentIds.sort());
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
