import React from "react";
import styles from "./AppointmentStatusChip.module.scss";
import { AppointmentStatus, LocaleUtils } from "@zm-blood-components/common";
import classNames from "classnames";
import { getStatusTranslation } from "@zm-blood-components/common/src/LocaleUtils";

export type AppointmentStatusChipProps = {
  appointmentStatusType: AppointmentStatus;
};

export default function AppointmentStatusChip({
  appointmentStatusType,
}: AppointmentStatusChipProps) {
  const classes = [styles.appointmentStatusChip];
  classes.push(getColors(appointmentStatusType));

  return (
    <div className={styles.appointmentStatusChipContainer}>
      <div className={classNames(classes)}>
        {LocaleUtils.getStatusTranslation(appointmentStatusType)}
      </div>
    </div>
  );
}

function getColors(appointmentStatusType: AppointmentStatus) {
  switch (appointmentStatusType) {
    case AppointmentStatus.AVAILABLE:
    case AppointmentStatus.CONFIRMED:
    case AppointmentStatus.COMPLETED:
    case AppointmentStatus.BOOKED:
      return styles.greenChip;
    case AppointmentStatus.NOSHOW:
      return styles.redChip;
  }

  return "";
}
