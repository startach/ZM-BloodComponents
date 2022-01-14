import React, { useState } from "react";
import styles from "./AppointmentPreview.module.scss";
import { Appointment } from "../../utils/types";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as AddPerson } from "../../assets/icons/add-person.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import RecentUpdateChip from "../RecentUpdateChip";
import classNames from "classnames";
import SwippableComponent from "../SwippableComponent";
import { useNavigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";

export type AppointmentPreviewProps = {
  appointment: Appointment;
  addBottomDivider: boolean;
  onDelete: () => void;
};

export default function AppointmentPreview({
  onDelete,
  appointment,
  addBottomDivider,
}: AppointmentPreviewProps) {
  const [showDelete, setShowDelete] = useState(false);
  const [appointmentDeleted, setAppointmentDeleted] = useState(false);

  const onDeleteAppointment = () => {
    onDelete();
    setAppointmentDeleted(true);
  };

  if (appointmentDeleted) {
    return null;
  }

  const onSwipe = (open: boolean) => {
    if (!appointment.booked) {
      setShowDelete(open);
    }
  };

  return (
    <>
      <SwippableComponent
        className={classNames(
          styles.appointmentPreviewContainer,
          appointment.appointmentId
        )}
        onSwipeRight={() => onSwipe(false)}
        onSwipeLeft={() => onSwipe(true)}
      >
        <DeleteAppointmentButton
          onClick={onDeleteAppointment}
          showDelete={showDelete}
        />
        <div
          className={styles.appointmentPreviewContent}
          data-appointment-id={appointment.appointmentId}
        >
          <AppointmentContent
            appointment={appointment}
            showDelete={showDelete}
          />
        </div>
      </SwippableComponent>

      {addBottomDivider && (
        <div className={styles.dividerContainer}>
          <div className={styles.divider} />
        </div>
      )}
    </>
  );
}

function AppointmentContent(props: {
  appointment: Appointment;
  showDelete: boolean;
}) {
  const navigate = useNavigate();

  const onClick = () => {
    if (props.showDelete) {
      return;
    }
    if (props.appointment.booked) {
      navigate(
        CoordinatorScreenKey.APPOINTMENT + "/" + props.appointment.appointmentId
      );
    } else {
      navigate(
        `${CoordinatorScreenKey.MANUAL_DONATION}/${props.appointment.appointmentId}/${props.appointment.donationStartTimeMillis}`
      );
    }
  };

  if (props.appointment.booked) {
    return (
      <>
        <div className={styles.nameAndChip} onClick={onClick}>
          <div className={styles.donorName}>{props.appointment.donorName}</div>
          {props.appointment.recentChangeType && (
            <RecentUpdateChip
              recentChangeType={props.appointment.recentChangeType}
            />
          )}
        </div>
        <ChevronLeft onClick={onClick} />
      </>
    );
  }

  return (
    <>
      <div className={styles.nameAndChip} onClick={onClick}>
        <div className={styles.availableAppointmentText}>תור ריק</div>
        {props.appointment.recentChangeType && (
          <RecentUpdateChip
            recentChangeType={props.appointment.recentChangeType}
          />
        )}
      </div>
      <AddPerson onClick={onClick} />
    </>
  );
}

function DeleteAppointmentButton(props: {
  onClick: () => void;
  showDelete: boolean;
}) {
  return (
    <div
      className={classNames({
        [styles.deleteButton]: true,
        [styles.deleteButtonVisible]: props.showDelete,
      })}
      onClick={props.onClick}
    >
      <Trash />
      <div className={styles.deleteButtonText}>מחק תור</div>
    </div>
  );
}
