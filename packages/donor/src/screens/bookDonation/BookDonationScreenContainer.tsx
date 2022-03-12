import React, { useState } from "react";
import { DateUtils } from "@zm-blood-components/common";
import BookDonationScreen from "./BookDonationScreen";
import { MainNavigationKeys } from "../../navigation/app/MainNavigationKeys";
import {
  useAppointmentToBookStore,
  useAvailableAppointmentsStore,
} from "../../state/Providers";
import { observer } from "mobx-react-lite";
import { DonationSlotToBook } from "../../state/AppointmentToBookStore";
import { Navigate, useNavigate } from "react-router-dom";
import { AppStateType } from "../../navigation/AppRouter";
import Popup from "../../components/basic/Popup";
import WarningLogo from "../../assets/images/warning.svg";

const MIN_DAYS_BETWEEN_DONATIONS = 30;

interface BookDonationScreenContainerProps {
  isLoggedIn: boolean;
  appState: AppStateType;
}

export function BookDonationScreenContainer({
  appState,
  isLoggedIn,
}: BookDonationScreenContainerProps) {
  const navigate = useNavigate();
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<DonationSlotToBook>();
  const availableAppointmentsStore = useAvailableAppointmentsStore();
  const appointmentToBookStore = useAppointmentToBookStore();

  if (appState.bookedAppointment) {
    return <Navigate to={MainNavigationKeys.UpcomingDonation} />;
  }
  if (appState.pendingCompletionAppointments.length !== 0) {
    return <Navigate to={MainNavigationKeys.Approve} />;
  }

  if (isLoggedIn && appointmentToBookStore.hasAppointmentToBook()) {
    return <Navigate to={MainNavigationKeys.Questionnaire} />;
  }

  const onSlotSelected = (donationSlot: DonationSlotToBook) => {
    setSelectedSlot(donationSlot);
    const currentDonor = appState.donor;
    const timeDifference = currentDonor?.lastCompletedDonationTimeMillis
      ? DateUtils.getNumberOfDaysBetweenDates(
          new Date(donationSlot.donationStartTimeMillis),
          new Date(currentDonor.lastCompletedDonationTimeMillis)
        )
      : MIN_DAYS_BETWEEN_DONATIONS + 1;

    if (timeDifference < MIN_DAYS_BETWEEN_DONATIONS) {
      setShowWarningPopup(true);
    } else {
      continueDonation();
    }
  };

  const continueDonation = () => {
    if (selectedSlot) {
      appointmentToBookStore.setAppointmentToBook(selectedSlot);
      if (isLoggedIn) {
        navigate(MainNavigationKeys.Questionnaire);
      } else {
        navigate(MainNavigationKeys.Register);
      }
    }
  };

  return (
    <div>
      <BookDonationScreen
        availableAppointments={availableAppointmentsStore.availableAppointments}
        onSlotSelected={onSlotSelected}
        firstName={appState.donor?.firstName}
        isFetching={availableAppointmentsStore.isFetching}
        defaultHospital={""}
      />
      <Popup
        title={"מועד קרוב מידי"}
        buttonApproveText={"כן, אשר תור"}
        open={showWarningPopup}
        goBackText={"התחרטתי, חזרה למסך התורים"}
        onApproved={continueDonation}
        onBack={() => {
          setShowWarningPopup(false);
          navigate(MainNavigationKeys.BookDonation);
        }}
        image={WarningLogo}
      >
        {
          "טרם חלפו חודש ימים מיום תרומתך האחרון. האם את/ה בטוח/ה שברצונך לקבוע תור זה ?"
        }
      </Popup>
    </div>
  );
}

export default observer(BookDonationScreenContainer);
