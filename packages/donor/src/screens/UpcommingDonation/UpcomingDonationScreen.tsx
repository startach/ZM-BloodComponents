import React, { useState } from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import styles from "./UpcommingDonationScreen.module.scss";
import Text from "../../components/basic/Text";
import LastDonationDateHeader from "../../components/LastDonationDateHeader";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import Button, { ButtonVariant } from "../../components/basic/Button";
import AwaitingYouHeader from "../../components/AwaitingYouHeader";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";

export enum UpcomingDonationStates {
  sameDayDonation = "sameDayDonation",
  afterDonation = "afterDonation",
  beforeDonation = "beforeDonation",
}

interface UpcomingDonationScreenProps {
  state: UpcomingDonationStates;
  bookedAppointment: BookedAppointment;
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
  bookedAppointment,
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

  return (
    <ZMScreen
      className={styles.component}
      title="תורים מתוכננים"
      hasBurgerMenu={true}
    >
      {renderHeader()}
      <main className={styles.content}>
        {renderConfirmDonationTitle()}

        <Text className={styles.donationDetailsText}>פרטי התור</Text>

        <DonationInfoIcons
          donationStartTimeMillis={bookedAppointment.donationStartTimeMillis}
          hospital={bookedAppointment.hospital}
        />

        {renderConfirmButton()}
        <CancelButton onCancel={onCancel} />
      </main>
    </ZMScreen>
  );
}

function CancelButton(props: { onCancel: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onCancel = () => {
    setIsLoading(true);
    props.onCancel();
  };

  return (
    <div className={styles.cancelButtonContainer}>
      <Button
        title="בטל תור"
        className={styles.cancelButton}
        onClick={handleClickOpen}
        variant={ButtonVariant.outlined}
        isLoading={isLoading}
      />
      <Popup
        buttonApproveText="אישור"
        open={open}
        titleFirst="האם אתה בטוח שברצונך"
        titleSecond="לבטל את התור?"
        onBack={handleClose}
        onApproved={onCancel}
      ></Popup>
    </div>
  );
}
