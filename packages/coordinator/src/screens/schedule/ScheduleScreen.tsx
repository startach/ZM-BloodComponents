import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import { Hospital } from "@zm-blood-components/common";
import { ScheduleDay } from "../../utils/types";
import SchedulePicker from "../../components/Schedule/ScheduleWeekPicker";
import { useState } from "react";
import ScheduleWeekComponent from "../../components/Schedule/ScheduleWeek";
import CoordinatorScreen from "../../components/CoordinatorScreen";

export interface ScheduleScreenProps {
  days: ScheduleDay[];
  onNextWeek: () => void;
  oPreviousWeek: () => void;
  onAddAppointment: () => void;
  availableHospitals: Hospital[];
}

export default function ScheduleScreen(props: ScheduleScreenProps) {
  const [hospital, setHospital] = useState(props.availableHospitals[0]);

  return (
    <CoordinatorScreen
      showFab
      headerProps={{
        title: "ניהול תורים",
        variant: HeaderVariant.INFO,
        hasBurgerMenu: true,
        hasNotificationsIcon: true,
        stickyComponent: (
          <SchedulePicker
            weekStartTime={props.days[0].dayStartTime}
            onNext={props.onNextWeek}
            onPrevious={props.oPreviousWeek}
            hospital={hospital}
            setSelectedHospital={setHospital}
            availableHospitals={props.availableHospitals}
          />
        ),
      }}
    >
      <ScheduleWeekComponent days={props.days} />
    </CoordinatorScreen>
  );
}
