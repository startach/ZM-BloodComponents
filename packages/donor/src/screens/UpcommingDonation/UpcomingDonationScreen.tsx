import React from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import styles from "./UpcommingDonationScreen.module.scss";
import Text from "../../components/Text";
import LastDonationDateHeader from "../../components/LastDonationDateHeader";
import { DateFromMilliseconds } from "../../utils/DateUtil";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import Button from "../../components/Button";
import AwaitingYouHeader from "../../components/AwaitingYouHeader";

export enum UpcomingDonationStates {
  sameDayDonation = "sameDayDonation",
  afterDonation = "afterDonation",
  beforeDonation = "beforeDonation",
}

interface UpcomingDonationScreenProps {
  state: UpcomingDonationStates;
  upcomingDonation: BookedAppointment;
  lastDonation?: Date;
  firstName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function UpcomingDonationScreen({
  state,
  firstName,
  lastDonation,
  onCancel,
  upcomingDonation,
  onConfirm,
}: UpcomingDonationScreenProps) {
  function renderHeader() {
    if (state === UpcomingDonationStates.afterDonation)
      return (
        <LastDonationDateHeader
          firstName={firstName}
          lastDonation={lastDonation}
        />
      );

    return <AwaitingYouHeader firstName={firstName} />;
  }

  function renderConfirmDonationTitle() {
    if (state === UpcomingDonationStates.afterDonation)
      return (
        <Text className={styles.pleaseConfirmText}>
          נא אשר שהתרומה אכן התבצעה
        </Text>
      );
    return;
  }

  function renderConfirmButton() {
    if (state === UpcomingDonationStates.beforeDonation) return;

    const title =
      state === UpcomingDonationStates.afterDonation
        ? "אישור והמשך"
        : "מאשר הגעה";

    return (
      <Button
        title={title}
        className={styles.registerButton}
        onClick={onConfirm}
      />
    );
  }

  function renderCancelButton() {
    const title =
      state === UpcomingDonationStates.afterDonation ? "לא תרמתי" : "בטל תור";

    return (
      <div className={styles.cancelButtonContainer}>
        <Button
          title={title}
          className={styles.cancelButton}
          onClick={onCancel}
          variant={"outlined"}
        />
      </div>
    );
  }

  return (
    <div className={styles.component}>
      {renderHeader()}
      <main className={styles.content}>
        {renderConfirmDonationTitle()}

        <Text className={styles.donationDetailsText}>פרטי התור</Text>

        <DonationInfoIcons
          donationDate={DateFromMilliseconds(
            upcomingDonation.donationStartTimeMillis
          )}
          hospital={upcomingDonation.hospital}
        />

        {renderConfirmButton()}
        {renderCancelButton()}
      </main>
    </div>
  );
}
