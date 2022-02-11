import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DonationDayScreen from "./DonationDayScreen";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../../store/login/LoginStatusSelectors";
import {
  getAppointmentsInDay,
  getDayStartTime,
} from "../../store/appointments/selectors/GetAppointmentsInDaySelector";
import { deleteAppointment } from "../../store/appointments/actions/DeleteAppointmentAction";
import { getHospital } from "../../store/appointments/selectors/GetHospitalSelector";

export default function DonationDayScreenContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { timestamp } = useParams<{ timestamp: string }>();
  const dayStartTime = getDayStartTime(timestamp);
  const loggedOut = useSelector(isLoggedOut);
  const donationDay = useSelector(getAppointmentsInDay)(dayStartTime);
  const hospital = useSelector(getHospital);

  if (loggedOut) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }
  if (!donationDay || !dayStartTime) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }
  if (!hospital) {
    return null;
  }

  return (
    <DonationDayScreen
      dayStartTime={dayStartTime}
      donationDay={donationDay}
      hospital={hospital}
      onAdd={() => navigate(CoordinatorScreenKey.ADD)}
      onDeleteAppointment={(appointmentId) => {
        dispatch(deleteAppointment(appointmentId));
      }}
    />
  );
}
