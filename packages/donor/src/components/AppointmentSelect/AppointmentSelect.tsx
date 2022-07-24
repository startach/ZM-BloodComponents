import { Player } from "@lottiefiles/react-lottie-player";
import {
  AvailableAppointment,
  BookedAppointment,
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
  appointmentToHide?: BookedAppointment;
  isSwapAppointment: boolean;
}

export default function AppointmentSelect({
  availableAppointments,
  isFetching,
  onSlotSelected,
  tooCloseDonationPopupProps,
  appointmentToHide,
  isSwapAppointment,
}: AppointmentSelectProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | "">("");

  const sortedDonationDays = React.useMemo(() => {
    const appointmentFilter = (appointment: AvailableAppointment) => {
      const isValidHospital =
        appointment.hospital === selectedHospital || !selectedHospital;

      let isHiddenAppointment = false;

      if (appointmentToHide) {
        const isHiddenTime =
          appointment.donationStartTimeMillis ===
          appointmentToHide!.donationStartTimeMillis;
        const isHiddenHospital =
          appointment.hospital === appointmentToHide!.hospital;
        isHiddenAppointment = isHiddenTime && isHiddenHospital;
      }
      return isValidHospital && !isHiddenAppointment;
    };
    const filteredResults = availableAppointments.filter(appointmentFilter);
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospital, appointmentToHide]);

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
        טרם חלפו חודש ימים מיום תרומתך האחרון. האם את/ה בטוח/ה שברצונך{" "}
        {isSwapAppointment ? "להחליף" : "לקבוע"} תור זה?
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
