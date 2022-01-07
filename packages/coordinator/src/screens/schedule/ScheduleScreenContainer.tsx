import { useEffect, useState } from "react";
import { fetchScheduleAppointments } from "./ScheduleAppointmentsFetcher";
import { DateUtils, Hospital } from "@zm-blood-components/common";
import { ScheduleDay } from "../../utils/types";
import ScheduleScreen from "./ScheduleScreen";

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
  const [hospital, setHospital] = useState(props.availableHospitals[0]);

  useEffect(() => {
    setDays([]);
    fetchScheduleAppointments(hospital, selectedDayInWeek).then((days) =>
      setDays(days)
    );
  }, [selectedDayInWeek, hospital]);

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
