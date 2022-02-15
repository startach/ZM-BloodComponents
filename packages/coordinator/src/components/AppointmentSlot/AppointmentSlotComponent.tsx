import React from "react";
import styles from "./AppointmentSlotComponent.module.scss";
import { AppointmentSlot } from "../../utils/types";
import AppointmentPreview from "../AppointmentPreview";
import { DateUtils } from "@zm-blood-components/common";
import _ from "lodash";

export type AppointmentPreviewProps = {
  appointmentSlot: AppointmentSlot;
  onDeleteAppointment: (appointmentId: string) => void;
  showOnlyAvailableAppointments: boolean;
};

export default function AppointmentSlotComponent({
  onDeleteAppointment,
  appointmentSlot,
  showOnlyAvailableAppointments,
}: AppointmentPreviewProps) {
  let appointments = appointmentSlot.appointments;
  if (showOnlyAvailableAppointments) {
    appointments = appointments.filter((x) => !x.booked);
  }

  const sortedAppointments = _.sortBy(appointments, (appointment) => {
    if (appointment.booked && appointment.recentChangeType) return 1;
    if (appointment.booked && !appointment.recentChangeType) return 2;
    if (appointment.recentChangeType) return 3;
    return 4;
  });

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.time}>
          {DateUtils.ToTimeString(appointmentSlot.donationStartTimeMillis)}
        </div>
      </div>

      {sortedAppointments.map((appointment, index) => (
        <div key={appointment.id + "." + showOnlyAvailableAppointments}>
          <AppointmentPreview
            onDelete={() => onDeleteAppointment(appointment.id)}
            appointment={appointment}
            addBottomDivider={index < appointments.length - 1}
          />
        </div>
      ))}
    </div>
  );
}
