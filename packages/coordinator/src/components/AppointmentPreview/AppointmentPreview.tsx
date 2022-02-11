import React, { useState } from "react";
import styles from "./AppointmentPreview.module.scss";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as AddPerson } from "../../assets/icons/add-person.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import RecentUpdateChip from "../RecentUpdateChip";
import classNames from "classnames";
import SwippableComponent from "../SwippableComponent";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";
import { CoordinatorScreenKey } from "../../navigation/CoordinatorScreenKey";
import { Appointment } from "@zm-blood-components/common";

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
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const onDeleteAppointment = () => {
    onDelete();
  };

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
          appointment.id
        )}
        onSwipeRight={() => onSwipe(false)}
        onSwipeLeft={() => onSwipe(true)}
      >
        <DeleteAppointmentButton
          onClick={() => setShowDeletePopup(true)}
          showDelete={showDelete}
        />
        <div
          className={styles.appointmentPreviewContent}
          data-appointment-id={appointment.id}
        >
          <AppointmentContent
            appointment={appointment}
            showDelete={showDelete}
          />
        </div>
      </SwippableComponent>

      <DeleteAppointmentPopup
        openPopup={showDeletePopup}
        onDeleteClick={onDeleteAppointment}
        closePopup={() => setShowDeletePopup(false)}
      />

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
      navigate(CoordinatorScreenKey.APPOINTMENT + "/" + props.appointment.id);
    } else {
      navigate(
        `${CoordinatorScreenKey.MANUAL_DONATION}/${props.appointment.id}/${props.appointment.donationStartTimeMillis}`
      );
    }
  };

  if (props.appointment.booked) {
    return (
      <>
        <div className={styles.nameAndChip} onClick={onClick}>
          <div className={styles.donorName}>{props.appointment.fullName}</div>
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

function DeleteAppointmentPopup(props: {
  openPopup: boolean;
  closePopup: () => void;
  onDeleteClick: () => void;
}) {
  const { openPopup, closePopup, onDeleteClick } = props;

  return (
    <Popup
      open={openPopup}
      onClose={closePopup}
      primaryButtonText={"מחק תור"}
      onPrimaryButtonClick={onDeleteClick}
      cancelButtonText={"שמור תור"}
      onCancelButtonClick={closePopup}
    >
      האם ברצונך למחוק תור זה?
    </Popup>
  );
}
