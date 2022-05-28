import { Player } from "@lottiefiles/react-lottie-player";
import {
  AvailableAppointment,
  Hospital,
  HospitalUtils,
} from "@zm-blood-components/common";
import { useState } from "react";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import {
  DonationDay,
  groupDonationDays,
} from "../../utils/AppointmentsGrouper";
import AppointmentPicker from "../AppointmentPicker";
import Popup, { PopupProps } from "../basic/Popup";
import Select from "../basic/Select";
import styles from "./AppointmentSelect.module.scss";
import WarningLogo from "../../assets/images/warning.svg";
import React from "react";
import DropAnimation from "../../assets/animations/drop.json";
import NoAppointments from "../../assets/images/NO Appointments.svg";

export interface AppointmentSelectProps {
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  tooCloseDonationPopupProps: Pick<
    PopupProps,
    "open" | "onBack" | "onApproved" | "onClose"
  >;
}

export default function AppointmentSelect({
  availableAppointments,
  isFetching,
  onSlotSelected,
  tooCloseDonationPopupProps,
}: AppointmentSelectProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | "">("");

  const sortedDonationDays = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospital || !selectedHospital
    );
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospital]);

  return (
    <>
      <div className={styles.dropdownContainer}>
        <Select
          analyticsName="show_appointments_in_hospital"
          label={"הצג תורים ב:"}
          className={styles.dropdown}
          options={HospitalUtils.getHospitalOptions(
            HospitalUtils.activeHospitals,
            "הכל"
          )}
          value={selectedHospital}
          onChange={setSelectedHospital}
          isDisabled={isFetching}
        />
      </div>

      <Popup
        name="TooCloseAppointment"
        title={"מועד קרוב מידי"}
        buttonApproveText={"כן, אשר תור"}
        open={tooCloseDonationPopupProps.open}
        goBackText={"התחרטתי, חזרה למסך התורים"}
        onApproved={tooCloseDonationPopupProps.onApproved}
        onBack={tooCloseDonationPopupProps.onBack}
        onClose={tooCloseDonationPopupProps.onClose}
        image={WarningLogo}
      >
        טרם חלפו חודש ימים מיום תרומתך האחרון. האם את/ה בטוח/ה שברצונך לקבוע תור
        זה?
      </Popup>

      <div className={styles.donationsCard}>
        {Donations(
          selectedHospital,
          isFetching,
          sortedDonationDays,
          onSlotSelected
        )}
      </div>
    </>
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
      <div className={styles.loading}>
        <Player
          autoplay
          loop
          src={DropAnimation}
          className={styles.dropAnimation}
        />
        <div className={styles.loadingText}>מחפש תורים קרובים...</div>
      </div>
    );
  }

  if (donationDays.length === 0) {
    return (
      <div className={styles.noAppointments}>
        <img
          className={styles.noAppointmentsImage}
          src={NoAppointments}
          alt={"No more appointments"}
        />
        {selectedHospital ? (
          <div>לא קיימים תורים פנויים לבית חולים זה</div>
        ) : (
          <div>לא קיימים תורים פנויים בקרוב</div>
        )}
        <div>מומלץ לחזור שוב מחר לבדוק מה התחדש :)</div>
      </div>
    );
  }

  return (
    <>
      {donationDays.map((donationDay) => (
        <div className={styles.donationDayContainer} key={donationDay.day}>
          <AppointmentPicker
            donationDay={donationDay}
            onSlotSelected={onSlotSelected}
            showHospitalName={selectedHospital === ""}
          />
        </div>
      ))}

      <div className={styles.noMoreAppointments}>
        <img
          className={styles.noAppointmentsImage}
          src={NoAppointments}
          alt={"No more appointments"}
        />
        <div>זה הכל בינתיים :)</div>
        <div>התורים מתעדכנים מדי יום אז מומלץ לחזור שוב מחר לבדוק מה התחדש</div>
      </div>
    </>
  );
}
