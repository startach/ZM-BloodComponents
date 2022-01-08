import { useEffect, useState } from "react";
import { fetchScheduleAppointments } from "./ScheduleAppointmentsFetcher";
import { DateUtils, Hospital } from "@zm-blood-components/common";
import { ScheduleDay } from "../../utils/types";
import ScheduleScreen from "./ScheduleScreen";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Navigate, useNavigate } from "react-router-dom";

export interface ScheduleScreenContainerProps {
  loggedIn: boolean;
  availableHospitals: Hospital[];
}

export default function ScheduleScreenContainer(
  props: ScheduleScreenContainerProps
) {
  const [selectedDayInWeek, setSelectedDayInWeek] = useState(
    DateUtils.TodayAdMidnight()
  );
  const [days, setDays] = useState<ScheduleDay[]>([]);

  // Arbitrary hospital, just so it would not fail TODO(Yaron) - fix this ugliness
  const [hospital, setHospital] = useState(Hospital.BEILINSON);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loggedIn && props.availableHospitals.length > 0) {
      setHospital(props.availableHospitals[0]);
    }
  }, [props.loggedIn, props.availableHospitals]);

  useEffect(() => {
    if (!props.loggedIn) {
      return;
    }
    setDays([]);
    fetchScheduleAppointments(hospital, selectedDayInWeek, navigate).then(
      (days) => setDays(days)
    );
  }, [selectedDayInWeek, hospital, props.loggedIn, navigate]);

  if (!props.loggedIn) {
    return <Navigate to={CoordinatorScreenKey.LOGIN} />;
  }

  const addWeek = (forward: boolean) => () => {
    setDays([]);
    setSelectedDayInWeek((date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + (forward ? 7 : -7));
      return newDate;
    });
  };

  return (
    <ScheduleScreen
      dayInWeek={selectedDayInWeek}
      days={days}
      hospital={hospital}
      setHospital={setHospital}
      onNextWeek={addWeek(true)}
      oPreviousWeek={addWeek(false)}
      availableHospitals={props.availableHospitals}
    />
  );
}
