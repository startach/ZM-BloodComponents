import React from "react";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "./AddAppointmentFab.module.scss";

export type AddAppointmentFabProps = {};

export default function AddAppointmentFab(props: AddAppointmentFabProps) {
  // TODO redirect to add appointment screen
  return (
    <Fab onClick={() => {}}>
      <AddIcon />
      <div className={styles.text}>הוסף תור</div>
    </Fab>
  );
}
