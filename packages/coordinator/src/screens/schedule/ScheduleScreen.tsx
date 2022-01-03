import styles from "./ScheduleScreen.module.scss";
import CoordinatorHeader from "../../components/CoordinatorHeader";
import {HeaderVariant} from '../../components/CoordinatorHeader/CoordinatorHeader';
import {Hospital} from '@zm-blood-components/common';
import Fab from '../../components/Fab';
import AddIcon from '@material-ui/icons/Add';

export interface ScheduleScreenProps {
  onNextWeek: ()=>void;
  oPreviousWeek: ()=>void;
  onAddAppointment: ()=>void;
  availableHospitals: Hospital[];
  weekName: string;
}

export default function ScheduleScreen(props: ScheduleScreenProps) {

  return (
    <div className={styles.screen}>
      <CoordinatorHeader title={"ניהול תורים"} hasBurgerMenu hasNotificationsIcon variant={HeaderVariant.INFO}/>

      <Fab onClick={props.onAddAppointment}>
        <AddIcon />
        <div style={{ marginRight: 5, fontSize: 16 }}>הוסף תור</div>
      </Fab>
    </div>
  );
}
