import React from "react";
import styles from "./AppointmentSlotComponent.module.scss";
import { AppointmentSlot } from "../../utils/types";
import AppointmentPreview from "../AppointmentPreview";
import { DateUtils } from "@zm-blood-components/common";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

export type AppointmentPreviewProps = {
  appointmentSlot: AppointmentSlot;
  onClickOnAppointment: (appointmentId: string) => void;
  onAdd: () => void;
  showOnlyAvailableAppointments: boolean;
};

export default function AppointmentSlotComponent({
  onClickOnAppointment,
  onAdd,
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
    <div className={styles.appointmentSlotListContainer}>
      <div className={styles.listHeader}>
        <div className={styles.time}>
          {DateUtils.ToTimeString(appointmentSlot.donationStartTimeMillis)}
        </div>

        <div className={styles.add} onClick={onAdd}>
          <AddIcon />
        </div>
      </div>

      {appointments.map((appointment, index) => (
        <div key={appointment.appointmentId}>
          <AppointmentPreview
            appointment={appointment}
            onClick={() => onClickOnAppointment(appointment.appointmentId)}
          />

          {index < appointmentSlot.appointments.length - 1 && (
            <div className={styles.dividerContainer}>
              <div className={styles.divider} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
