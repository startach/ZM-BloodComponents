import { BookingChange, DateUtils } from "@zm-blood-components/common";
import {
  CardTableColumn,
  CardTableRow,
} from "coordinator/src/components/Table";
import Styles from "./ManageAppointmentsScreen.module.scss";
import { Icon, IconButton } from "../../components/IconButton";
import Table from "../../components/Table";
import {
  AppointmentSlot,
  ManagedAppointment,
} from "./CoordinatorAppointmentsGrouper";
import { DeleteAppointmentPopupData } from "./ManageAppointmentsScreen";
import Chip, { ChipColorScheme } from "../../components/Chip";

export const GetExpandedColumns = (
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  showOnlyRecentChanges: boolean
): CardTableColumn<ManagedAppointment>[] => [
  {
    cellRenderer: ({ donorName }) => donorName,
    hideIfNoData: true,
  },
  {
    cellRenderer: ({ donorPhoneNumber }) =>
      donorPhoneNumber && (
        <div className={Styles["phone-cell"]}>
          {donorPhoneNumber.slice(0, 3) + "-" + donorPhoneNumber.slice(3)}
        </div>
      ),
    hideIfNoData: true,
  },
  {
    cellRenderer: ({ booked, bookingTimeMillis }) => {
      let bookingDate = "אין רישום";
      if (booked && bookingTimeMillis) {
        bookingDate =
          "נקבע בתאריך " + DateUtils.ToDateString(bookingTimeMillis);
      }
      return <div className={Styles["booked-at-date"]}>{bookingDate}</div>;
    },
  },
  {
    cellRenderer: ({ recentChangeType }) => {
      const chipLabel =
        recentChangeType === BookingChange.CANCELLED ? "בוטל" : "נקבע";
      return (
        !showOnlyRecentChanges &&
        (recentChangeType || recentChangeType === 0) && (
          <Chip colorScheme={ChipColorScheme.New} label={chipLabel} />
        )
      );
    },
    colRelativeWidth: 0.3,
  },
  {
    cellRenderer: (appointment) =>
      !appointment.isPastAppointment && (
        <div>
          {appointment.booked && (
            <IconButton
              aria-label="clear"
              icon={Icon.Clear}
              color={"default"}
              tooltipText={"הסר תורם"}
              onClick={() =>
                setPopupData({
                  isOpen: true,
                  appointment,
                  onlyRemoveDonor: true,
                })
              }
            />
          )}
          <IconButton
            aria-label="delete"
            icon={Icon.Delete}
            color={"default"}
            tooltipText={"מחק תור"}
            onClick={() =>
              setPopupData({
                isOpen: true,
                appointment,
                onlyRemoveDonor: false,
              })
            }
          />
        </div>
      ),
    colRelativeWidth: 0,
  },
];

export const expandedRowContent = (
  slot: AppointmentSlot,
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  showOnlyRecentChanges: boolean
) => {
  return (
    <Table
      rows={slot.appointments.map<CardTableRow<ManagedAppointment>>(
        (managedAppointment) => ({
          rowData: managedAppointment,
        })
      )}
      columns={GetExpandedColumns(setPopupData, showOnlyRecentChanges)}
      tableIndex={1}
    />
  );
};

export const MainColumns = (
  showOnlyRecentChanges: boolean
): CardTableColumn<AppointmentSlot>[] => [
  {
    label: "שעה",
    sortBy: (a, b) => a.donationStartTimeMillis - b.donationStartTimeMillis,
    cellRenderer: ({ donationStartTimeMillis }) =>
      DateUtils.ToTimeString(new Date(donationStartTimeMillis)),
  },
  {
    label: "מספר העמדות",
    cellRenderer: ({ appointments }) => appointments.length,
  },
  {
    label: "רשומים",
    cellRenderer: ({ appointments }) =>
      appointments.filter((a) => a.booked).length,
  },
  {
    cellRenderer: ({ appointments }) => {
      return (
        !showOnlyRecentChanges &&
        appointments.find(
          (a) => a.recentChangeType || a.recentChangeType === 0
        ) && <Chip colorScheme={ChipColorScheme.New} label="חדש" />
      );
    },
    colRelativeWidth: 0.3,
  },
];
