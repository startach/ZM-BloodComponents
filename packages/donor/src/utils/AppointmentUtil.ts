import { AvailableAppointment } from "@zm-blood-components/common";
import { DateComparer, ToDateString } from "./DateUtil";

export enum SortingOrder {
  asc = "asc",
  desc = "desc",
}

type AppointmentsGroup = {
  date: string;
  appointments: AvailableAppointment[];
};

export function groupAndSortAvailableAppointments(
  appointments: AvailableAppointment[],
  appointmentsSortingOrder?: SortingOrder,
  groupsSortingOrder?: SortingOrder
): AppointmentsGroup[] {
  //clone and sort the appointments ( as sort modifies the original object)
  const sortedAppointments = sortAvailableAppointmentsByDate(
    [...appointments],
    appointmentsSortingOrder
  );
  let res = groupAppointmentsByDate(sortedAppointments);
  res = sortAppointmentGroupsByDate(res, groupsSortingOrder);
  return res;
}

function groupAppointmentsByDate(
  appointments: AvailableAppointment[]
): AppointmentsGroup[] {
  const AppointmentsSet = new Map<string, AvailableAppointment[]>();

  //go over the list of appointments and sort them by date
  appointments.forEach((entry) => {
    const appointmentDate = ToDateString(entry.donationStartTime);

    const sameDayAppointments = AppointmentsSet.get(appointmentDate);

    if (sameDayAppointments) sameDayAppointments.push(entry);
    else AppointmentsSet.set(appointmentDate, [entry]);
  });

  //turn the Map back to an Array and sort the entries by Date
  return Array.from(AppointmentsSet, (group) => ({
    date: group[0],
    appointments: group[1],
  }));
}

function sortAppointmentGroupsByDate(
  groups: AppointmentsGroup[],
  order: SortingOrder = SortingOrder.asc
) {
  //sort by dates in a descending order
  // - sorting by the map key requires converting the key back to a date because values are not in a consistent structure (example: 1/12/2020 and 14/2/2020)
  // - because of that, i'm sorting the data based on the first appointment entry
  groups.sort((a, b) => {
    if (order === SortingOrder.asc)
      return DateComparer(
        a.appointments[0].donationStartTime,
        b.appointments[0].donationStartTime
      );
    return DateComparer(
      b.appointments[0].donationStartTime,
      a.appointments[0].donationStartTime
    );
  });

  return groups;
}

function sortAvailableAppointmentsByDate(
  appointments: AvailableAppointment[],
  order: SortingOrder = SortingOrder.asc
) {
  //sort the entries on each of
  return appointments.sort((a, b) => {
    if (order === SortingOrder.asc)
      return DateComparer(a.donationStartTime, b.donationStartTime);
    return DateComparer(b.donationStartTime, a.donationStartTime);
  });
}

export function getHospitalsList(appointments: AvailableAppointment[]) {
  const uniqueEntries = new Set(appointments.map((x) => x.hospital));
  return Array.from(uniqueEntries.values());
}