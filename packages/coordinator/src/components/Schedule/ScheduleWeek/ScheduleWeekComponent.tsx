import React from "react";
import styles from "./ScheduleWeekComponent.module.scss";
import { ScheduleWeek } from "../../../utils/types";
import ScheduleDayComponent from "../ScheduleDay";
import _ from "lodash";
import { ReactComponent as ChevronLeft } from "../../../assets/icons/chevron-left-small.svg";
import { ReactComponent as ChevronRight } from "../../../assets/icons/chevron-right-small.svg";
import { DateUtils } from "@zm-blood-components/common";

export type ScheduleWeekComponentProps = {
  week: ScheduleWeek;
  onNext: () => void;
  onPrevious: () => void;
};

export default function ScheduleWeekComponent(
  props: ScheduleWeekComponentProps
) {
  return (
    <div className={styles.schedule}>
      <ScheduleHeader {...props} />
      <div className={styles.scheduleWeek}>
        <ScheduleTimes />
        {props.week.days.map((day, index) => (
          <div
            className={styles.dayWrapper}
            key={"day." + index + day.cells[0]?.cellStartTime.getTime()}
          >
            <ScheduleDayComponent day={day} />
          </div>
        ))}
        <ScheduleTimes />
      </div>
    </div>
  );
}

function ScheduleHeader(props: ScheduleWeekComponentProps) {
  return (
    <div className={styles.daysRow}>
      <ChevronRight onClick={props.onPrevious} className={styles.chevron} />
      {props.week.days.map((day) => {
        const dayStartTime = day.cells[0].cellStartTime;
        return (
          <div
            key={dayStartTime.toLocaleDateString()}
            className={styles.dayLabel}
          >
            <div className={styles.dayNumber}>{dayStartTime.getDate()}</div>
            <div className={styles.dayLetter}>
              {DateUtils.ToWeekDayLetter(dayStartTime)}
            </div>
          </div>
        );
      })}
      <ChevronLeft onClick={props.onNext} className={styles.chevron} />
    </div>
  );
}

function ScheduleTimes() {
  const hours = _.range(24);
  return (
    <div className={styles.timesColumn}>
      {hours.map((hour) => (
        <div key={hour} className={styles.hourCell}>
          {hour}
        </div>
      ))}
    </div>
  );
}
