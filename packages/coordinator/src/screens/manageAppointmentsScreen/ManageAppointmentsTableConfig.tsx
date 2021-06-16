import {
  BookingChange,
  DateUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
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

const GetExpandedColumns = (
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  onRemoveDonor: (appointmentId: string) => Promise<void>,
  onDeleteAppointment: (appointmentId: string) => Promise<void>,
  showOnlyRecentChanges: boolean
): CardTableColumn<ManagedAppointment>[] => [
  {
    label: "שם מלא",
    cellRenderer: ({ donorName }) => donorName,
    hideIfNoData: true,
  },
  {
    label: "סוג דם",
    cellRenderer: ({ bloodType }) =>
      bloodType ? LocaleUtils.getBloodTypeTranslation(bloodType) : null,
    hideIfNoData: true,
  },
  {
    label: "טלפון",
    cellRenderer: ({ donorPhoneNumber }) =>
      donorPhoneNumber && (
        <div className={Styles["phone-cell"]}>
          {donorPhoneNumber.slice(0, 3) + "-" + donorPhoneNumber.slice(3)}
        </div>
      ),
    hideIfNoData: true,
  },
  {
    label: "נקבע בתאריך",
    cellRenderer: ({ booked, bookingTimeMillis }) => {
      let bookingDate = "אין רישום";
      if (booked && bookingTimeMillis) {
        bookingDate = DateUtils.ToDateString(bookingTimeMillis);
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
    cellRenderer: (appointment) => {
      if (appointment.isPastAppointment) {
        return null;
      }

      const buttons: {
        tooltip: string;
        icon: Icon;
        onClick: () => void;
      }[] = [];

      if (appointment.booked) {
        buttons.push({
          tooltip: "הסר תורם",
          icon: Icon.Clear,
          onClick: () =>
            setPopupData({
              isOpen: true,
              appointment,
              title: "האם ברצונך להסיר את התורם מהתור?",
              content: `התור שייך ל${appointment.donorName} במספר ${appointment.donorPhoneNumber}`,
              onApproved: () => onRemoveDonor(appointment.appointmentId),
            }),
        });
      }

      buttons.push({
        tooltip: "מחק תור",
        icon: Icon.Delete,
        onClick: () =>
          setPopupData({
            isOpen: true,
            appointment,
            title: "האם ברצונך לבטל את התור?",
            content: "התור טרם נתפס",
            onApproved: () => onDeleteAppointment(appointment.appointmentId),
          }),
      });

      return (
        <div>
          {buttons.map((button) => (
            <IconButton
              key={button.tooltip}
              icon={button.icon}
              tooltipText={button.tooltip}
              onClick={button.onClick}
            />
          ))}
        </div>
      );
    },
    colRelativeWidth: 0,
  },
];

export const AppointmentTableExpandedRowContent = (
  slot: AppointmentSlot,
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  onRemoveDonor: (appointmentId: string) => Promise<void>,
  onDeleteAppointment: (appointmentId: string) => Promise<void>,
  showOnlyRecentChanges: boolean
) => {
  return (
    <Table
      rows={slot.appointments.map<CardTableRow<ManagedAppointment>>(
        (managedAppointment) => ({
          rowData: managedAppointment,
        })
      )}
      columns={GetExpandedColumns(
        setPopupData,
        onRemoveDonor,
        onDeleteAppointment,
        showOnlyRecentChanges
      )}
      tableIndex={1}
      hasColumnHeaders
    />
  );
};

export const MainAppointmentTableColumns = (
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
