import styles from "./ScheduleScreen.module.scss";
import CoordinatorHeader from "../../components/CoordinatorHeader";
import {HeaderVariant} from '../../components/CoordinatorHeader/CoordinatorHeader';
import {Hospital} from '@zm-blood-components/common';
import Fab from '../../components/Fab';
import AddIcon from '@material-ui/icons/Add';
import {ScheduleDay} from '../../utils/types';
import SchedulePicker from '../../components/Schedule/ScheduleWeekPicker';
import {useState} from 'react';
import ScheduleWeekComponent from '../../components/Schedule/ScheduleWeek';

export interface ScheduleScreenProps {
  days: ScheduleDay[];
  onNextWeek: ()=>void;
  oPreviousWeek: ()=>void;
  onAddAppointment: ()=>void;
  availableHospitals: Hospital[];
}

export default function ScheduleScreen(props: ScheduleScreenProps) {
  const [hospital, setHospital] = useState(props.availableHospitals[0])

  return (
    <div className={styles.screen}>
      <CoordinatorHeader title={"ניהול תורים"} hasBurgerMenu hasNotificationsIcon variant={HeaderVariant.INFO}/>

      <SchedulePicker
          weekStartTime={props.days[0].cells[0].cellStartTime}
          onNext={props.onNextWeek}
          onPrevious={props.oPreviousWeek}
          hospital={hospital}
          setSelectedHospital={setHospital}
          availableHospitals={props.availableHospitals}
      />

      <ScheduleWeekComponent days={props.days}/>

      <Fab onClick={props.onAddAppointment}>
        <AddIcon />
        <div style={{ marginRight: 5, fontSize: 16 }}>הוסף תור</div>
      </Fab>
    </div>
  );
}
