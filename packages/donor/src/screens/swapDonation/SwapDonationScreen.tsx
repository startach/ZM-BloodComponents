import styles from "./SwapDonationScreen.module.scss";
import {
  AvailableAppointment,
  BookedAppointment,
  FunctionsApi,
} from "@zm-blood-components/common";
import ZMScreen from "../../components/basic/ZMScreen";
import { PopupProps } from "../../components/basic/Popup";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import AppointmentSelect from "../../components/AppointmentSelect/AppointmentSelect";
import ConfirmSwapAppointmentPopup from "../../components/popups/ConfirmSwapAppointmentPopup";
import BookingAppointmentErrorPopup from "../../components/popups/BookingAppointmentErrorPopup";
import DonationInfo from "../../components/DonationInfo/DonationInfo";

export interface SwapDonationScreenProps {
  availableAppointments: AvailableAppointment[];
  isFetching: boolean;
  firstName?: string;
  onSlotSelected: (donationSlot: DonationSlotToBook) => void;
  tooCloseDonationPopupProps: Pick<
    PopupProps,
    "open" | "onBack" | "onApproved" | "onClose"
  >;
  currentAppointment: BookedAppointment;
  onSwapDonation: () => void;
  bookingErrorCode: FunctionsApi.BookAppointmentStatus | undefined;
  refreshAppointments: () => Promise<void>;
  onBack: () => void;
  showSwapPopup: boolean;
  closeSwapPopup: () => void;
}

export default function SwapDonationScreen({
  availableAppointments,
  isFetching,
  onSlotSelected,
  tooCloseDonationPopupProps,
  currentAppointment,
  onSwapDonation,
  bookingErrorCode,
  refreshAppointments,
  onBack,
  showSwapPopup,
  closeSwapPopup,
}: SwapDonationScreenProps) {
  return (
    <ZMScreen
      hasBackButton
      onBack={onBack}
      className={styles.swapDonationScreen}
    >
      <DonationInfo
        donationStartTimeMillis={currentAppointment.donationStartTimeMillis}
        hospital={currentAppointment.hospital}
        isPreviousAppointmentInfo={true}
      />
      <span className={styles.swapBanner}>להחלפת התור ניתן לבחור מועד אחר</span>
      <div className={styles.swapDonationsSelection}>
        <AppointmentSelect
          availableAppointments={availableAppointments}
          isFetching={isFetching}
          onSlotSelected={onSlotSelected}
          tooCloseDonationPopupProps={tooCloseDonationPopupProps}
          appointmentToHide={currentAppointment}
          isSwapAppointment={true}
        />

        <BookingAppointmentErrorPopup
          errorCode={bookingErrorCode}
          onApproved={refreshAppointments}
        />

        <ConfirmSwapAppointmentPopup
          isOpen={showSwapPopup}
          onApproved={onSwapDonation}
          onBack={closeSwapPopup}
          onClose={closeSwapPopup}
        />
      </div>
    </ZMScreen>
  );
}
