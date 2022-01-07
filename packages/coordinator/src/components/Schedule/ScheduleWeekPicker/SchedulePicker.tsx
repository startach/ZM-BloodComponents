import React, { useState } from "react";
import styles from "./SchedulePicker.module.scss";
import { DateUtils, Hospital, LocaleUtils } from "@zm-blood-components/common";
import { ReactComponent as ChevronLeft } from "../../../assets/icons/chevron-left-small.svg";
import { ReactComponent as ChevronRight } from "../../../assets/icons/chevron-right-small.svg";
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { ReactComponent as Selected } from "../../../assets/icons/selected.svg";
import classNames from "classnames";

export type SchedulePickerProps = {
  weekStartTime: Date;
  onNext: () => void;
  onPrevious: () => void;
  hospital: Hospital;
  setSelectedHospital: (hospital: Hospital) => void;
  availableHospitals: Hospital[];
};

export default function SchedulePicker(props: SchedulePickerProps) {
  const [showHospitalPicker, setShowHospitalPicker] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <DatePicker {...props} />
        <HospitalSelected
          {...props}
          showHospitalPicker={showHospitalPicker}
          setShowHospitalPicker={setShowHospitalPicker}
        />
      </div>
      <HospitalPicker
        {...props}
        showHospitalPicker={showHospitalPicker}
        setShowHospitalPicker={setShowHospitalPicker}
      />
    </>
  );
}

function DatePicker(props: SchedulePickerProps) {
  return (
    <div className={styles.datePicker}>
      <ChevronRight
        className={styles.chevronRight}
        onClick={props.onPrevious}
      />
      <Calendar className={styles.calendar} />
      <DateLabel weekStartTime={props.weekStartTime} />
      <ChevronLeft className={styles.chevronLeft} onClick={props.onNext} />
    </div>
  );
}

function DateLabel(props: { weekStartTime: Date }) {
  const firstDay = props.weekStartTime;
  const lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 5);

  const yearString =
    new Date().getFullYear() === firstDay.getFullYear()
      ? ""
      : ` (${firstDay.getFullYear()})`;

  if (firstDay.getMonth() === lastDay.getMonth()) {
    const monthName = DateUtils.ToMonthString(firstDay);
    return (
      <div className={styles.dateLabel}>
        <span className={styles.monthName}>{monthName}</span>
        <span className={styles.yearName}>{yearString},</span>
        {firstDay.getDate()}-{lastDay.getDate()}
      </div>
    );
  }

  const startMonthName = DateUtils.ToMonthString(firstDay, true);
  const endMonthName = DateUtils.ToMonthString(lastDay, true);
  return (
    <div className={styles.dateLabel}>
      <span className={styles.monthName}>{startMonthName} </span>
      {firstDay.getDate()} -
      <span className={styles.monthName}> {endMonthName} </span>
      {lastDay.getDate()}
    </div>
  );
}

function HospitalSelected(
  props: SchedulePickerProps & {
    showHospitalPicker: boolean;
    setShowHospitalPicker: (show: boolean) => void;
  }
) {
  const selectable = props.availableHospitals.length > 1;
  return (
    <div
      className={classNames({
        [styles.hospitalSelectable]: selectable,
      })}
      onClick={
        selectable
          ? () => props.setShowHospitalPicker(!props.showHospitalPicker)
          : undefined
      }
    >
      {selectable && (
        <ChevronDown
          className={classNames({
            [styles.chevronDown]: true,
            [styles.chevronDownTurned]: props.showHospitalPicker,
          })}
        />
      )}
      {LocaleUtils.getHospitalName(props.hospital)}
    </div>
  );
}

function HospitalPicker(
  props: SchedulePickerProps & {
    showHospitalPicker: boolean;
    setShowHospitalPicker: (show: boolean) => void;
  }
) {
  return (
    <div
      className={classNames({
        [styles.hospitalPicker]: true,
        [styles.hospitalPickerOpen]: props.showHospitalPicker,
      })}
    >
      <div className={styles.hospitalPickerTitle}>בחר בית חולים:</div>
      {props.availableHospitals.map((hospital, index) => (
        <div
          key={"hospital." + hospital}
          className={styles.hospitalOption}
          onClick={() => {
            props.setSelectedHospital(hospital);
            props.setShowHospitalPicker(false);
          }}
        >
          <div
            className={classNames({
              [styles.hospitalName]: true,
              [styles.selectedHospital]: props.hospital === hospital,
              [styles.bottomBorder]:
                index < props.availableHospitals.length - 1,
            })}
          >
            {props.hospital === hospital && (
              <Selected className={styles.selected} />
            )}
            {LocaleUtils.getHospitalName(hospital)}
          </div>
        </div>
      ))}
    </div>
  );
}
