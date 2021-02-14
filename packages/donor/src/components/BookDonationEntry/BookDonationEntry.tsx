import React from "react";
import styles from "./BookDonationEntry.module.scss";
import Card from "../Card";
import { ToTimeString } from "../../utils/DateUtil";
import Text from "../Text";
import classNames from "classnames";
import { Hospital, LocaleUtils } from "@zm-blood-components/common";

export interface BookDonationEntryProps {
  hospital: Hospital;
  donationStartTime: Date;
  onClick?: () => void;
  onRegisterClick?: () => void;
}

function BookDonationEntry({
  hospital,
  donationStartTime,
  onClick,
  onRegisterClick,
}: BookDonationEntryProps) {
  return (
    <Card
      className={classNames(styles.component, "anim_onClick--scaleDown")}
      onClick={onClick}
    >
      <Text>
        {ToTimeString(donationStartTime)}
        {", "}
        {LocaleUtils.getHospitalName(hospital)}
      </Text>
      <Text className={styles.registerText} onClick={onRegisterClick}>
        הירשם לתור
      </Text>
    </Card>
  );
}

export default BookDonationEntry;
