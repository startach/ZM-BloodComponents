import React, { useState } from "react";
import { Appointment, DonationDay } from "../../utils/types";
import AppointmentSlotComponent from "../../components/AppointmentSlot";
import styles from "./DonationDayScreen.module.scss";
import _ from "lodash";
import Toggle from "../../components/Toggle";
import { DateUtils } from "@zm-blood-components/common";
import { HeaderVariant } from "../../components/CoordinatorHeader/CoordinatorHeader";
import CoordinatorScreen from "../../components/CoordinatorScreen";

export type DonationDayScreenProps = {
  dayStartTime: Date;
  donationDay: DonationDay;
  onClickOnAppointment: (appointmentId: string) => void;
  onDeleteAppointment: (appointmentId: string) => void;
  onAdd: () => void;
};

export default function DonationDayScreen({
  onDeleteAppointment,
  onClickOnAppointment,
  dayStartTime,
  donationDay,
}: DonationDayScreenProps) {
  const [showOnlyAvailableAppointments, setShowOnlyAvailableAppointments] =
    useState(false);

  return (
    <CoordinatorScreen
      showFab
      headerProps={{
        title: "ניהול תורים",
        variant: HeaderVariant.INFO,
        hasBackButton: true,
        hasNotificationsIcon: true,
        stickyComponent: (
          <DayHeader
            dayStartTime={dayStartTime}
            donationDay={donationDay}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
            setShowOnlyAvailableAppointments={setShowOnlyAvailableAppointments}
          />
        ),
      }}
    >
      <div className={styles.slots}>
        {donationDay.appointmentSlots.map((slot, index) => (
          <AppointmentSlotComponent
            key={index + "." + slot.donationStartTimeMillis}
            appointmentSlot={slot}
            onClickOnAppointment={onClickOnAppointment}
            onDeleteAppointment={onDeleteAppointment}
            showOnlyAvailableAppointments={showOnlyAvailableAppointments}
          />
        ))}

        {donationDay.appointmentSlots.length == 0 && (
          <div className={styles.noAppointments}>טרם נקבעו תורים ליום זה</div>
        )}

        {/*To avoid showing an appointment under the FAB*/}
        <div className={styles.emptySpace} />
      </div>
    </CoordinatorScreen>
  );
}

function DayHeader(props: {
  dayStartTime: Date;
  donationDay: DonationDay;
  showOnlyAvailableAppointments: boolean;
  setShowOnlyAvailableAppointments: (show: boolean) => void;
}) {
  const allAppointments = _.flatMap(
    props.donationDay.appointmentSlots,
    (x) => x.appointments
  );
  const appointmentsCount = allAppointments.length;
  const bookedAppointmentsCount = allAppointments.filter(
    (x) => x.booked
  ).length;
  return (
    <>
      <div className={styles.donationDate}>
        <DayString dayStartTime={props.dayStartTime} />

        <div className={styles.data}>
          <span>{appointmentsCount} תורים</span>
          <span className={styles.dataDivider}>|</span>
          <span>{bookedAppointmentsCount} רשומים</span>
        </div>
      </div>

      <div className={styles.availableAppointmentsToggle}>
        הצג תורים פנויים בלבד
        <Toggle
          className={styles.toggle}
          enabled={props.showOnlyAvailableAppointments}
          onChange={() =>
            props.setShowOnlyAvailableAppointments(
              !props.showOnlyAvailableAppointments
            )
          }
        />
      </div>
    </>
  );
}

function DayString(props: { dayStartTime: Date }) {
  const arbitraryStartTime = props.dayStartTime;
  const weekdayString = DateUtils.ToWeekDayString(arbitraryStartTime);
  const dateString = DateUtils.ToShortDateString(arbitraryStartTime);

  return (
    <div className={styles.dayString}>
      <span className={styles.weekday}>{weekdayString}</span>
      <span>{dateString}</span>
    </div>
  );
}
