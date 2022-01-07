import React, { useEffect } from "react";
import styles from "./ScheduleWeekComponent.module.scss";
import { ScheduleDay } from "../../../utils/types";
import _ from "lodash";
import { DateUtils } from "@zm-blood-components/common";
import ScheduleCellComponent from "../ScheduleCell";
import classNames from "classnames";

export type ScheduleWeekComponentProps = {
  days: ScheduleDay[];
};

const FIRST_SCROLL_HOUR = 9;

export default function ScheduleWeekComponent(
  props: ScheduleWeekComponentProps
) {
  const days = props.days;
  const topScrollRef = React.useRef(null);

  useEffect(() => {
    // @ts-ignore
    topScrollRef.current?.scrollIntoView();
  }, []);

  return (
    <div className={styles.schedule}>
      <div className={classNames(styles.gridColumns)}>
        <div />
        {days.map((day) => (
          <DayHeader day={day} key={`day.${day.dayStartTime.getTime()}`} />
        ))}

        {/*This div is here for spacing on the left column*/}
        <div />
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

              {/*This div is here for spacing on the left column and for scrolling*/}
              <div
                ref={hourIndex === FIRST_SCROLL_HOUR ? topScrollRef : undefined}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function DayHeader(props: { day: ScheduleDay }) {
  const dayStartTime = props.day.dayStartTime;
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
