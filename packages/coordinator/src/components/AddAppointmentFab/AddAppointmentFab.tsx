import React from "react";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "./AddAppointmentFab.module.scss";

export type AddAppointmentFabProps = {
  onClick: () => void;
};

export default function AddAppointmentFab(props: AddAppointmentFabProps) {
  return (
    <Fab onClick={props.onClick}>
      <AddIcon />
      <div className={styles.text}>הוסף תור</div>
    </Fab>
  );
}
