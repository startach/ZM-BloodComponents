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
  onDeleteAppointment: (appointmentId: string) => Promise<void>;
  onRemoveDonor: (appointmentId: string) => Promise<void>;
  isLoading: boolean;
}

export interface DeleteAppointmentPopupData {
  isOpen: boolean;
  appointment?: ManagedAppointment;
  onlyRemoveDonor: boolean;
}

export default function ManageAppointmentsScreen({
  donationDays,
  onDeleteAppointment,
  onRemoveDonor,
  isLoading,
}: ManageAppointmentsScreenProps) {
  const [popupData, setPopupData] = useState<DeleteAppointmentPopupData>({
    isOpen: false,
    onlyRemoveDonor: false,
  });

  const groups = donationDays.map<CardTableRowGroup<AppointmentSlot>>(
    (day) => ({
      groupLabel: day.day,
      rowsInGroup: day.appointmentSlots.map<CardTableRow<AppointmentSlot>>(
        (slot) => ({
          rowData: slot,
          expandRow: (slot) => expandedRowContent(slot, setPopupData),
        })
      ),
    })
  );

  const getPopupTitle = (): string => {
    if (popupData.onlyRemoveDonor) {
      return "האם ברצונך להסיר את התורם מהתור?";
    }

    return "האם ברצונך לבטל את התור?";
  };

  const getPopupSecondTitle = (): string => {
    if (!popupData.appointment?.booked) {
      return "התור טרם נתפס";
    }

    return `התור שייך ל${popupData.appointment.donorName} במספר ${popupData.appointment.donorPhoneNumber}`;
  };

  const onPopupApprove = () => {
    const appointmentId = popupData.appointment?.appointmentId;
    if (!appointmentId) {
      console.warn("No appointment id set");
      return Promise.resolve();
    }

    if (popupData.onlyRemoveDonor) {
      return onRemoveDonor(appointmentId);
    }

    return onDeleteAppointment(appointmentId);
  };

  return (
    <div className={Styles["screen-grey-background"]}>
      <Popup
        buttonApproveText="אישור"
        open={popupData.isOpen}
        titleFirst={getPopupTitle()}
        titleSecond={getPopupSecondTitle()}
        onApproved={onPopupApprove}
        onClose={() => setPopupData({ isOpen: false, onlyRemoveDonor: false })}
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
