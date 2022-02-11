import AddAppointmentScreen from "./AddAppointmentScreen";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { getTimestamp } from "../../navigation/RouterUtils";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../../store/login/LoginStatusSelectors";
import { getHospital } from "../../store/appointments/selectors/GetHospitalSelector";
import { addNewAppointments } from "../../store/appointments/actions/AddNewAppointmentsAction";

export default function AddAppointmentScreenContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { timestamp } = useParams<{ timestamp: string }>();
  const loggedOut = useSelector(isLoggedOut);
  const hospital = useSelector(getHospital);

  if (loggedOut) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }
  if (!hospital) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  let time = getTimestamp(timestamp);
  if (!time) {
    // If no timestamp, take tomorrow
    time = new Date();
    time.setDate(time.getDate() + 1);
  }
  const initialDate = getInitialDate(time);

  const onSave = async (donationStartTimes: number[]) => {
    dispatch(addNewAppointments(donationStartTimes, () => navigate(-1)));
  };

  return (
    <AddAppointmentScreen
      onSubmit={onSave}
      initialDate={initialDate}
      hospital={hospital}
    />
  );
}

function getInitialDate(date: Date) {
  if (date.getDay() === 6) {
    // If day is Saturday, move to Sunday.
    date.setDate(date.getDate() + 1);
  }

  date.setHours(11, 0, 0, 0);
  return date;
}
