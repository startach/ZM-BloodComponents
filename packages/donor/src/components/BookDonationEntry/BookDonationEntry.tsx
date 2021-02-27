import React from "react";
import styles from "./BookDonationEntry.module.scss";
import Card from "../basic/Card";
import Text from "../basic/Text";
import classNames from "classnames";
import { Hospital, LocaleUtils, DateUtils } from "@zm-blood-components/common";

export interface BookDonationEntryProps {
  hospital: Hospital;
  donationStartTimeMillis: number;
  onClick?: () => void;
  onRegisterClick?: () => void;
}

function BookDonationEntry({
  hospital,
  donationStartTimeMillis,
  onClick,
  onRegisterClick,
}: BookDonationEntryProps) {
  return (
    <Card
      className={classNames(styles.component, "anim_onClick--scaleDown")}
      onClick={onClick}
    >
      <Text>
        {DateUtils.ToTimeString(new Date(donationStartTimeMillis))}
        {" - "}
        {LocaleUtils.getHospitalName(hospital)}
      </Text>
      <Text className={styles.registerText} onClick={onRegisterClick}>
        הירשם לתור
      </Text>
    </Card>
  );
}

export default BookDonationEntry;
