import React, { useState } from "react";
import {
  BookedDonationWithDonorDetails,
  DateUtils,
  LocaleUtils,
} from "@zm-blood-components/common";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";
import InfoBar from "./InfoBar";
import { ReactComponent as Phone } from "../../assets/icons/phone.svg";
import { ReactComponent as BloodType } from "../../assets/icons/bloodtype.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { ReactComponent as Calender } from "../../assets/icons/calender.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import styles from "./BookedAppointmentScreen.module.scss";
import AppointmentStatusChip from "../../components/AppointmentStatusChip";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import { Popup } from "../../components/Popup/Popup";
import classNames from "classnames";
import Button from "../../components/Button";

export type BookedAppointmentScreenProps = {
  appointment?: BookedDonationWithDonorDetails;
  onRemoveDonor: () => void;
  onCopyAppointmentDetails: () => void;
  markAppointmentAsCompleted: (isNoShow: boolean) => void;
};

export default function BookedAppointmentScreen(
  props: BookedAppointmentScreenProps
) {
  if (!props.appointment) {
    // Loading state
    return (
      <div className={styles.loading}>
        <Spinner size={"3rem"} className={styles.spinner} />
      </div>
    );
  }

  const fullTime = DateUtils.ToDateTimeString(
    props.appointment.donationStartTimeMillis
  );

  const bookingTime = DateUtils.ToDateString(
    props.appointment.bookingTimeMillis
  );
  return (
    <CoordinatorScreen
      className={styles.bookedAppointmentScreenContent}
      headerProps={{
        title: fullTime,
        variant: HeaderVariant.INFO,
        hasBackButton: true,
        hasNotificationsIcon: true,
        stickyComponent: <NameBar {...props} />,
      }}
    >
      <Status
        appointment={props.appointment}
        markAppointmentAsCompleted={props.markAppointmentAsCompleted}
      />
      <div className={styles.details}>פרטי תורם</div>
      <InfoBar title={"מספר טלפון"} icon={<Phone />}>
        <a href={`tel: ${props.appointment.phone}`} className={styles.phone}>
          {props.appointment.phone}
        </a>
      </InfoBar>
      <InfoBar title={"סוג דם"} icon={<BloodType />}>
        {LocaleUtils.getBloodTypeTranslation(props.appointment.bloodType)}
      </InfoBar>
      <InfoBar title={"נקבע בתאריך"} icon={<Calender />}>
        {bookingTime}
      </InfoBar>
    </CoordinatorScreen>
  );
}

function Status(props: {
  appointment: BookedDonationWithDonorDetails;
  markAppointmentAsCompleted: (isNoShow: boolean) => void;
}) {
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [noShowSelected, setNoShowSelected] = useState<boolean | undefined>();
  const canChangeAppointmentStatus =
    new Date().getTime() > props.appointment.donationStartTimeMillis;

  const onPopupSave = () => {
    if (noShowSelected !== undefined) {
      props.markAppointmentAsCompleted(noShowSelected);
    }
    setShowConfirmationPopup(false);
  };

  return (
    <div className={styles.status}>
      <div>סטטוס:</div>
      <div className={styles.statusChip}>
        <AppointmentStatusChip
          appointmentStatusType={props.appointment.status}
          donationStartTimeMillis={props.appointment.donationStartTimeMillis}
        />
      </div>
      {canChangeAppointmentStatus && (
        <Edit
          onClick={() => setShowConfirmationPopup(true)}
          className={styles.button}
        />
      )}

      <Popup
        open={showConfirmationPopup}
        onClose={() => setShowConfirmationPopup(false)}
      >
        <div className={styles.statusChangePopup}>
          <div>שינוי סטאטוס</div>
          <div className={styles.statusChangeButtons}>
            <div
              className={classNames({
                [styles.statusChangeButton]: true,
                [styles.statusChangeButtonCompleted]: true,
                [styles.statusChangeButtonSelected]: noShowSelected === false,
              })}
              onClick={() => setNoShowSelected(false)}
            >
              הושלם
            </div>
            <div
              className={classNames({
                [styles.statusChangeButton]: true,
                [styles.statusChangeButtonNoShow]: true,
                [styles.statusChangeButtonSelected]: noShowSelected,
              })}
              onClick={() => setNoShowSelected(true)}
            >
              לא הגיע/ה
            </div>
          </div>
          <Button title={"שמירה"} onClick={onPopupSave} />
        </div>
      </Popup>
    </div>
  );
}

function NameBar(props: BookedAppointmentScreenProps) {
  const [removeDonorPopupOpen, setRemoveDonorPopupOpen] = useState(false);
  const [deletingAppointment, setDeletingAppointment] = useState(false);
  const [copyToastOpen, setCopyToastOpen] = useState(false);

  if (!props.appointment) {
    return null;
  }

  return (
    <div className={styles.name}>
      <div>{`${props.appointment.firstName} ${props.appointment.lastName}`}</div>
      <div className={styles.icons}>
        <Copy
          onClick={() => {
            props.onCopyAppointmentDetails();
            setCopyToastOpen(true);
          }}
        />
        <Profile onClick={() => setRemoveDonorPopupOpen(true)} />
      </div>

      <Toast
        message={"הפרטים הועתקו בהצלחה"}
        open={copyToastOpen}
        setOpen={setCopyToastOpen}
      />

      <Popup
        open={removeDonorPopupOpen}
        onClose={() => setRemoveDonorPopupOpen(false)}
        primaryButtonText={"הסר תורם"}
        onPrimaryButtonClick={() => {
          setDeletingAppointment(true);
          props.onRemoveDonor();
        }}
        primaryButtonLoading={deletingAppointment}
        cancelButtonText={"השאר תורם"}
        onCancelButtonClick={() => setRemoveDonorPopupOpen(false)}
      >
        האם ברצונך להסיר תורם זה מהתור הנוכחי?
      </Popup>
    </div>
  );
}
