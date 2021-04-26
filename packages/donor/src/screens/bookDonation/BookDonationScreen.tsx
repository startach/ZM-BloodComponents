import React, { useState } from "react";
import styles from "./BookDonationScreen.module.scss";
import {
  AvailableAppointment,
  Hospital,
  HospitalUtils,
  DateUtils,
} from "@zm-blood-components/common";
import {
  DonationDay,
  DonationSlot,
  groupDonationDays,
} from "../../utils/AppointmentsGrouper";
import LastDonationDateHeader from "../../components/LastDonationDateHeader";
import BookDonationEntriesGroup from "../../components/BookDonationEntriesGroup";
import Select from "../../components/basic/Select";
import Text from "../../components/basic/Text";
import Spinner from "../../components/basic/Spinner";
import ZMScreen from "../../components/basic/ZMScreen";

interface BookDonationScreenProps {
  lastDonation?: Date;
  earliestNextDonationDate?: Date;
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
  const [selectedHospital, setSelectedHospital] = useState<Hospital | "">("");

  const sortedDonationDays = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospital || !selectedHospital
    );
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospital]);

  return (
    <ZMScreen
      title="קביעת תרומה חדשה"
      hasBurgerMenu={true}
      className={styles.component}
    >
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
          value={selectedHospital}
          onChange={setSelectedHospital}
          isDisabled={isFetching}
        />

        {Donations(
          selectedHospital,
          isFetching,
          sortedDonationDays,
          onSlotSelected
        )}
      </main>
    </ZMScreen>
  );
}

function Donations(
  selectedHospital: Hospital | "",
  isFetching: boolean,
  donationDays: DonationDay[],
  onSlotSelected: (donationSlot: DonationSlot) => void
) {
  if (isFetching) {
    return <Spinner />;
  }

  if (donationDays.length === 0) {
    if (!selectedHospital) {
      return (
        <div>
          <div>לא קיימים תורים פנויים</div>
          <div>נסו לבדוק שוב בהמשך :)</div>
        </div>
      );
    }
    return (
      <div>
        <div>לא קיימים תורים פנויים לבית חולים זה</div>
        <div>נסו לבדוק שוב בהמשך :)</div>
      </div>
    );
  }

  return donationDays.map((donationDay) => (
    <BookDonationEntriesGroup
      key={donationDay.day}
      title={`${DateUtils.ToWeekDayString(
        donationDay.day,
        DateUtils.DateDisplayFormat
      )}, ${donationDay.day}`}
      donationSlots={donationDay.donationSlots}
      onSlotSelected={onSlotSelected}
    />
  ));
}
