import { BloodType } from "@zm-blood-components/common";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BookManualDonationScreen from "./BookManualDonationScreen";
import { getTimestamp } from "../../navigation/RouterUtils";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../../store/login/LoginStatusSelectors";
import { bookManualDonation } from "../../store/appointments/actions/BookManualDonationAction";

export default function BookManualDonationScreenContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appointmentId, timestamp } =
    useParams<{ appointmentId: string; timestamp: string }>();
  const donationStartTime = getTimestamp(timestamp);
  const loggedOut = useSelector(isLoggedOut);

  if (loggedOut) {
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
    dispatch(
      bookManualDonation(
        appointmentId,
        {
          firstName,
          lastName,
          phoneNumber,
          bloodType,
        },
        () => navigate(-1)
      )
    );
  };

  return (
    <BookManualDonationScreen
      onSave={onSave}
      donationStartTime={donationStartTime}
    />
  );
}
