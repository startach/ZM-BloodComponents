import React from "react";
import styles from "./AppointmentPreview.module.scss";
import { Appointment } from "../../utils/types";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as AddPerson } from "../../assets/icons/add-person.svg";
import RecentUpdateChip from "../RecentUpdateChip";
import classNames from "classnames";

export type AppointmentPreviewProps = {
  appointment: Appointment;
  onClick: () => void;
};

export default function AppointmentPreview({
  onClick,
  appointment,
}: AppointmentPreviewProps) {
  if (appointment.booked) {
    return (
      <div
        className={classNames(
          styles.appointmentPreviewContainer,
          appointment.appointmentId
        )}
        onClick={onClick}
      >
        <div className={styles.appointmentPreviewContent}>
          <div className={styles.nameAndChip}>
            <div className={styles.donorName}>{appointment.donorName}</div>
            {appointment.recentChangeType && (
              <RecentUpdateChip
                recentChangeType={appointment.recentChangeType}
              />
            )}
          </div>
          <ChevronLeft />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appointmentPreviewContainer} onClick={onClick}>
      <div className={styles.appointmentPreviewContent}>
        <div className={styles.nameAndChip}>
          <div className={styles.availableAppointmentText}>תור ריק</div>
          {appointment.recentChangeType && (
            <RecentUpdateChip recentChangeType={appointment.recentChangeType} />
          )}
        </div>
        <AddPerson />
      </div>
    </div>
  );
}
