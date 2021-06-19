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
import Select from "../../components/basic/Select";
import Spinner from "../../components/basic/Spinner";
import ZMScreen from "../../components/basic/ZMScreen";
import AppointmentPicker from "../../components/AppointmentPicker";
import { DonationSlotToBook } from "../../navigation/app/LoggedInRouter";

export interface BookDonationScreenProps {
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName: string;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  defaultHospital: Hospital | "";
}

export default function BookDonationScreen({
  availableAppointments,
  isFetching,
  firstName,
  onSlotSelected,
  defaultHospital,
}: BookDonationScreenProps) {
  const [selectedHospital, setSelectedHospital] =
    useState<Hospital | "">(defaultHospital);

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
      className={styles.bookDonationScreen}
    >
      <div className={styles.welcomeTitle}>שמחים לראות אותך, {firstName}!</div>

      <div className={styles.dropdownContainer}>
        מתי מתאים לך להגיע לתרום?
        <Select
          className={styles.dropdown}
          options={HospitalUtils.getAllHospitalOptions("הכל")}
          value={selectedHospital}
          onChange={setSelectedHospital}
          isDisabled={isFetching}
        />
      </div>

      {Donations(
        selectedHospital,
        isFetching,
        sortedDonationDays,
        onSlotSelected
      )}
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
    return (
      <div className={styles.spinner}>
        <Spinner size={"2rem"} />
      </div>
    );
  }

  if (donationDays.length === 0) {
    if (!selectedHospital) {
      return (
        <div>
          <div>לא קיימים תורים פנויים</div>
          <div>כדאי לבדוק שוב בהמשך :)</div>
        </div>
      );
    }
    return (
      <div>
        <div>לא קיימים תורים פנויים לבית חולים זה</div>
        <div>כדאי לבדוק שוב בהמשך :)</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.availableAppointmentsTitle}>תורים פנויים</div>
      {donationDays.map((donationDay) => (
        <AppointmentPicker
          key={donationDay.day}
          donationDay={donationDay}
          onSlotSelected={onSlotSelected}
          showHospitalName={selectedHospital === ""}
        />
      ))}
    </>
  );
}
