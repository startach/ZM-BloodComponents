import React from "react";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "./AddAppointmentFab.module.scss";
import { useNavigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Hospital } from "@zm-blood-components/common";

export type AddAppointmentFabProps = {
  hospital: Hospital;
};

export default function AddAppointmentFab(props: AddAppointmentFabProps) {
  const navigate = useNavigate();
  return (
    <Fab
      onClick={() => navigate(CoordinatorScreenKey.ADD + "/" + props.hospital)}
    >
      <AddIcon />
      <div className={styles.text}>הוסף תור</div>
    </Fab>
  );
}
