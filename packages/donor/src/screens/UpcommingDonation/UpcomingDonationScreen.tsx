import React, { useState } from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import styles from "./UpcommingDonationScreen.module.scss";
import Text from "../../components/basic/Text";
import DonationInfoIcons from "../../components/DonationInfoIcons";
import Button, { ButtonVariant } from "../../components/basic/Button";
import ZMScreen from "../../components/basic/ZMScreen";
import Popup from "../../components/basic/Popup";
import { Color } from "../../constants/colors";

export enum UpcomingDonationStates {
  sameDayDonation = "sameDayDonation",
  afterDonation = "afterDonation",
  beforeDonation = "beforeDonation",
}

export interface UpcomingDonationScreenProps {
  state: UpcomingDonationStates;
  bookedAppointment: BookedAppointment;
  lastDonation?: Date;
  firstName: string;
  onConfirm: () => void;
  onCancel: () => Promise<void>;
}

export default function UpcomingDonationScreen({
  state,
  firstName,
  lastDonation,
  onCancel,
  bookedAppointment,
  onConfirm,
}: UpcomingDonationScreenProps) {
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
    <ZMScreen title="פרטי תור עתידי" hasBurgerMenu={true}>
      <span className={styles.welcomeText}>
        <Text>שלום</Text>
        &nbsp;
        <Text />
        <Text>{firstName},</Text>
      </span>
      <Text>
        נרשמת לתרומה בקרוב.
        <span className={styles.awaitingYouText}> מצפים לך!</span>
      </Text>
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

function CancelButton(props: { onCancel: () => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onCancel = async () => {
    setIsLoading(true);
    await props.onCancel();
  };

  return (
    <div className={styles.cancelButtonContainer}>
      <Button
        title="ביטול תור"
        className={styles.cancelButton}
        onClick={handleClickOpen}
        variant={ButtonVariant.contained}
        color={Color.Default}
        isLoading={isLoading}
      />
      <Popup
        buttonApproveText="אישור"
        open={open}
        title="רק מוודאים"
        content="האם את/ה בטוח/ה שברצונך לבטל את התור?"
        goBackText="בעצם לא"
        onBack={handleClose}
        onApproved={onCancel}
      />
    </div>
  );
}
