import React, { useState } from "react";
import styles from "./BookDonationScreen.module.scss";
import { AvailableAppointment, Hospital } from "@zm-blood-components/common";
import {
  getHospitalsList,
  groupAndSortAvailableAppointments,
} from "../../utils/appointmentUtil";
import BookDonationHeader from "../../components/BookDonationHeader";
import BookDonationEntriesGroup from "../../components/BookDonationEntriesGroup";
import { DateDisplayFormat, ToWeekDayString } from "../../utils/DateUtil";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { SelectOption } from "../../components/Select/Select";

interface BookDonationScreenProps {
  lastDonation: Date;
  earliestNextDonationDate: Date;
  availableAppointments: AvailableAppointment[];
  firstName: string;
  onAppointmentSelect: (appointment: AvailableAppointment) => void;
}

export default function BookDonationScreen({
  lastDonation,
  earliestNextDonationDate,
  availableAppointments,
  firstName,
  onAppointmentSelect,
}: BookDonationScreenProps) {
  const [selectedHospitals, setSelectedHospitals] = useState<Hospital | "">("");

  const hospitalsListOptions = React.useMemo(() => {
    let options: SelectOption<Hospital | "">[];
    options = getHospitalsList(availableAppointments).map((Hospital) => ({
      label: Hospital,
      key: Hospital,
      value: Hospital,
    }));
    options.unshift({ label: "הכל", key: "all", value: "" });
    return options;
  }, [availableAppointments]);

  const sortedAppointments = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospitals || !selectedHospitals
    );
    return groupAndSortAvailableAppointments(filteredResults);
  }, [availableAppointments, selectedHospitals]);

  return (
    <div className={styles.component}>
      <BookDonationHeader firstName={firstName} lastDonation={lastDonation} />

      <main className={styles.content}>
        <Text className={styles.dropdownTitle}>
          נא לבחור בית חולים ומועד לתרום בו
        </Text>
        <Select
          className={styles.dropdown}
          options={hospitalsListOptions}
          value={selectedHospitals}
          onChange={setSelectedHospitals}
        />

        {sortedAppointments.map(([donationDate, sameDayDonations]) => (
          <BookDonationEntriesGroup
            key={donationDate}
            title={` יום ${ToWeekDayString(
              donationDate,
              DateDisplayFormat
            )}, ${donationDate}`}
            appointments={sameDayDonations}
            onAppointmentSelect={onAppointmentSelect}
          />
        ))}
      </main>
    </div>
  );
}
