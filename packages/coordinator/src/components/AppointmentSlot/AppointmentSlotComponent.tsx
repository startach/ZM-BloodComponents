import React from "react";
import styles from "./AppointmentSlotComponent.module.scss";
import { AppointmentSlot } from "../../utils/types";
import AppointmentPreview from "../AppointmentPreview";
import { DateUtils } from "@zm-blood-components/common";

export type AppointmentPreviewProps = {
  appointmentSlot: AppointmentSlot;
  onClickOnAppointment: (appointmentId: string) => void;
  onDeleteAppointment: (appointmentId: string) => void;
  showOnlyAvailableAppointments: boolean;
};

export default function AppointmentSlotComponent({
  onDeleteAppointment,
  onClickOnAppointment,
  appointmentSlot,
  showOnlyAvailableAppointments,
}: AppointmentPreviewProps) {
  let appointments = appointmentSlot.appointments;
  if (showOnlyAvailableAppointments) {
    appointments = appointments.filter((x) => !x.booked);
  }

  if (appointments.length === 0) {
    return null;
  }

  return (
    <div>
      <div className={styles.listHeader}>
        <div className={styles.time}>
          {DateUtils.ToTimeString(appointmentSlot.donationStartTimeMillis)}
        </div>
      </div>

      {appointments.map((appointment, index) => (
        <div
          key={appointment.appointmentId + "." + showOnlyAvailableAppointments}
        >
          <AppointmentPreview
            onDelete={() => onDeleteAppointment(appointment.appointmentId)}
            appointment={appointment}
            onClick={() => onClickOnAppointment(appointment.appointmentId)}
          />

          {index < appointments.length - 1 && (
            <div className={styles.dividerContainer}>
              <div className={styles.divider} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
