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
import ZMScreen from "../../components/basic/ZMScreen";
import AppointmentPicker from "../../components/AppointmentPicker";
import Illustration from "../../assets/images/home page-illustration.png";
import NoAppointments from "../../assets/images/NO Appointments.svg";
import { Player } from "@lottiefiles/react-lottie-player";
import DropAnimation from "../../assets/animations/drop.json";
import Popup, { PopupProps } from "../../components/basic/Popup";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import WarningLogo from "../../assets/images/warning.svg";

export interface BookDonationScreenProps {
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName?: string;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  defaultHospital: Hospital | "";
  tooCloseDonationPopupProps: Pick<
    PopupProps,
    "open" | "onBack" | "onApproved" | "onClose"
  >;
}

export default function BookDonationScreen({
  availableAppointments,
  isFetching,
  firstName,
  onSlotSelected,
  defaultHospital,
  tooCloseDonationPopupProps,
}: BookDonationScreenProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | "">(
    defaultHospital
  );

  const sortedDonationDays = React.useMemo(() => {
    const filteredResults = availableAppointments.filter(
      (x) => x.hospital === selectedHospital || !selectedHospital
    );
    return groupDonationDays(filteredResults);
  }, [availableAppointments, selectedHospital]);

  // TODO Use AppointmentSelect

  return (
    <ZMScreen hasBurgerMenu className={styles.bookDonationScreen}>
      <div className={styles.welcomeBox}>
        <div className={styles.welcomeTitle}>
          <div className={styles.name}>
            היי{firstName ? " " + firstName : "!"}
          </div>
          <div className={styles.welcomeText}>
            איזה כיף שבאת!
            <br />
            מתי יתאים לך לתרום?
          </div>
        </div>
        <img src={Illustration} alt={"illustration"} />
      </div>

      <div className={styles.dropdownContainer}>
        <Select
          analytics={{ analyticsName: "show_appointments_in_hospital" }}
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
        analytics={{ analyticsName: "TooCloseAppointment" }}
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
    if (!selectedHospital) {
      return (
        <div className={styles.noAppointments}>
          <img
            className={styles.noAppointmentsImage}
            src={NoAppointments}
            alt={"No more appointments"}
          />
          <div>לא קיימים תורים פנויים בקרוב</div>
          <div>מומלץ לחזור שוב מחר לבדוק מה התחדש :)</div>
        </div>
      );
    }
    return (
      <div className={styles.noAppointments}>
        <img
          className={styles.noAppointmentsImage}
          src={NoAppointments}
          alt={"No more appointments"}
        />
        <div>לא קיימים תורים פנויים לבית חולים זה</div>
        <div>מומלץ לחזור שוב מחר לבדוק מה התחדש :)</div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.availableAppointmentsTitle}>תורים פנויים</div>
      {donationDays.map((donationDay) => (
        <div key={donationDay.day} className={styles.donationDayWrapper}>
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
