import React from "react";
import styles from "./AppointmentSlotList.module.scss";
import { AppointmentSlot } from "../../utils/types";
import AppointmentPreview from "../AppointmentPreview";
import { DateUtils } from "@zm-blood-components/common";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

export type AppointmentPreviewProps = {
  appointmentSlot: AppointmentSlot;
  onClickOnAppointment: (appointmentId: string) => void;
  onAdd: () => void;
};

export default function AppointmentSlotList({
  onClickOnAppointment,
  onAdd,
  appointmentSlot,
}: AppointmentPreviewProps) {
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

      {appointmentSlot.appointments.map((appointment, index) => (
        <div>
          <AppointmentPreview
            key={appointment.appointmentId}
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
