import React from "react";
import styles from "./ScheduleDayComponent.module.scss";
import { ScheduleDay } from "../../../utils/types";
import ScheduleCellComponent from "../ScheduleCell";

export type ScheduleDayComponentProps = {
  day: ScheduleDay;
};

export default function ScheduleDayComponent(props: ScheduleDayComponentProps) {
  return (
    <div className={styles.scheduleDay}>
      {props.day.cells.map((cell, index) => (
        <div
          key={"cell." + index + cell.cellStartTime.getTime()}
          className={styles.cellWrapper}
        >
          <ScheduleCellComponent cell={cell} />
        </div>
      ))}
    </div>
  );
}
