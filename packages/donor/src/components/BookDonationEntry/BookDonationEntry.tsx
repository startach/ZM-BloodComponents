import React from "react";
import styles from "./BookDonationEntry.module.scss";
import Card from "../Card";
import { ToTimeString } from "../../utils/DateUtil";
import Text from "../Text";

export interface BookDonationEntryProps {
  donationStartTime: Date;
  onClick?: () => void;
  onRegisterClick?: () => void;
}

function BookDonationEntry({
  donationStartTime,
  onClick,
  onRegisterClick,
}: BookDonationEntryProps) {
  return (
    <Card className={styles.component} onClick={onClick}>
      <Text>{ToTimeString(donationStartTime)}</Text>
      <Text className={styles.registerText} onClick={onRegisterClick}>
        הירשם לתור
      </Text>
    </Card>
  );
}

export default BookDonationEntry;
