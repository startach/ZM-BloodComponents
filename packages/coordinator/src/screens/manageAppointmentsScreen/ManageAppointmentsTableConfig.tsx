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
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  hasOnlyNewChanges: boolean
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
    cellRenderer: ({ booked, bookingTimeMillis, recentChangeType }) => {
      let bookingDate = "אין רישום";
      if (booked && bookingTimeMillis) {
        bookingDate =
          "נקבע בתאריך " + DateUtils.ToDateString(bookingTimeMillis);
      }

      return (
        <div className={Styles["relative-div"]}>
          <div>{bookingDate}</div>
          {!hasOnlyNewChanges && (recentChangeType || recentChangeType === 0) && (
            <div
              style={{
                position: "absolute",
                left: "30px",
                top: "10px",
              }}
            >
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
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  hasOnlyNewChanges: boolean
) => {
  return (
    <Table
      rows={slot.appointments.map<CardTableRow<ManagedAppointment>>(
        (managedAppointment) => ({
          rowData: managedAppointment,
        })
      )}
      columns={GetExpandedColumns(setPopupData, hasOnlyNewChanges)}
      tableIndex={1}
    />
  );
};

export const MainColumns = (
  hasOnlyNewChanges: boolean
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
    cellRenderer: ({ appointments }) => (
      <div className={Styles["relative-div"]}>
        <div>{appointments.filter((a) => a.booked).length}</div>
        {!hasOnlyNewChanges &&
          appointments.find(
            (a) => a.recentChangeType || a.recentChangeType === 0
          ) && (
            <div
              style={{
                position: "absolute",
                left: "-60px",
                top: 0,
              }}
            >
              <Chip
                chipType={StandardChip.New}
                label="חדש"
                width="39px"
                height="22px"
              />
            </div>
          )}
      </div>
    ),
  },
];
