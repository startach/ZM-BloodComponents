import React from "react";
import styles from "./CoordinatorScreen.module.scss";
import CoordinatorHeader, {
  CoordinatorHeaderProps,
} from "../CoordinatorHeader/CoordinatorHeader";
import AddAppointmentFab from "../AddAppointmentFab";
import classnames from "classnames";
import { Hospital } from "@zm-blood-components/common";

export type CoordinatorScreenProps = {
  headerProps: CoordinatorHeaderProps;
  hospitalForAddAppointment?: Hospital;
  children: React.ReactNode;
  className?: string;
};

export default function CoordinatorScreen(props: CoordinatorScreenProps) {
  return (
    <div className={styles.coordinatorScreen}>
      <CoordinatorHeader {...props.headerProps} />

      <div className={classnames(styles.screenContent, props.className)}>
        {props.children}
      </div>

      {props.hospitalForAddAppointment && (
        <AddAppointmentFab hospital={props.hospitalForAddAppointment} />
      )}
    </div>
  );
}
