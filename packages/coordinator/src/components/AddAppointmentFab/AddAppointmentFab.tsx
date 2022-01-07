import React from "react";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "./AddAppointmentFab.module.scss";
import { useNavigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";

export type AddAppointmentFabProps = {};

export default function AddAppointmentFab(props: AddAppointmentFabProps) {
  const navigate = useNavigate();
  return (
    <Fab onClick={() => navigate(CoordinatorScreenKey.ADD)}>
      <AddIcon />
      <div className={styles.text}>הוסף תור</div>
    </Fab>
  );
}
