import React from "react";
import styles from "./RecentUpdateChip.module.scss";
import { BookingChange } from "@zm-blood-components/common";
import classNames from "classnames";

export type RecentUpdateChipProps = {
  recentChangeType: BookingChange;
};

export default function RecentUpdateChip({
  recentChangeType,
}: RecentUpdateChipProps) {
  const classes = [styles.recentChangeChip];
  classes.push(getColors(recentChangeType));

  return (
    <div className={styles.recentChangeChipContainer}>
      <div className={classNames(classes)}>{getText(recentChangeType)}</div>
    </div>
  );
}

function getColors(recentChangeType: BookingChange) {
  switch (recentChangeType) {
    case BookingChange.BOOKED:
    case BookingChange.COMPLETED:
      return styles.greenChip;
    case BookingChange.CANCELLED:
    case BookingChange.NOSHOW:
      return styles.redChip;
  }

  return "";
}

function getText(recentChangeType: BookingChange) {
  switch (recentChangeType) {
    case BookingChange.BOOKED:
      return "חדש";
    case BookingChange.CANCELLED:
      return "בוטל לאחרונה";
    case BookingChange.COMPLETED:
      return "הושלם";
    case BookingChange.NOSHOW:
      return "לא הגיע";
  }

  return "";
}
