import {
  BookingChange,
  DateUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import { CardTableColumn, CardTableRow } from "../../components/V2/Table";
import Styles from "./ManageAppointmentsScreen.module.scss";
import IconButton from "../../components/V2/IconButton";
import Table from "../../components/V2/Table";
import { DeleteAppointmentPopupData } from "./ManageAppointmentsScreen";
import Chip, { ChipColorScheme } from "../../components/V2/Chip";
import userMinusIcon from "../../assets/user-minus.svg";
import trashIcon from "../../assets/trash.svg";
import copyIcon from "../../assets/copy.svg";
import { getAppointmentCopyString } from "./CopyAppointmentDetailsHelper";
import { AppointmentSlot, Appointment } from "../../utils/types";

const GetExpandedColumns = (
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  onRemoveDonor: (appointmentId: string) => Promise<void>,
  onDeleteAppointment: (appointmentId: string) => Promise<void>,
  showOnlyRecentChanges: boolean,
  popupFlashMessageTrigger: (message: string) => void
): CardTableColumn<Appointment>[] => [
  {
    label: "שם מלא",
    cellRenderer: ({ donorName, booked }) => {
      return booked && donorName ? donorName : "אין רישום";
    },
    hideIfNoData: false,
  },
  {
    label: "סוג דם",
    cellRenderer: ({ bloodType }) =>
      bloodType ? LocaleUtils.getBloodTypeTranslation(bloodType) : null,
    hideIfNoData: false,
  },
  {
    label: "טלפון",
    cellRenderer: ({ donorPhoneNumber }) =>
      donorPhoneNumber && (
        <div className={Styles["phone-cell"]}>
          <a href={"tel:" + donorPhoneNumber}>
            {donorPhoneNumber.slice(0, 3) + "-" + donorPhoneNumber.slice(3)}
          </a>
        </div>
      ),
    hideIfNoData: false,
  },
  {
    label: "נקבע בתאריך",
    cellRenderer: ({ booked, bookingTimeMillis }) => {
      let bookingDate = "";
      if (booked && bookingTimeMillis) {
        bookingDate = DateUtils.ToDateString(bookingTimeMillis);
      }
      return <div className={Styles["booked-at-date"]}>{bookingDate}</div>;
    },
  },
  {
    label: "",
    colRelativeWidth: 0,
    cellRenderer: ({ recentChangeType }) => {
      const chipLabel =
        recentChangeType === BookingChange.CANCELLED ? "בוטל" : "חדש";
      return (
        !showOnlyRecentChanges &&
        (recentChangeType || recentChangeType === 0) && (
          <Chip colorScheme={ChipColorScheme.New} label={chipLabel} />
        )
      );
    },
  },
  {
    label: "",
    aditionalCardClass: "buttons-cell",
    colRelativeWidth: 1,
    cellRenderer: (appointment) => {
      if (appointment.isPastAppointment) {
        return null;
      }

      const buttons: {
        tooltip: string;
        iconUrl: string;
        onClick: () => void;
      }[] = [];

      if (appointment.booked) {
        buttons.push({
          tooltip: "העתק",
          iconUrl: copyIcon,
          onClick: () => {
            navigator.clipboard.writeText(
              getAppointmentCopyString(appointment)
            );

            // flash a message to user
            popupFlashMessageTrigger("הפרטים הועתקו בהצלחה");
          },
        });

        buttons.push({
          tooltip: "הסר תורם",
          iconUrl: userMinusIcon,
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
        iconUrl: trashIcon,
        onClick: () =>
          setPopupData({
            isOpen: true,
            appointment,
            title: "האם ברצונך לבטל את התור?",
            content: appointment.booked
              ? `התור שייך ל${appointment.donorName} במספר ${appointment.donorPhoneNumber}`
              : "התור טרם נתפס",
            onApproved: () => onDeleteAppointment(appointment.appointmentId),
          }),
      });

      return (
        <div className={Styles["icons-container"]}>
          {buttons.map((button) => (
            <IconButton
              key={button.tooltip}
              iconUrl={button.iconUrl}
              tooltipText={button.tooltip}
              onClick={button.onClick}
            />
          ))}
        </div>
      );
    },
  },
];

export const AppointmentTableExpandedRowContent = (
  slot: AppointmentSlot,
  setPopupData: (popupData: DeleteAppointmentPopupData) => void,
  onRemoveDonor: (appointmentId: string) => Promise<void>,
  onDeleteAppointment: (appointmentId: string) => Promise<void>,
  showOnlyRecentChanges: boolean,
  popupFlashMessageTrigger: (message: string) => void
) => {
  return (
    <Table
      className={Styles["donation-table"]}
      rows={slot.appointments.map<CardTableRow<Appointment>>(
        (managedAppointment) => ({
          rowData: managedAppointment,
        })
      )}
      columns={GetExpandedColumns(
        setPopupData,
        onRemoveDonor,
        onDeleteAppointment,
        showOnlyRecentChanges,
        popupFlashMessageTrigger
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
    label: "",
    cellRenderer: ({ appointments }) => {
      const visable =
        !showOnlyRecentChanges &&
        appointments.find(
          (a) => a.recentChangeType || a.recentChangeType === 0
        );

      return (
        <div style={{ visibility: visable ? "visible" : "hidden" }}>
          <Chip colorScheme={ChipColorScheme.New} label="חדש" />
        </div>
      );
    },
    colRelativeWidth: 0,
  },
];
