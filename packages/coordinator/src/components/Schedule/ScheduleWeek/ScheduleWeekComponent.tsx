import React from "react";
import styles from "./ScheduleWeekComponent.module.scss";
import { ScheduleDay, ScheduleWeek } from "../../../utils/types";
import _ from "lodash";
import { DateUtils } from "@zm-blood-components/common";
import ScheduleCellComponent from "../ScheduleCell";
import classNames from "classnames";

export type ScheduleWeekComponentProps = {
  days: ScheduleDay[];
};

export default function ScheduleWeekComponent(
  props: ScheduleWeekComponentProps
) {
  const days = props.days;
  return (
    <div className={styles.schedule}>
      <div className={classNames(styles.gridColumns)}>
        <div />
        {days.map((day) => (
          <DayHeader
            day={day}
            key={`day.${day.cells[0].cellStartTime.getTime()}`}
          />
        ))}
      </div>

      <div className={classNames(styles.scheduleWeek, styles.gridColumns)}>
        {_.range(24).map((hourIndex) => {
          return (
            <React.Fragment
              key={`gridRow.${hourIndex}.${days[0].cells[
                hourIndex
              ]?.cellStartTime.getTime()}`}
            >
              <HourCell hourIndex={hourIndex} key={`hour.${hourIndex}`} />
              {days.map((day, dayIndex) => (
                <ScheduleCellComponent
                  key={`grid.${dayIndex}.${hourIndex}.${day.cells[0]?.cellStartTime.getTime()}`}
                  cell={day.cells[hourIndex]}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function DayHeader(props: { day: ScheduleDay }) {
  const dayStartTime = props.day.cells[0].cellStartTime;
  return (
    <div key={dayStartTime.toLocaleDateString()} className={styles.dayLabel}>
      <div className={styles.dayNumber}>{dayStartTime.getDate()}</div>
      <div className={styles.dayLetter}>
        {DateUtils.ToWeekDayLetter(dayStartTime)}
      </div>
    </div>
  );
}

function HourCell(props: { hourIndex: number }) {
  return <div className={styles.hourCell}>{props.hourIndex}</div>;
}