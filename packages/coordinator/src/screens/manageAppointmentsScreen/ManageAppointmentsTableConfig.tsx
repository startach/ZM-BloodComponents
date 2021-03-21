import { DateUtils } from "@zm-blood-components/common";
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

export const GetExpandedColumns = (
  setPopupData: (popupData: {
    isOpen: boolean;
    appointment?: ManagedAppointment;
  }) => void,
  onDeleteAvailableAppointment: (bookingId: string) => void
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
      if (!booked || !bookingTimeMillis) {
        return "אין רישום";
      }
      return "נקבע בתאריך " + DateUtils.ToDateString(bookingTimeMillis);
    },
  },
  {
    cellRenderer: (appointment) => (
      <IconButton
        aria-label="delete"
        icon={Icon.Delete}
        color={"primary"}
        onClick={() =>
          appointment.booked
            ? setPopupData({
                isOpen: true,
                appointment,
              })
            : onDeleteAvailableAppointment(appointment.appointmentId)
        }
      />
    ),
    colRelativeWidth: 0,
  },
];

export const expandedRowContent = (
  slot: AppointmentSlot,
  setPopupData: (popupData: {
    isOpen: boolean;
    appointment?: ManagedAppointment;
  }) => void,
  onDeleteAvailableAppointment: (bookingId: string) => void
) => {
  return (
    <Table
      rows={slot.appointments.map<CardTableRow<ManagedAppointment>>(
        (managedAppointment) => ({
          rowData: managedAppointment,
        })
      )}
      columns={GetExpandedColumns(setPopupData, onDeleteAvailableAppointment)}
    />
  );
};

export const MainColumns: CardTableColumn<AppointmentSlot>[] = [
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
];
