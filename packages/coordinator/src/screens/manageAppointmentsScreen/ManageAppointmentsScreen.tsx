import { DateUtils, Donor, FunctionsApi } from "@zm-blood-components/common";
import Styles from "./ManageAppointmentsScreen.module.scss";
import CardTable from "../../components/CardTable";

import Spinner from "../../components/Spinner";
import Popup from "../../components/Popup";
import { useState } from "react";
import {
  GetMainRows,
  MainColumns,
  GroupByDay,
} from "./ManageAppointmentsTableConfig";

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
  appointments: FunctionsApi.AppointmentApiEntry[];
  donors: Donor[];
  onDeleteAvailableAppointment: (appointmentId: string) => void;
  isLoading: boolean;
}

export default function ManageAppointmentsScreen({
  appointments,
  donors,
  onDeleteAvailableAppointment,
  isLoading,
}: ManageAppointmentsScreenProps) {
  const [popupData, setPopupData] = useState<{
    isOpen: boolean;
    name?: string;
    phone?: string;
    bookingId?: string;
  }>({ isOpen: false });
  interface AppointmentHour {
    hour: string;
    date: string;
    slots: number;
    booked: number;
    appointments: FunctionsApi.AppointmentApiEntry[];
  }

  let appointmentHours: AppointmentHour[] = [];

  appointments.forEach((appointment) => {
    const foundHourIndex: number = appointmentHours.findIndex(
      (appointmentHour) =>
        appointmentHour.date ===
          DateUtils.ToDateString(appointment.donationStartTimeMillis) &&
        appointmentHour.hour ===
          DateUtils.ToHourString(appointment.donationStartTimeMillis)
    );

    if (foundHourIndex !== -1) {
      const nextHour = appointmentHours[foundHourIndex];
      nextHour.slots++;
      if (appointment.donorId) nextHour.booked++;
      nextHour.appointments.push(appointment);
    } else {
      appointmentHours.push({
        hour: DateUtils.ToHourString(appointment.donationStartTimeMillis),
        date: DateUtils.ToDateString(appointment.donationStartTimeMillis),
        slots: 1,
        booked: appointment.donorId ? 1 : 0,
        appointments: [appointment],
      });
    }
  });

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
      <CardTable
        className={Styles["centered-screen"]}
        hasColumnHeaders
        rows={GetMainRows(
          appointmentHours,
          donors,
          setPopupData,
          onDeleteAvailableAppointment
        )}
        columns={MainColumns}
        groupBy={GroupByDay}
      />
      {isLoading && <Spinner size="4rem" />}
    </div>
  );
}
