import { AvailableAppointment, Hospital } from "@zm-blood-components/common";
import * as AppointmentUtil from "./AppointmentUtil1";
import { ToDateString } from "./DateUtil";

test("groupAndSortAvailableAppointments", () => {
  const appointments = [
    createAppointment(2, 11, 30),
    createAppointment(3, 12, 30),
    createAppointment(2, 12, 30),
    createAppointment(1, 13, 30),
    createAppointment(2, 13, 30),
    createAppointment(1, 12, 30),
  ];

  const res = AppointmentUtil.groupAndSortAvailableAppointments(appointments);

  expect(res).toHaveLength(3);
  expect(res[0].date).toEqual(ToDateString(new Date(2021, 2, 1)));
  expect(res[0].appointments).toHaveLength(2);
  expect(res[0].appointments[0].id).toEqual("1.12.30");
  expect(res[0].appointments[1].id).toEqual("1.13.30");

  expect(res[1].date).toEqual(ToDateString(new Date(2021, 2, 2)));
  expect(res[1].appointments).toHaveLength(3);
  expect(res[1].appointments[0].id).toEqual("2.11.30");
  expect(res[1].appointments[1].id).toEqual("2.12.30");
  expect(res[1].appointments[2].id).toEqual("2.13.30");

  expect(res[2].date).toEqual(ToDateString(new Date(2021, 2, 3)));
  expect(res[2].appointments).toHaveLength(1);
  expect(res[2].appointments[0].id).toEqual("3.12.30");
});

function createAppointment(
  day: number,
  hour: number,
  minute: number
): AvailableAppointment {
  const date = new Date(2021, 2, day, hour, minute);

  return {
    hospital: Hospital.TEL_HASHOMER,
    id: `${day}.${hour}.${minute}`,
    donationStartTime: date,
  };
}
