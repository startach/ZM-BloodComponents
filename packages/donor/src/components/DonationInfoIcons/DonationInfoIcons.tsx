import React from "react";
import styles from "./DonationInfoIcons.module.scss";
import IconButton from "../basic/IconButton";
import locationIcon from "../../assets/icons/locationPin.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import Text from "../basic/Text";
import {
  ToDateString,
  ToTimeString,
  ToWeekDayString,
} from "../../utils/DateUtil";
import clockIcon from "../../assets/icons/clock.svg";
import { Hospital, LocaleUtils } from "@zm-blood-components/common";

export interface DonationInfoIconsProps {
  donationStartTimeMillis: number;
  hospital: Hospital;
}

const DonationInfoIcons: React.FC<DonationInfoIconsProps> = ({
  donationStartTimeMillis,
  hospital,
}: DonationInfoIconsProps) => {
  const donationDate = new Date(donationStartTimeMillis);
  return (
    <div className={styles.component}>
      <IconButton
        iconSrc={locationIcon}
        label={LocaleUtils.getHospitalName(hospital)}
        titleClassName={styles.iconTitle}
      />

      <IconButton iconSrc={calendarIcon} titleClassName={styles.iconTitle}>
        <Text>{ToWeekDayString(donationDate)}</Text>
        <Text>{ToDateString(donationDate)}</Text>
      </IconButton>

      <IconButton
        iconSrc={clockIcon}
        label={ToTimeString(donationDate)}
        titleClassName={styles.iconTitle}
      />
    </div>
  );
};

export default DonationInfoIcons;
