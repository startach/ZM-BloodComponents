import React from "react";
import styles from "./AppointmentPreview.module.scss";
import { Appointment } from "../../utils/types";
import { ReactComponent as ChevronLeft } from "../../assets/icons/chevron-left.svg";
import { ReactComponent as AddPerson } from "../../assets/icons/add-person.svg";
import RecentUpdateChip from "../RecentUpdateChip";
import classNames from "classnames";

export type AppointmentPreviewProps = {
  appointment: Appointment;
  onClick: () => void;
};

export default function AppointmentPreview({
  onClick,
  appointment,
}: AppointmentPreviewProps) {
  // const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className={classNames(
        styles.appointmentPreviewContainer,
        appointment.appointmentId
      )}
      onClick={onClick}
      // onSwipeRight={() => setShowOptions(false)}
      // onSwipeLeft={() => setShowOptions(true)}
    >
      <div className={styles.appointmentPreviewContent}>
        <AppointmentContent appointment={appointment} />
      </div>
    </div>
  );
}

function AppointmentContent(props: { appointment: Appointment }) {
  if (props.appointment.booked) {
    return (
      <>
        <div className={styles.nameAndChip}>
          <div className={styles.donorName}>{props.appointment.donorName}</div>
          {props.appointment.recentChangeType && (
            <RecentUpdateChip
              recentChangeType={props.appointment.recentChangeType}
            />
          )}
        </div>
        <ChevronLeft />
      </>
    );
  }

  return (
    <>
      <div className={styles.nameAndChip}>
        <div className={styles.availableAppointmentText}>תור ריק</div>
        {props.appointment.recentChangeType && (
          <RecentUpdateChip
            recentChangeType={props.appointment.recentChangeType}
          />
        )}
      </div>
      <AddPerson />
    </>
  );
}
