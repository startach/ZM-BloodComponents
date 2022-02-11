import ScheduleScreen from "./ScheduleScreen";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTimestamp, schedulePath } from "../../navigation/RouterUtils";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../store/appointments/selectors/GetScheduleSelector";
import { getHospital } from "../../store/appointments/selectors/GetHospitalSelector";
import { isLoggedOut } from "../../store/login/LoginStatusSelectors";
import { getAvailableHospitals } from "../../store/coordinator/CoordinatorSelectors";
import {
  clearAndFetchAppointments,
  maybeFetchMoreAppointments,
} from "../../store/appointments/actions/InsertAppointmentsActions";

export default function ScheduleScreenContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { timestamp } = useParams<{ timestamp: string }>();
  const timeInWeek = getTimestamp(timestamp);
  const days = useSelector(getSchedule)(timeInWeek, navigate);
  const hospital = useSelector(getHospital);
  const availableHospitals = useSelector(getAvailableHospitals);
  const loggedOut = useSelector(isLoggedOut);

  if (loggedOut) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!timeInWeek) {
    return <Navigate to={schedulePath(new Date())} />;
  }

  if (!days) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  if (!hospital) {
    return null;
  }

  const addWeek = (forward: boolean) => () => {
    const newDate = new Date(timeInWeek);
    newDate.setDate(newDate.getDate() + (forward ? 7 : -7));
    navigate(schedulePath(newDate));
    dispatch(maybeFetchMoreAppointments(newDate.getTime()));
  };

  return (
    <ScheduleScreen
      dayInWeek={timeInWeek}
      days={days}
      hospital={hospital}
      setHospital={(hospital) =>
        dispatch(clearAndFetchAppointments(hospital, new Date()))
      }
      onNextWeek={addWeek(true)}
      oPreviousWeek={addWeek(false)}
      availableHospitals={availableHospitals}
    />
  );
}
