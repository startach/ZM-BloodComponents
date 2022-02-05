import React from "react";
import styles from "./AppointmentSlotComponent.module.scss";
import { AppointmentSlot } from "../../utils/types";
import AppointmentPreview from "../AppointmentPreview";
import { DateUtils } from "@zm-blood-components/common";

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

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.time}>
          {DateUtils.ToTimeString(appointmentSlot.donationStartTimeMillis)}
        </div>
      </div>

      {appointments.map((appointment, index) => (
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
