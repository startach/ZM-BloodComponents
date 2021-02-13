import React from "react";
import { BookedAppointment } from "@zm-blood-components/common";
import styles from "./UpcommingDonationScreen.module.scss";
import Text from "../../components/Text";
import BookDonationHeader from "../../components/BookDonationHeader";
import IconButton from "../../components/IconButton";

interface UpcomingDonationScreenProps {
  upcomingDonations: BookedAppointment[];
  lastDonation?: Date;
  firstName: string;
  onCancel: () => void;
}

export default function UpcomingDonationScreen({
  firstName,
  lastDonation,
  onCancel,
  upcomingDonations,
}: UpcomingDonationScreenProps) {
  return (
    <div className={styles.component}>
      <BookDonationHeader firstName={firstName} lastDonation={lastDonation} />
      <Text>{JSON.stringify(upcomingDonations)}</Text>
      <main className={styles.content}>
        <Text>נא אשר שהתרומה אכן התבצעה</Text>
        <Text>פרטי התור</Text>
        <div>
          <IconButton iconSrc={} />
        </div>
      </main>
    </div>
  );
}
