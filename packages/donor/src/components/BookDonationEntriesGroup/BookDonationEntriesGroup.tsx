import React from "react";
import styles from "./BookDonationEntriesGroup.module.scss";
import BookDonationEntry from "../BookDonationEntry";
import { AvailableAppointment } from "@zm-blood-components/common";
import Text from "../basic/Text";

export interface BookDonationDayEntriesProps {
  title: string;
  appointments: AvailableAppointment[];
  onAppointmentSelect: (selectedAppointment: AvailableAppointment) => void;
}

function BookDonationEntriesGroup({
  appointments = [],
  onAppointmentSelect,
  title,
}: BookDonationDayEntriesProps) {
  return (
    <section className={styles.component}>
      <Text>{title}</Text>
      <div className={styles.entriesContainer}>
        {appointments.map((appointment) => (
          <BookDonationEntry
            key={appointment.id}
            hospital={appointment.hospital}
            donationStartTime={appointment.donationStartTime}
            onRegisterClick={() => onAppointmentSelect?.(appointment)}
          />
        ))}
      </div>
    </section>
  );
}

export default BookDonationEntriesGroup;
