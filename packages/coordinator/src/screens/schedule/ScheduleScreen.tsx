import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import { DateUtils, Hospital } from "@zm-blood-components/common";
import { ScheduleDay } from "../../utils/types";
import SchedulePicker from "../../components/Schedule/ScheduleWeekPicker";
import ScheduleWeekComponent from "../../components/Schedule/ScheduleWeek";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import Spinner from "../../components/Spinner";
import styles from "./ScheduleScreen.module.scss";
import { useState } from "react";

export interface ScheduleScreenProps {
  dayInWeek: Date;
  days: ScheduleDay[];
  hospital: Hospital;
  setHospital: (hospital: Hospital) => void;
  onNextWeek: () => void;
  oPreviousWeek: () => void;
  availableHospitals: Hospital[];
}

export default function ScheduleScreen(props: ScheduleScreenProps) {
  const startOfTheWeek = DateUtils.GetStartOfTheWeek(props.dayInWeek);
  const [showHospitalPicker, setShowHospitalPicker] = useState(false);

  return (
    <CoordinatorScreen
      headerProps={{
        title: "ניהול תורים",
        variant: HeaderVariant.INFO,
        hasBurgerMenu: true,
        hasNotificationsIcon: true,
        stickyComponent: (
          <SchedulePicker
            weekStartTime={startOfTheWeek}
            onNext={props.onNextWeek}
            onPrevious={props.oPreviousWeek}
            hospital={props.hospital}
            showHospitalPicker={showHospitalPicker}
            setShowHospitalPicker={setShowHospitalPicker}
            setSelectedHospital={props.setHospital}
            availableHospitals={props.availableHospitals}
          />
        ),
      }}
      addAppointmentFabProps={{
        hospital: props.hospital,
      }}
    >
      {showHospitalPicker && (
        <div
          className={styles.pickerOverlay}
          onClick={() => setShowHospitalPicker(false)}
        />
      )}

      {props.days.length === 0 ? (
        <div className={styles.spinner}>
          <Spinner size={"3rem"} />
        </div>
      ) : (
        <ScheduleWeekComponent days={props.days} />
      )}
    </CoordinatorScreen>
  );
}
