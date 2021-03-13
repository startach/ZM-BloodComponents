import { FunctionsApi } from "@zm-blood-components/common";
import Styles from "./ManageAppointmentsScreen.module.scss";

import Spinner from "../../components/Spinner";
import Popup from "../../components/Popup";
import React, { useState } from "react";
import {
  expandedRowContent,
  MainColumns,
} from "./ManageAppointmentsTableConfig";
import { AppointmentSlot, DonationDay } from "./CoordinatorAppointmentsGrouper";
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

export type BookingDetails = {
  name?: string;
  phone?: string;
  hasDonor?: boolean;
  hasConfirmedArrival?: boolean;
  date?: string;
  bookingId: string;
};
interface ManageAppointmentsScreenProps {
  donationDays: DonationDay[];
  onDeleteAvailableAppointment: (appointmentId: string) => void;
  isLoading: boolean;
}

export default function ManageAppointmentsScreen({
  donationDays,
  onDeleteAvailableAppointment,
  isLoading,
}: ManageAppointmentsScreenProps) {
  const [popupData, setPopupData] = useState<{
    isOpen: boolean;
    name?: string;
    phone?: string;
    bookingId?: string;
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

  return (
    <div className={Styles["screen-grey-background"]}>
      <Popup
        buttonApproveText="אישור"
        open={popupData.isOpen}
        titleFirst="האם ברצונך לבטל את התור?"
        titleSecond={`התור שייך ל${popupData.name} במספר ${popupData.phone}`}
        onApproved={() =>
          popupData.bookingId &&
          onDeleteAvailableAppointment(popupData.bookingId)
        }
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
