import React, { useState } from "react";
import styles from "./BookDonationScreen.module.scss";
import {
  AvailableAppointment,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import {
  DonationDay,
  groupDonationDays,
} from "../../utils/AppointmentsGrouper";
import LastDonationDateHeader from "../../components/LastDonationDateHeader";
import Select from "../../components/basic/Select";
import Text from "../../components/basic/Text";
import Spinner from "../../components/basic/Spinner";
import ZMScreen from "../../components/basic/ZMScreen";
import AppointmentPicker from "../../components/AppointmentPicker";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";

interface BookDonationScreenProps {
  lastDonation?: Date;
  earliestNextDonationDate?: Date;
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName: string;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
}

export default function BookDonationScreen({
  lastDonation,
  earliestNextDonationDate,
  availableAppointments,
  isFetching,
  firstName,
  onSlotSelected,
}: BookDonationScreenProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | "">(
    Hospital.BEILINSON
  );

  const sortedDonationDays = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospital || !selectedHospital
    );
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospital]);

  return (
    <ZMScreen
      title="הרשמה לתור"
      hasBurgerMenu={true}
      className={styles.component}
    >
      <LastDonationDateHeader
        firstName={firstName}
        lastDonation={lastDonation}
      />

      <main className={styles.content}>
        <Text className={styles.dropdownTitle}>מתי מתאים לך להגיע לתרום?</Text>
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
  onSlotSelected: (donationSlot: DonationSlotToBook) => void
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
    <AppointmentPicker
      key={donationDay.day}
      donationDay={donationDay}
      onSlotSelected={onSlotSelected}
    />
  ));
}
