import { FunctionsApi } from "@zm-blood-components/common";
import Styles from "./ManageAppointmentsScreen.module.scss";

import Spinner from "../../components/Spinner";
import Popup from "../../components/Popup";
import { useState } from "react";
import {
  expandedRowContent,
  MainColumns,
} from "./ManageAppointmentsTableConfig";
import {
  AppointmentSlot,
  DonationDay,
  ManagedAppointment,
} from "./CoordinatorAppointmentsGrouper";
import {
  GroupTable,
  CardTableRow,
  CardTableRowGroup,
} from "../../components/Table";

export interface AppointmentHour {
  hour: string;
  date: string;
  slots: number;
  booked: number;
  appointments: FunctionsApi.AppointmentApiEntry[];
}

interface ManageAppointmentsScreenProps {
  donationDays: DonationDay[];
  onDeleteAvailableAppointment: (appointmentId: string) => Promise<void>;
  isLoading: boolean;
}

export default function ManageAppointmentsScreen({
  donationDays,
  onDeleteAvailableAppointment,
  isLoading,
}: ManageAppointmentsScreenProps) {
  const [popupData, setPopupData] = useState<{
    isOpen: boolean;
    appointment?: ManagedAppointment;
  }>({ isOpen: false });

  const groups = donationDays.map<CardTableRowGroup<AppointmentSlot>>(
    (day) => ({
      groupLabel: day.day,
      rowsInGroup: day.appointmentSlots.map<CardTableRow<AppointmentSlot>>(
        (slot) => ({
          rowData: slot,
          expandRow: (slot) =>
            expandedRowContent(
              slot,
              setPopupData,
              onDeleteAvailableAppointment
            ),
        })
      ),
    })
  );
  const getPopupTitle = (
    appointment: ManagedAppointment | undefined
  ): string => {
    if (!appointment?.booked) {
      return "התור טרם נתפס";
    }

    return `התור שייך ל${appointment.donorName} במספר ${appointment.donorPhoneNumber}`;
  };
  return (
    <div className={Styles["screen-grey-background"]}>
      <Popup
        buttonApproveText="אישור"
        open={popupData.isOpen}
        titleFirst="האם ברצונך לבטל את התור?"
        titleSecond={getPopupTitle(popupData.appointment)}
        onApproved={() => {
          return onDeleteAvailableAppointment(
            popupData.appointment?.appointmentId || ""
          );
        }}
        onClose={() => setPopupData({ isOpen: false })}
      />
      <GroupTable
        className={Styles["centered-screen"]}
        hasColumnHeaders
        columns={MainColumns}
        groups={groups}
      />
      {isLoading && <Spinner size="4rem" />}
    </div>
  );
}
