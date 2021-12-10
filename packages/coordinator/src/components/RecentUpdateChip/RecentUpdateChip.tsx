import React from "react";
import styles from "./RecentUpdateChip.module.scss";
import { BookingChange } from "@zm-blood-components/common";

export type RecentUpdateChipProps = {
  recentChangeType: BookingChange;
};

export default function RecentUpdateChip({
  recentChangeType,
}: RecentUpdateChipProps) {
  return (
    <div className={styles.recentChangeChip}>{getText(recentChangeType)}</div>
  );
}

function getText(recentChangeType: BookingChange) {
  switch (recentChangeType) {
    case BookingChange.BOOKED:
      return "נקבע לאחרונה";
    case BookingChange.CANCELLED:
      return "בוטל לאחרונה";
    case BookingChange.COMPLETED:
      return "הושלם";
    case BookingChange.NOSHOW:
      return "לא הגיע";
  }

  return "";
}
