import React from "react";
import { useParams } from "react-router-dom";
import styles from "./CoordinatorScreen.module.scss";
import CoordinatorHeader, {
  CoordinatorHeaderProps,
} from "../CoordinatorHeader/CoordinatorHeader";
import AddAppointmentFab from "../AddAppointmentFab";
import classnames from "classnames";
import { Hospital } from "@zm-blood-components/common";

export type CoordinatorScreenProps = {
  headerProps: CoordinatorHeaderProps;
  children: React.ReactNode;
  className?: string;
  addAppointmentFabProps?: {
    hospital: Hospital;
  };
};

export default function CoordinatorScreen(props: CoordinatorScreenProps) {
  const { timestamp } = useParams<{ timestamp: string }>();
  const currentScheduleTime = timestamp ? parseInt(timestamp) : undefined;

  return (
    <div className={styles.coordinatorScreen}>
      <CoordinatorHeader {...props.headerProps} />

      <div className={classnames(styles.screenContent, props.className)}>
        {props.children}
      </div>

      {props.addAppointmentFabProps && (
        <AddAppointmentFab 
        timestamp={currentScheduleTime}
        {...props.addAppointmentFabProps} />
      )}
    </div>
  );
}
