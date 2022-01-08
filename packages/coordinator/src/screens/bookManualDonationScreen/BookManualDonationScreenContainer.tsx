import { BloodType, MANUAL_DONOR_ID } from "@zm-blood-components/common";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BookManualDonationScreen from "./BookManualDonationScreen";
import * as CoordinatorFunctions from "../../firebase/CoordinatorFunctions";
import { getTimestamp } from "../../navigation/RouterUtils";

export interface BookManualDonationScreenContainerProps {
  loggedIn: boolean;
}

export default function BookManualDonationScreenContainer(
  props: BookManualDonationScreenContainerProps
) {
  const navigate = useNavigate();
  const { appointmentId, timestamp } =
    useParams<{ appointmentId: string; timestamp: string }>();
  const donationStartTime = getTimestamp(timestamp);

  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!appointmentId || !donationStartTime) {
    navigate(-1);
    return null;
  }

  const onSave = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    bloodType: BloodType
  ) => {
    await CoordinatorFunctions.bookManualDonation({
      donorId: MANUAL_DONOR_ID,
      appointmentIds: [appointmentId],
      donorDetails: {
        firstName,
        lastName,
        phoneNumber,
        bloodType,
      },
    });

    navigate(-1);
  };

  return (
    <BookManualDonationScreen
      onSave={onSave}
      donationStartTime={donationStartTime}
    />
  );
}