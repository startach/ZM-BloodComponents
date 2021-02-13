import React, { useState } from "react";
import styles from "./BookDonationScreen.module.scss";
import {
  AvailableAppointment,
  Hospital,
  LocaleUtils,
} from "@zm-blood-components/common";
import {
  getHospitalsList,
  groupAndSortAvailableAppointments,
} from "../../utils/AppointmentUtil1";
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
    options = getHospitalsList(availableAppointments).map((hospital) => ({
      label: LocaleUtils.getHospitalName(hospital),
      key: hospital,
      value: hospital,
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

        {sortedAppointments.map((group) => (
          <BookDonationEntriesGroup
            key={group.date}
            title={` יום ${ToWeekDayString(group.date, DateDisplayFormat)}, ${
              group.date
            }`}
            appointments={group.appointments}
            onAppointmentSelect={onAppointmentSelect}
          />
        ))}
      </main>
    </div>
  );
}
