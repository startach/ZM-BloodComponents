import React from "react";
import styles from "./ScheduleWeekComponent.module.scss";
import { ScheduleWeek } from "../../../utils/types";
import ScheduleDayComponent from "../ScheduleDay";

export type ScheduleWeekComponentProps = {
  week: ScheduleWeek;
};

export default function ScheduleWeekComponent(
  props: ScheduleWeekComponentProps
) {
  return (
    <div className={styles.scheduleWeek}>
      {props.week.days.map((day, index) => (
        <div
          className={styles.dayWrapper}
          key={"day." + index + day.cells[0]?.cellStartTime.getTime()}
        >
          <ScheduleDayComponent day={day} />
        </div>
      ))}
    </div>
  );
}
