import { useEffect, useState } from "react";
import { fetchScheduleAppointments } from "./ScheduleAppointmentsFetcher";
import { Hospital } from "@zm-blood-components/common";
import { ScheduleDay } from "../../utils/types";
import ScheduleScreen from "./ScheduleScreen";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTimestamp, schedulePath } from "../../navigation/RouterUtils";

export interface ScheduleScreenContainerProps {
  loggedIn: boolean;
  availableHospitals: Hospital[];
}

export default function ScheduleScreenContainer(
  props: ScheduleScreenContainerProps
) {
  const navigate = useNavigate();

  const [days, setDays] = useState<ScheduleDay[]>([]);
  const { hospital, timestamp } =
    useParams<{ hospital: Hospital; timestamp: string }>();

  useEffect(() => {
    const timeInWeek = getTimestamp(timestamp);
    if (!props.loggedIn || !hospital || !timeInWeek) {
      return;
    }
    setDays([]);
    fetchScheduleAppointments(hospital, timeInWeek, navigate).then((days) =>
      setDays(days)
    );
  }, [timestamp, hospital, props.loggedIn, navigate]);

  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  if (!hospital) {
    return <Navigate to={CoordinatorScreenKey.SCHEDULE} />;
  }

  const timeInWeek = getTimestamp(timestamp);
  if (!timeInWeek) {
    return <Navigate to={schedulePath(hospital, new Date())} />;
  }

  const addWeek = (forward: boolean) => () => {
    setDays([]);
    const newDate = new Date(timeInWeek);
    newDate.setDate(newDate.getDate() + (forward ? 7 : -7));
    navigate(schedulePath(hospital, newDate));
  };

  return (
    <ScheduleScreen
      dayInWeek={timeInWeek}
      days={days}
      hospital={hospital}
      setHospital={(hospital) => navigate(schedulePath(hospital, timeInWeek))}
      onNextWeek={addWeek(true)}
      oPreviousWeek={addWeek(false)}
      availableHospitals={props.availableHospitals}
    />
  );
}
