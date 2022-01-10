import React from "react";
import styles from "./ScheduleCellComponent.module.scss";
import classNames from "classnames";
import { ScheduleCell } from "../../../utils/types";

export type ScheduleCellComponentProps = {
  cell: ScheduleCell;
};

export default function ScheduleCellComponent({
  cell,
}: ScheduleCellComponentProps) {
  if (cell.appointmentsCount === 0) {
    return (
      <div
        onClick={() => cell.onClick(cell.cellStartTime)}
        className={classNames(styles.scheduleHourSquare, styles.empty)}
      />
    );
  }

  const content = cell.bookedAppointmentsCount + "/" + cell.appointmentsCount;
  const classes = [styles.scheduleHourSquare];

  if (cell.appointmentsCount > cell.bookedAppointmentsCount) {
    classes.push(styles.partiallyBooked);
  } else {
    classes.push(styles.fullyBooked);
  }

  return (
    <div
      onClick={() => cell.onClick(cell.cellStartTime)}
      className={classNames(classes)}
    >
      {content}
    </div>
  );
}
