import React from "react";
import styles from "./CoordinatorScreen.module.scss";
import CoordinatorHeader, {
  CoordinatorHeaderProps,
} from "../CoordinatorHeader/CoordinatorHeader";
import AddAppointmentFab from "../AddAppointmentFab";

export type CoordinatorScreenProps = {
  headerProps: CoordinatorHeaderProps;
  showFab?: boolean;
  children: React.ReactNode;
};

export default function CoordinatorScreen(props: CoordinatorScreenProps) {
  return (
    <div className={styles.coordinatorScreen}>
      <CoordinatorHeader {...props.headerProps} />

      <div className={styles.screenContent}>{props.children}</div>

      {props.showFab && <AddAppointmentFab />}
    </div>
  );
}
