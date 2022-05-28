import styles from "./SwapDonationScreen.module.scss";
import { AvailableAppointment } from "@zm-blood-components/common";
import ZMScreen from "../../components/basic/ZMScreen";
import Illustration from "../../assets/images/home page-illustration.png";
import { PopupProps } from "../../components/basic/Popup";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import AppointmentSelect from "../../components/AppointmentSelect/AppointmentSelect";

export interface SwapDonationScreenProps {
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName?: string;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  tooCloseDonationPopupProps: Pick<
    PopupProps,
    "open" | "onBack" | "onApproved" | "onClose"
  >;
}

export default function SwapDonationScreen({
  availableAppointments,
  isFetching,
  onSlotSelected,
  tooCloseDonationPopupProps,
}: SwapDonationScreenProps) {
  return (
    <ZMScreen hasBurgerMenu className={styles.bookDonationScreen}>
      <div className={styles.welcomeBox}>
        <div className={styles.welcomeTitle}>
          <div className={styles.name}>פרטי תור קיים</div>
          <div className={styles.welcomeText}>
            איזה כיף שבאת!
            <br />
            מתי יתאים לך לתרום?
          </div>
        </div>
        <img src={Illustration} alt={"illustration"} />
      </div>

      <AppointmentSelect
        availableAppointments={availableAppointments}
        isFetching={isFetching}
        onSlotSelected={onSlotSelected}
        tooCloseDonationPopupProps={tooCloseDonationPopupProps}
      />
    </ZMScreen>
  );
}
