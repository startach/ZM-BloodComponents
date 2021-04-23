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
import { DeleteAppointmentPopupData } from "./ManageAppointmentsScreen";
import Chip, { StandardChip } from "../../components/Chip";

export const GetExpandedColumns = (
  setPopupData: (popupData: DeleteAppointmentPopupData) => void
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
      <>
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
      </>
    ),
    colRelativeWidth: 0,
  },
];

export const expandedRowContent = (
  slot: AppointmentSlot,
  setPopupData: (popupData: DeleteAppointmentPopupData) => void
) => {
  return (
    <Table
      rows={slot.appointments.map<CardTableRow<ManagedAppointment>>(
        (managedAppointment) => ({
          rowData: managedAppointment,
        })
      )}
      columns={GetExpandedColumns(setPopupData)}
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
    cellRenderer: ({ appointments }) => {
      const bookedAppointments = appointments.filter((a) => a.booked);
      // alert if booked in the past 24 hours
      const isNewlyBooked = bookedAppointments.find(
        (a) => Date.now() - (a.bookingTimeMillis || 0) < 1000 * 60 * 60 * 24
      );

      return (
        <div style={{ position: "relative" }}>
          <div>{bookedAppointments.length}</div>
          {isNewlyBooked && (
            <div style={{ position: "absolute", left: "-60px", top: 0 }}>
              <Chip
                chipType={StandardChip.New}
                label="חדש"
                width="39px"
                height="22px"
              />
            </div>
          )}
        </div>
      );
    },
  },
];
