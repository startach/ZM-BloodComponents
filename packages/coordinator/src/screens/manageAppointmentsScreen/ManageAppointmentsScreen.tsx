import { DateUtils, Donor, FunctionsApi } from "@zm-blood-components/common";
import Styles from "./ManageAppointmentsScreen.module.scss";
import TableOfCards, {
  CardTableColumn,
  CardTableGroup,
  CardTableRow,
  ColumnPositions,
} from "../../components/CardTable";
import dayjs from "dayjs";

interface ManageAppointmentsScreenProps {
  appointments: FunctionsApi.AppointmentApiEntry[];
  donors: Donor[];
  onDeleteAvailableAppointment: (appointmentId: string) => void;
}

export default function ManageAppointmentsScreen({
  appointments,
  donors,
  onDeleteAvailableAppointment,
}: ManageAppointmentsScreenProps) {
  interface AppointmentHour {
    hour: string;
    date: string;
    slots: number;
    booked: number;
    appointments: FunctionsApi.AppointmentApiEntry[];
  }

  let appointmentHours: AppointmentHour[] = [];

  appointments.forEach((appointment) => {
    const foundHourIndex: number = appointmentHours.findIndex(
      (appointmentHour) =>
        appointmentHour.date ===
          DateUtils.ToDateString(appointment.donationStartTimeMillis) &&
        appointmentHour.hour ===
          DateUtils.ToHourString(appointment.donationStartTimeMillis)
    );

    if (foundHourIndex !== -1) {
      const nextHour = appointmentHours[foundHourIndex];
      nextHour.slots++;
      if (appointment.donorId) nextHour.booked++;
      nextHour.appointments.push(appointment);
    } else {
      appointmentHours.push({
        hour: DateUtils.ToHourString(appointment.donationStartTimeMillis),
        date: DateUtils.ToDateString(appointment.donationStartTimeMillis),
        slots: 1,
        booked: appointment.donorId ? 1 : 0,
        appointments: [appointment],
      });
    }
  });

  const getDonor = (donorId?: string) => {
    if (!donorId) {
      return undefined;
    }

    const foundDonors = donors.filter((donor) => donor.id === donorId);
    if (foundDonors.length !== 1) {
      console.error("Unexpected number of donors:", donors.length);
      return undefined;
    }

    return foundDonors[0];
  };

  const expandedRow = (appointmentHour: AppointmentHour) => {
    type BookingDetails = {
      name?: string;
      phone?: string;
      hasConfirmedArrival: boolean;
      date: string;
    };

    let expandedRows: CardTableRow<BookingDetails>[] = appointmentHour.appointments.map(
      (appointment) => {
        const donor: Donor | undefined = getDonor(appointment.donorId);
        let bookingDetails: BookingDetails = {
          hasConfirmedArrival: false,
          date: appointmentHour.date,
        };
        if (donor) {
          bookingDetails = {
            ...bookingDetails,
            name: `${donor.lastName}, ${donor.firstName}`,
            phone: donor.phone,
          };
        }
        return {
          rowSummary: bookingDetails,
        };
      }
    );

    const expandedColumns: CardTableColumn<AppointmentHour>[] = [
      {
        cellRenderer: ({ name }) => name,
        isCollapsable: true,
      },
      {
        cellRenderer: ({ phone }) =>
          phone && (
            <div className={Styles["phone-cell"]}>
              {phone.slice(0, 3) + "-" + phone.slice(3)}
            </div>
          ),
        isCollapsable: true,
      },
      {
        cellRenderer: ({ date }) => date,
      },
      {
        cellRenderer: ({ name, phone, hasConfirmedArrival }) =>
          !name && !phone
            ? "אין רישום"
            : hasConfirmedArrival
            ? "הגעה אושרה"
            : "אין אישור הגעה",
      },
    ];

    return (
      <TableOfCards
        rows={expandedRows}
        columns={expandedColumns}
        columnPositions={ColumnPositions.justify}
      />
    );
  };

  const rows: CardTableRow<AppointmentHour>[] = appointmentHours.map(
    (appointmentHour) => {
      return {
        rowSummary: appointmentHour,
        expandedRow: expandedRow(appointmentHour),
      };
    }
  );

  const tableColumns: CardTableColumn<AppointmentHour>[] = [
    {
      label: "שעה",
      sortBy: (a, b) =>
        Number(a.rowSummary.hour) < Number(b.rowSummary.hour) ? -1 : 1,
      cellRenderer: ({ hour }) => `${hour}:00`,
    },
    {
      label: "מקום",
      sortBy: (a, b) => (a.rowSummary.slots > b.rowSummary.slots ? -1 : 1),
      cellRenderer: ({ slots }) => slots,
    },
    {
      label: "רשומים",
      sortBy: (a, b) => (a.rowSummary.booked > b.rowSummary.booked ? -1 : 1),
      cellRenderer: ({ booked }) => booked,
    },
  ];

  const groupByDay: CardTableGroup<AppointmentHour> = {
    label: (group: CardTableRow<AppointmentHour>[]) =>
      `${DateUtils.ToWeekDayString(group[0].rowSummary.date, "DD/MM/YYYY")}, ${
        group[0].rowSummary.date
      }`,
    isInGroup: (
      group: CardTableRow<AppointmentHour>[],
      item: AppointmentHour
    ) => group[0].rowSummary.date === item.date,
    sortGroupsBy: (
      a: CardTableRow<AppointmentHour>[],
      b: CardTableRow<AppointmentHour>[]
    ) =>
      dayjs(a[0].rowSummary.date).diff(dayjs(b[0].rowSummary.date)) < 0
        ? -1
        : 1,
  };

  return (
    <div className={Styles["screen-grey-background"]}>
      <TableOfCards
        className={Styles["centered-screen"]}
        hasColumnHeaders
        rows={rows}
        columns={tableColumns}
        groupBy={groupByDay}
      />
    </div>
  );
}
