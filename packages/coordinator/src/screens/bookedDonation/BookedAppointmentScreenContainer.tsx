import { DateUtils } from "@zm-blood-components/common";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BookedAppointmentScreen from "./BookedAppointmentScreen";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../../store/login/LoginStatusSelectors";
import { getAppointmentById } from "../../store/appointments/selectors/GetAppointmentByIdSelector";
import { markAppointmentAsCompleted } from "../../store/appointments/actions/MarkAppointmentAsCompletedAction";
import { removeDonorFromAppointment } from "../../store/appointments/actions/RemoveDonorFromAppointmentAction";

export default function BookedAppointmentScreenContainer() {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appointment = useSelector(getAppointmentById)(appointmentId);
  const loggedOut = useSelector(isLoggedOut);

  if (loggedOut) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!appointmentId || !appointment) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  if (appointment?.booked === false) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }
  const bookedAppointment = appointment;

  const onCopyAppointmentDetails = () => {
    if (!bookedAppointment) {
      return;
    }
    const content = getAppointmentCopyStringContent(
      bookedAppointment.fullName,
      bookedAppointment.phone,
      bookedAppointment.donationStartTimeMillis
    );
    navigator.clipboard.writeText(content);
  };

  const markAppointment = (isNoShow: boolean) => {
    if (!bookedAppointment) {
      return;
    }

    dispatch(markAppointmentAsCompleted(bookedAppointment.id, isNoShow));
  };

  const REMOVE_DONOR_BUFFER_TIME = 3 * 24 * 60 * 60 * 1000;
  const allowRemoveDonor =
    new Date().getTime() - bookedAppointment.donationStartTimeMillis <
    REMOVE_DONOR_BUFFER_TIME;

  return (
    <BookedAppointmentScreen
      appointment={bookedAppointment}
      onCopyAppointmentDetails={onCopyAppointmentDetails}
      onRemoveDonor={() => {
        dispatch(removeDonorFromAppointment(appointmentId));
        navigate(-1);
      }}
      markAppointmentAsCompleted={markAppointment}
      allowRemoveDonor={allowRemoveDonor}
    />
  );
}

function getAppointmentCopyStringContent(
  donorName: string,
  donorPhoneNumber: string,
  donationStartTimeMillis: number
) {
  return `${donorName}, ${String(donorPhoneNumber)}, ${DateUtils.ToDateString(
    donationStartTimeMillis
  )} ${DateUtils.ToTimeString(donationStartTimeMillis)}`;
}
