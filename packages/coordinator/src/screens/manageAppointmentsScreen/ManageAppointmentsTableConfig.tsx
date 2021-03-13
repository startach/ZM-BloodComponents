import { DateUtils, Donor } from "@zm-blood-components/common";
import {
  CardTableColumn,
  CardTableGroup,
  CardTableRow,
} from "coordinator/src/components/CardTable";
import { AppointmentHour, BookingDetails } from "./ManageAppointmentsScreen";
import Styles from "./ManageAppointmentsScreen.module.scss";
import { Delete as DeleteIcon } from "@material-ui/icons";
import CardTable from "../../components/CardTable";
import dayjs from "dayjs";
import { IconButton } from "@material-ui/core";

const getDonor = (donors: Donor[], donorId?: string) => {
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

export const GetExpandedRows = (
  appointmentHour: AppointmentHour,
  donors: Donor[]
): CardTableRow<BookingDetails>[] =>
  appointmentHour.appointments.map((appointment) => {
    const donor: Donor | undefined = getDonor(donors, appointment.donorId);
    let bookingDetails: BookingDetails = {
      hasConfirmedArrival: false,
      date: appointmentHour.date,
      bookingId: appointment.id,
      hasDonor: !!donor,
    };
    if (donor) {
      bookingDetails = {
        ...bookingDetails,
        name: `${donor.firstName} ${donor.lastName}`,
        phone: donor.phone,
      };
    }
    return {
      rowSummary: bookingDetails,
    };
  });

export const GetExpandedColumns = (
  setPopupData: (popupData: any) => void,
  onDeleteAvailableAppointment: (bookingId: string) => void
): CardTableColumn<BookingDetails>[] => [
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
    cellRenderer: ({ hasDonor, hasConfirmedArrival }) =>
      !hasDonor
        ? "אין רישום"
        : hasConfirmedArrival
        ? "הגעה אושרה"
        : "אין אישור הגעה",
  },
  {
    cellRenderer: ({ bookingId, name, phone, hasDonor }) => (
      <IconButton
        aria-label="delete"
        onClick={() =>
          hasDonor
            ? setPopupData({ isOpen: true, phone, name, bookingId })
            : onDeleteAvailableAppointment(bookingId)
        }
      >
        <DeleteIcon color="primary" />
      </IconButton>
    ),
    colRelativeWidth: 0,
  },
];

const expandedRowContent = (
  appointmentHour: AppointmentHour,
  donors: Donor[],
  setPopupData: (popupData: any) => void,
  onDeleteAvailableAppointment: (bookingId: string) => void
) => {
  return (
    <CardTable
      rows={GetExpandedRows(appointmentHour, donors)}
      columns={GetExpandedColumns(setPopupData, onDeleteAvailableAppointment)}
    />
  );
};

export const GetMainRows = (
  appointmentHours: AppointmentHour[],
  donors: Donor[],
  setPopupData: (popupData: any) => void,
  onDeleteAvailableAppointment: (bookingId: string) => void
): CardTableRow<AppointmentHour>[] =>
  appointmentHours.map((appointmentHour) => {
    return {
      rowSummary: appointmentHour,
      expandedRow: expandedRowContent(
        appointmentHour,
        donors,
        setPopupData,
        onDeleteAvailableAppointment
      ),
    };
  });

export const MainColumns: CardTableColumn<AppointmentHour>[] = [
  {
    label: "שעה",
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      Number(a.hour) < Number(b.hour) ? -1 : 1,
    cellRenderer: ({ hour }) => `${hour}:00`,
  },
  {
    label: "מקום",
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      a.slots > b.slots ? -1 : 1,
    cellRenderer: ({ slots }) => slots,
  },
  {
    label: "רשומים",
    sortBy: ({ rowSummary: a }, { rowSummary: b }) =>
      a.booked > b.booked ? -1 : 1,
    cellRenderer: ({ booked }) => booked,
  },
];

export const GroupByDay: CardTableGroup<AppointmentHour> = {
  label: (group: CardTableRow<AppointmentHour>[]) =>
    `${DateUtils.ToWeekDayString(group[0].rowSummary.date, "DD/MM/YYYY")}, ${
      group[0].rowSummary.date
    }`,
  isInGroup: (group: CardTableRow<AppointmentHour>[], item: AppointmentHour) =>
    group[0].rowSummary.date === item.date,
  sortGroupsBy: (
    a: CardTableRow<AppointmentHour>[],
    b: CardTableRow<AppointmentHour>[]
  ) =>
    dayjs(a[0].rowSummary.date).diff(dayjs(b[0].rowSummary.date)) < 0 ? -1 : 1,
};
