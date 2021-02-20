import React, { useState } from "react";
import styles from "./BookDonationScreen.module.scss";
import {
  AvailableAppointment,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import {
  DonationSlot,
  groupDonationDays,
} from "../../utils/AppointmentsGrouper";
import LastDonationDateHeader from "../../components/LastDonationDateHeader";
import BookDonationEntriesGroup from "../../components/BookDonationEntriesGroup";
import { DateDisplayFormat, ToWeekDayString } from "../../utils/DateUtil";
import Select from "../../components/basic/Select";
import Text from "../../components/basic/Text";
import Spinner from "../../components/basic/Spinner";

interface BookDonationScreenProps {
  lastDonation: Date;
  earliestNextDonationDate: Date;
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName: string;
  onSlotSelected: (donationSlot: DonationSlot) => void;
}

export default function BookDonationScreen({
  lastDonation,
  earliestNextDonationDate,
  availableAppointments,
  isFetching,
  firstName,
  onSlotSelected,
}: BookDonationScreenProps) {
  const [selectedHospitals, setSelectedHospitals] = useState<Hospital | "">("");

  const sortedDonationDays = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospitals || !selectedHospitals
    );
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospitals]);

  return (
    <div className={styles.component}>
      <LastDonationDateHeader
        firstName={firstName}
        lastDonation={lastDonation}
      />

      <main className={styles.content}>
        <Text className={styles.dropdownTitle}>
          נא לבחור בית חולים ומועד לתרום בו
        </Text>
        <Select
          className={styles.dropdown}
          options={HospitalUtils.getAllHospitalOptions("הכל")}
          value={selectedHospitals}
          onChange={setSelectedHospitals}
          isDisabled={isFetching}
        />

        {isFetching && <Spinner />}

        {sortedDonationDays.map((donationDay) => (
          <BookDonationEntriesGroup
            key={donationDay.day}
            title={`${ToWeekDayString(donationDay.day, DateDisplayFormat)}, ${
              donationDay.day
            }`}
            donationSlots={donationDay.donationSlots}
            onSlotSelected={onSlotSelected}
          />
        ))}
      </main>
    </div>
  );
}
